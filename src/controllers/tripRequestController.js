import TripRequest from "../models/TripRequest.js";
import { sendTripRequestConfirmation } from "../services/emailService.js";

const isValidMemberCount = (members) => [2, 4, 6, 8, 10].includes(members);
const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const createTripRequest = async (req, res, next) => {
  try {
    const { budget, days, destination, mail, members, travellers } = req.body;

    if (!destination || !mail || !members || !days || !Array.isArray(travellers)) {
      return res.status(400).json({
        message: "Mail, destination, members, days, and travellers are required",
        success: false,
      });
    }

    if (!isValidEmail(mail.trim().toLowerCase())) {
      return res.status(400).json({
        message: "Please enter a valid email address",
        success: false,
      });
    }

    if (!isValidMemberCount(Number(members))) {
      return res.status(400).json({
        message: "Members must be one of 2, 4, 6, 8, or 10",
        success: false,
      });
    }

    if (Number(days) < 1 || Number(days) > 7) {
      return res.status(400).json({
        message: "Days must be between 1 and 7",
        success: false,
      });
    }

    if (travellers.length !== Number(members)) {
      return res.status(400).json({
        message: "Traveller count must match members count",
        success: false,
      });
    }

    const normalizedTravellers = travellers.map((traveller) => ({
      name: traveller.name?.trim(),
      age: Number(traveller.age),
    }));

    const hasInvalidTraveller = normalizedTravellers.some(
      (traveller) => !traveller.name || Number.isNaN(traveller.age) || traveller.age < 1
    );

    if (hasInvalidTraveller) {
      return res.status(400).json({
        message: "Each traveller must include a valid name and age",
        success: false,
      });
    }

    const tripRequest = await TripRequest.create({
      mail: mail.trim().toLowerCase(),
      destination: destination.trim(),
      members: Number(members),
      travellers: normalizedTravellers,
      days: Number(days),
      budget: budget === "" || budget === undefined ? null : Number(budget),
    });

    let emailStatus = {
      sent: false,
    };

    try {
      emailStatus = await sendTripRequestConfirmation({
        destination: destination.trim(),
        mail: mail.trim().toLowerCase(),
      });
    } catch (mailError) {
      console.error("Failed to send confirmation email:", mailError.message);
      emailStatus = {
        reason: "Trip request saved, but confirmation email could not be sent.",
        sent: false,
      };
    }

    return res.status(201).json({
      data: tripRequest,
      emailSent: emailStatus.sent,
      emailStatusMessage: emailStatus.sent
        ? `A confirmation email has been sent to ${mail.trim().toLowerCase()}.`
        : emailStatus.reason || "Trip request saved, but email is not available right now.",
      message: emailStatus.sent
        ? "Trip request saved successfully and confirmation email sent"
        : "Trip request saved successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const getTripRequests = async (req, res, next) => {
  try {
    const tripRequests = await TripRequest.find().sort({ createdAt: -1 });

    res.status(200).json({
      data: tripRequests,
      message: "Trip requests fetched successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
