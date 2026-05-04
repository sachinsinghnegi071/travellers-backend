import mongoose from "mongoose";

const connectDatabase = async () => {
  const mongoUri = process.env.MONGODB_URI;
  const databaseName = process.env.MONGODB_DB_NAME || "travellers";

  if (!mongoUri) {
    throw new Error("MONGODB_URI is missing. Add it to backend/.env");
  }

  await mongoose.connect(mongoUri, {
    dbName: databaseName,
    family: 4,
  });
  console.log(`MongoDB connected successfully to ${databaseName}`);
};

export default connectDatabase;
