import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Destination from './models/Destination.js';
import Package from './models/Package.js';
import connectDatabase from './config/database.js';

dotenv.config();

await connectDatabase();

const destinations = [
  {
    title: "Rudranath",
    slug: "rudranath",
    tag: "Trek & Spiritual",
    text: "Experience the ultimate spiritual trek to the tough and beautiful Rudranath temple.",
    overview: "Rudranath is a Hindu temple dedicated to Lord Shiva, located in the Garhwal Himalayan mountains in Uttarakhand, India. It is the fourth temple to visit in the Panch Kedar pilgrimage circuit. Surrounded by beautiful alpine meadows and thick forests of rhododendrons, it is the toughest trek among all Panch Kedars. The face (Mukha) of Lord Shiva is worshipped here, making it a highly sacred and mystical destination for pilgrims and trekkers alike.",
    heroImage: "/images/rudranath_path.jpg",
    images: ["/images/rudranath_path.jpg", "/images/rudranath_path2.jpg"],
    bestTimeToVisit: "May to October (Avoid monsoon)",
    trekDifficulty: "Expert",
    budgetEstimate: 8000,
    weatherInfo: "Summers are pleasant (10-15°C). Winters are extremely cold and covered in snow.",
    faqs: [
      { question: "Is the trek safe?", answer: "Yes, but it requires good fitness levels." },
      { question: "Are there stays available?", answer: "Basic homestays and tents are available." }
    ],
    nearbyPlaces: ["Gopeshwar", "Sagar Village"],
    route: [
      { 
        day: 1, 
        name: "Dehradun", 
        desc: "Initial point", 
        time: "Start", 
        image: "/images/Dehradun.jpg",
        hotelName: "Hotel President",
        hotelImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
        hotelLink: "https://www.booking.com",
        food: "Welcome Drinks & Dinner Included"
      },
      { 
        day: 1, 
        name: "Rishikesh", 
        desc: "Gateway to the Himalayas", 
        time: "1.5 hrs", 
        image: "/images/rishikesh.jpg",
        hotelName: "Aloha On The Ganges",
        hotelImage: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80",
        hotelLink: "https://www.booking.com",
        food: "Buffet Breakfast & Dinner Included"
      },
      { 
        day: 1, 
        name: "Gopeshwar", 
        desc: "Base town for treks", 
        time: "6 hrs", 
        image: "/images/gopeshwar.jpg",
        hotelName: "Hotel Snow Crest",
        hotelImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
        hotelLink: "https://www.booking.com",
        food: "Breakfast & Local Garhwali Dinner"
      },
      { 
        day: 2, 
        name: "Sagar Village", 
        desc: "Start of the trek", 
        time: "7 hrs", 
        image: "/images/sagar.jpg",
        hotelName: "Sagar Village Homestay",
        hotelImage: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=600&q=80",
        hotelLink: "https://www.booking.com",
        food: "All Meals (Organic Local Food) Included"
      },
      { 
        day: 3, 
        name: "Rudranath", 
        desc: "Lord Shiva's face is worshipped here", 
        time: "8 hr trek", 
        image: "/images/rudranath_path.jpg",
        hotelName: "Rudranath Alpine Camps",
        hotelImage: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80",
        hotelLink: "https://www.booking.com",
        food: "Simple Vegetarian Meals Included"
      }
    ]
  },
  {
    title: "Tungnath",
    slug: "tungnath",
    tag: "Highest Shiva Temple",
    text: "A breathtaking hike to the highest Shiva temple in the world with stunning Himalayan views.",
    overview: "Tungnath is the highest Shiva temple in the world and is the highest of the five Panch Kedar temples located in the mountain range of Tunganath in Rudraprayag district. The breathtaking hike takes you through meadows offering stunning views of Himalayan peaks like Nanda Devi, Kedarnath, and Trishul.",
    heroImage: "/images/tungnath.jpg",
    images: ["/images/tungnath.jpg"],
    bestTimeToVisit: "April to November",
    trekDifficulty: "Moderate",
    budgetEstimate: 5000,
    weatherInfo: "Pleasant during summer. Heavy snowfall in winters.",
    faqs: [
      { question: "How long is the trek?", answer: "It is about 3.5 km from Chopta." },
      { question: "Can we visit in winter?", answer: "It is very difficult due to heavy snow." }
    ],
    nearbyPlaces: ["Chopta", "Chandrashila"],
    route: [
      { 
        day: 1, 
        name: "Rishikesh", 
        desc: "Gateway to the Himalayas", 
        time: "1.5 hrs", 
        image: "/images/rishikesh.jpg",
        hotelName: "Divine Resort Rishikesh",
        hotelImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
        hotelLink: "https://www.booking.com",
        food: "Welcome Dinner & Evening Snacks"
      },
      { 
        day: 1, 
        name: "Ukhimath", 
        desc: "Winter seat of Kedarnath", 
        time: "3 hrs", 
        image: "/images/ukhimath.jpg",
        hotelName: "Ukhimath Tourist Lodge",
        hotelImage: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80",
        hotelLink: "https://www.booking.com",
        food: "Traditional Dinner & Tea"
      },
      { 
        day: 2, 
        name: "Chopta", 
        desc: "Mini Switzerland of India", 
        time: "1.5 hrs", 
        image: "/images/chopta.jpg",
        hotelName: "Chopta Meadows Eco Camps",
        hotelImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
        hotelLink: "https://www.booking.com",
        food: "Breakfast & Campfire Dinner"
      },
      { 
        day: 2, 
        name: "Tungnath", 
        desc: "Highest Shiva Temple", 
        time: "3 hr trek", 
        image: "/images/tungnath.jpg",
        hotelName: "Tungnath Homestay Stays",
        hotelImage: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=600&q=80",
        hotelLink: "https://www.booking.com",
        food: "Packed Lunch & Dinner Included"
      }
    ]
  },
  {
    title: "Kedarnath",
    slug: "kedarnath",
    tag: "Spiritual & Adventure",
    text: "The most prominent of the Panch Kedars, dedicated to Lord Shiva, nestled in the majestic Himalayas.",
    overview: "Kedarnath Temple is one of the most revered Hindu temples dedicated to Lord Shiva. Located on the Garhwal Himalayan range near the Mandakini river in Uttarakhand, the temple is open to the general public only between the months of April and November due to extreme weather conditions.",
    heroImage: "/images/kedarnath.jpg",
    images: ["/images/kedarnath.jpg"],
    bestTimeToVisit: "May to June and September to October",
    trekDifficulty: "Difficult",
    budgetEstimate: 12000,
    weatherInfo: "Cold throughout the year. Freezing winters.",
    faqs: [
      { question: "Is helicopter service available?", answer: "Yes, from Phata, Sirsi, and Guptkashi." },
      { question: "How long is the trek?", answer: "Approximately 16-18 km from Gaurikund." }
    ],
    nearbyPlaces: ["Gaurikund", "Sonprayag", "Chorabari Tal"],
    route: [
      { 
        day: 1, 
        name: "Rishikesh", 
        desc: "Starting Point", 
        time: "Start", 
        image: "/images/rishikesh.jpg",
        hotelName: "Swiss Cottage Rishikesh",
        hotelImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
        hotelLink: "https://www.booking.com",
        food: "Vegetarian Meals Offered"
      },
      { 
        day: 1, 
        name: "Sonprayag", 
        desc: "Base before Gaurikund", 
        time: "7 hrs", 
        image: "/images/sonprayag.jpg",
        hotelName: "Hotel Mandakini Sonprayag",
        hotelImage: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80",
        hotelLink: "https://www.booking.com",
        food: "Dinner & Hot Milk Offered"
      },
      { 
        day: 2, 
        name: "Gaurikund", 
        desc: "Trek Starting Point", 
        time: "1 hr", 
        image: "/images/gaurikund.jpg",
        hotelName: "Gaurikund Pilgrim Guest House",
        hotelImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
        hotelLink: "https://www.booking.com",
        food: "Heavy Breakfast & Tea"
      },
      { 
        day: 2, 
        name: "Kedarnath", 
        desc: "The Holy Temple", 
        time: "8 hr trek", 
        image: "/images/kedarnath.jpg",
        hotelName: "GMVN Kedarnath Cottages",
        hotelImage: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80",
        hotelLink: "https://www.booking.com",
        food: "Dinner & Morning Tea Offered"
      }
    ]
  },
  {
    title: "Badrinath",
    slug: "badrinath",
    tag: "Char Dham",
    text: "One of the Char Dham pilgrimage sites, dedicated to Lord Vishnu, set against the Neelkanth peak.",
    overview: "Badrinath is a town and nagar panchayat in Chamoli district in the state of Uttarakhand, India. It is one of the most important pilgrimage sites in India. The temple is dedicated to Lord Vishnu and is situated along the banks of the Alaknanda River.",
    heroImage: "/images/badrinath.jpg",
    images: ["/images/badrinath.jpg"],
    bestTimeToVisit: "May to October",
    trekDifficulty: "Easy",
    budgetEstimate: 10000,
    weatherInfo: "Pleasant summers, freezing winters.",
    faqs: [
      { question: "Is the road safe?", answer: "Yes, but landslides can occur during monsoons." },
      { question: "When do the temple doors open?", answer: "Usually in late April or early May." }
    ],
    nearbyPlaces: ["Mana Village", "Vasudhara Falls", "Auli"],
    route: [
      { 
        day: 1, 
        name: "Rishikesh", 
        desc: "Starting Point", 
        time: "Start", 
        image: "/images/rishikesh.jpg",
        hotelName: "Elbee Ganga View",
        hotelImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
        hotelLink: "https://www.booking.com",
        food: "Breakfast & Dinner Buffets"
      },
      { 
        day: 1, 
        name: "Joshimath", 
        desc: "Major halt town", 
        time: "8 hrs", 
        image: "/images/joshimath.jpg",
        hotelName: "Hotel Mount View Joshimath",
        hotelImage: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80",
        hotelLink: "https://www.booking.com",
        food: "Breakfast & North Indian Dinner"
      },
      { 
        day: 2, 
        name: "Badrinath", 
        desc: "The Holy Temple", 
        time: "2 hrs", 
        image: "/images/badrinath.jpg",
        hotelName: "Sarovar Portico Badrinath",
        hotelImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
        hotelLink: "https://www.booking.com",
        food: "Pure Veg Buffet (All meals)"
      }
    ]
  },
  {
    title: "Valley of Flowers",
    slug: "valley-of-flowers",
    tag: "Nature & Flora",
    text: "A UNESCO World Heritage site famous for its endemic alpine flowers and outstanding natural beauty.",
    overview: "The Valley of Flowers National Park is known for its meadows of endemic alpine flowers and the variety of flora. This richly diverse area is also home to rare and endangered animals, including the Asiatic black bear, snow leopard, musk deer, brown bear, red fox, and blue sheep.",
    heroImage: "/images/valley_of_flowers.jpg",
    images: ["/images/valley_of_flowers.jpg"],
    bestTimeToVisit: "July to early September",
    trekDifficulty: "Moderate",
    budgetEstimate: 9000,
    weatherInfo: "Monsoon brings the flowers to life. Expect rain.",
    faqs: [
      { question: "Is camping allowed in the valley?", answer: "No, you must return to Ghangaria by evening." },
      { question: "Are guides necessary?", answer: "Not mandatory, the trail is well marked." }
    ],
    nearbyPlaces: ["Hemkund Sahib", "Ghangaria"],
    route: [
      { 
        day: 1, 
        name: "Govindghat", 
        desc: "Base town", 
        time: "Start", 
        image: "/images/govindghat.jpg",
        hotelName: "Hotel Bhagat Govindghat",
        hotelImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
        hotelLink: "https://www.booking.com",
        food: "Vegetarian Lunch & Dinner"
      },
      { 
        day: 2, 
        name: "Ghangaria", 
        desc: "Trek to base camp", 
        time: "5 hrs", 
        image: "/images/ghangaria.jpg",
        hotelName: "Hotel Kuber Ghangaria",
        hotelImage: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80",
        hotelLink: "https://www.booking.com",
        food: "Heavy Breakfast & Garhwali Dinner"
      },
      { 
        day: 3, 
        name: "Valley of Flowers", 
        desc: "Explore the flora", 
        time: "3 hr trek", 
        image: "/images/valley_of_flowers.jpg",
        hotelName: "Hotel Kuber (Stay in Ghangaria)",
        hotelImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
        hotelLink: "https://www.booking.com",
        food: "Packed Snacks & Hot Buffet Dinner"
      }
    ]
  },
  {
    title: "Chopta",
    slug: "chopta",
    tag: "Mini Switzerland",
    text: "Known as the 'Mini Switzerland of India', offering breathtaking views of the majestic Himalayan range.",
    overview: "Chopta is a small region of meadows and evergreen forest area which is a part of kedarnath wildlife sanctuary located in Uttarakhand state. It is an unspoiled natural destination lying in the lap of the Uttarakhand Himalayas and offers views of the imposing Himalayan range including Trishul, Nanda Devi and Chaukhamba.",
    heroImage: "/images/chopta.jpg",
    images: ["/images/chopta.jpg"],
    bestTimeToVisit: "Throughout the year (Snow in winter)",
    trekDifficulty: "Easy",
    budgetEstimate: 6000,
    weatherInfo: "Pleasant summers, heavily snow-covered in winters.",
    faqs: [
      { question: "Are ATMs available?", answer: "No, carry enough cash from Ukhimath." },
      { question: "Is electricity available?", answer: "Mostly solar power, limit your usage." }
    ],
    nearbyPlaces: ["Tungnath", "Chandrashila", "Deoria Tal"],
    route: [
      { 
        day: 1, 
        name: "Rishikesh", 
        desc: "Starting Point", 
        time: "Start", 
        image: "/images/rishikesh.jpg",
        hotelName: "Ganga Kinare Resort",
        hotelImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
        hotelLink: "https://www.booking.com",
        food: "Breakfast & Traditional Dinner"
      },
      { 
        day: 1, 
        name: "Sari Village", 
        desc: "Via Ukhimath", 
        time: "6 hrs", 
        image: "/images/sari.jpg",
        hotelName: "Sari Village Homestay",
        hotelImage: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80",
        hotelLink: "https://www.booking.com",
        food: "Organic Local Dinner & Milk"
      },
      { 
        day: 2, 
        name: "Chopta", 
        desc: "The meadows", 
        time: "1 hr", 
        image: "/images/chopta.jpg",
        hotelName: "Chopta Meadows Resort",
        hotelImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
        hotelLink: "https://www.booking.com",
        food: "Breakfast, Lunch & Hot Dinner"
      }
    ]
  },
  {
    title: "Chandrashila",
    slug: "chandrashilla",
    tag: "Trek & Views",
    text: "A steep but rewarding trek above Tungnath, offering a 360-degree panorama of the Himalayas.",
    overview: "Chandrashila is the summit of the Tungnath. It literally means 'Moon Rock'. It is located at a height of about 4,000 metres (13,000 ft) above sea level. This peak provides a spectacular view of Himalayas, especially Nandadevi, Trisul, Kedar Peak, Bandarpunch and Chaukhamba peaks.",
    heroImage: "/images/chandrashila.jpg",
    images: ["/images/chandrashila.jpg"],
    bestTimeToVisit: "April to November",
    trekDifficulty: "Difficult",
    budgetEstimate: 5500,
    weatherInfo: "Extremely cold at the summit, high winds.",
    faqs: [
      { question: "Can beginners do this?", answer: "Yes, but the final ascent is steep and tiring." },
      { question: "Is water available on the way?", answer: "Carry your own water from Chopta." }
    ],
    nearbyPlaces: ["Tungnath", "Chopta"],
    route: [
      { 
        day: 1, 
        name: "Chopta", 
        desc: "Base Camp", 
        time: "Start", 
        image: "/images/chopta.jpg",
        hotelName: "Snow Pod Resort Chopta",
        hotelImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
        hotelLink: "https://www.booking.com",
        food: "Hot Soup & Buffet Dinner"
      },
      { 
        day: 1, 
        name: "Tungnath", 
        desc: "Enroute temple", 
        time: "3 hrs", 
        image: "/images/tungnath.jpg",
        hotelName: "Basic Ashram Rooms",
        hotelImage: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80",
        hotelLink: "https://www.booking.com",
        food: "Vegetarian Meals & Herbal Tea"
      },
      { 
        day: 1, 
        name: "Chandrashila", 
        desc: "The Summit", 
        time: "1.5 hr steep trek", 
        image: "/images/chandrashila.jpg",
        hotelName: "Snow Pod Resort (Return to Chopta)",
        hotelImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
        hotelLink: "https://www.booking.com",
        food: "Evening Tea & Celebratory Dinner"
      }
    ]
  },
  {
    title: "Deoria Tal",
    slug: "deoir-tal",
    tag: "Pristine Lake",
    text: "An emerald lake nestled in the Himalayas with crystal clear reflections of the Chaukhamba peaks.",
    overview: "Deoria Tal (also Devaria or Deoriya) is a lake about 3 km from the villages of Mastura and Sari on the Ukhimath-Chopta road. At an altitude of 2,438 meters, it has heavily wooded, lush green surroundings with snow-covered mountains (Chaukhamba is one of them) in the backdrop.",
    heroImage: "/images/deoriatal.jpg",
    images: ["/images/deoriatal.jpg"],
    bestTimeToVisit: "March to May, September to November",
    trekDifficulty: "Easy",
    budgetEstimate: 4000,
    weatherInfo: "Chilly evenings, comfortable days in summer.",
    faqs: [
      { question: "Can we camp near the lake?", answer: "Camping is restricted right at the edge but allowed nearby." },
      { question: "How long is the trek?", answer: "It's an easy 3 km hike from Sari Village." }
    ],
    nearbyPlaces: ["Sari Village", "Chopta"],
    route: [
      { 
        day: 1, 
        name: "Ukhimath", 
        desc: "Major Town", 
        time: "Start", 
        image: "/images/ukhimath.jpg",
        hotelName: "Devi Darshan Lodge",
        hotelImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
        hotelLink: "https://www.booking.com",
        food: "Evening Dinner & Tea"
      },
      { 
        day: 1, 
        name: "Sari Village", 
        desc: "Base of the trek", 
        time: "45 mins", 
        image: "/images/sari.jpg",
        hotelName: "Cafe Sari & Homestay",
        hotelImage: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80",
        hotelLink: "https://www.booking.com",
        food: "Breakfast & Local Organic Lunch"
      },
      { 
        day: 1, 
        name: "Deoria Tal", 
        desc: "The pristine lake", 
        time: "1.5 hr trek", 
        image: "/images/deoriatal.jpg",
        hotelName: "Deoria Tal Dome Tents",
        hotelImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
        hotelLink: "https://www.booking.com",
        food: "Campfire Dinner & Breakfast"
      }
    ]
  },
  {
    title: "Kartik Swami",
    slug: "kartikswami",
    tag: "Offbeat Temple",
    text: "A serene temple dedicated to Lord Kartik, perched on a narrow ridge offering sweeping mountain views.",
    overview: "Kartik Swami temple is dedicated to the elder son of Lord Shiva, Kartikeya. It is situated amidst the serene beauty of the Garhwal Himalayas. The temple is famous for the 360-degree panoramic view of the Himalayan peaks that it offers. The trek is beautiful, passing through a dense forest and a dramatic ridge.",
    heroImage: "/images/kartikswami.jpg",
    images: ["/images/kartikswami.jpg"],
    bestTimeToVisit: "October to June",
    trekDifficulty: "Moderate",
    budgetEstimate: 4500,
    weatherInfo: "Windy at the top, pleasant during summers.",
    faqs: [
      { question: "Is the trek long?", answer: "It is about a 3 km trek from Kanakchauri village." },
      { question: "Is it crowded?", answer: "No, it's one of the more offbeat and peaceful destinations." }
    ],
    nearbyPlaces: ["Rudraprayag", "Kanakchauri"],
    route: [
      { 
        day: 1, 
        name: "Rudraprayag", 
        desc: "Major transit point", 
        time: "Start", 
        image: "/images/rudraprayag.jpg",
        hotelName: "Monal Resort Rudraprayag",
        hotelImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
        hotelLink: "https://www.booking.com",
        food: "Continental Dinner & Breakfast"
      },
      { 
        day: 1, 
        name: "Kanakchauri", 
        desc: "Base village", 
        time: "2 hrs", 
        image: "/images/kanakchauri.jpg",
        hotelName: "Mayadeep Herbal Resort",
        hotelImage: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80",
        hotelLink: "https://www.booking.com",
        food: "Organic Local Millet Dinner"
      },
      { 
        day: 1, 
        name: "Kartik Swami", 
        desc: "Temple at the ridge", 
        time: "2 hr trek", 
        image: "/images/kartikswami.jpg",
        hotelName: "Mayadeep Resort (Return to Village)",
        hotelImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
        hotelLink: "https://www.booking.com",
        food: "Hot Lunch & Evening Tea"
      }
    ]
  },
  {
    title: "Madhyamaheshwar",
    slug: "madhyamaheshwar",
    tag: "Panch Kedar",
    text: "The second Kedar, a mystical Shiva temple set in a gorgeous green valley.",
    overview: "Madhyamaheshwar is a Hindu temple dedicated to Lord Shiva, located in the Mansoona village of Garhwal Himalayas. It is the second temple to be visited in the Panch Kedar pilgrimage circuit. The trek offers unmatched views of Chaukhamba, Kedarnath, and Neelkanth peaks.",
    heroImage: "/images/madhyamaheshwar.jpg",
    images: ["/images/madhyamaheshwar.jpg"],
    bestTimeToVisit: "May to October",
    trekDifficulty: "Difficult",
    budgetEstimate: 7500,
    weatherInfo: "Cool summers, cold nights. Closed in winters.",
    faqs: [
      { question: "How long is the trek?", answer: "Around 16 km from the base village Ransi." },
      { question: "Are mules available?", answer: "Yes, from Ransi up to a certain point." }
    ],
    nearbyPlaces: ["Ukhimath", "Ransi Village", "Buda Madhyamaheshwar"],
    route: [
      { 
        day: 1, 
        name: "Ukhimath", 
        desc: "Starting Point", 
        time: "Start", 
        image: "/images/ukhimath.jpg",
        hotelName: "Pine Breeze Lodge",
        hotelImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
        hotelLink: "https://www.booking.com",
        food: "Welcome Dinner & Chai"
      },
      { 
        day: 1, 
        name: "Ransi Village", 
        desc: "Trek Base", 
        time: "1.5 hrs", 
        image: "/images/ransi.jpg",
        hotelName: "Local Homestays Ransi",
        hotelImage: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80",
        hotelLink: "https://www.booking.com",
        food: "Garhwali Dinner & Breakfast"
      },
      { 
        day: 2, 
        name: "Bantoli", 
        desc: "Midway halt", 
        time: "4 hrs", 
        image: "/images/bantoli.jpg",
        hotelName: "Bantoli Riverside Camps",
        hotelImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
        hotelLink: "https://www.booking.com",
        food: "Hot Lunch, Snacks & Dinner"
      },
      { 
        day: 3, 
        name: "Madhyamaheshwar", 
        desc: "The Temple", 
        time: "5 hrs", 
        image: "/images/madhyamaheshwar.jpg",
        hotelName: "Madhyamaheshwar Shrine Tents",
        hotelImage: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80",
        hotelLink: "https://www.booking.com",
        food: "Simple Hot Vegetarian Meals"
      }
    ]
  },
  {
    title: "Kalimath",
    slug: "kalimath",
    tag: "Shakti Peeth",
    text: "A highly revered Shakti Peeth dedicated to Goddess Kali, surrounded by powerful spiritual energy.",
    overview: "Kalimath is a religious place located on the banks of Saraswati river in Rudraprayag district. It is one of the 108 Shakti Peeths in India and is dedicated to Goddess Kali. Unlike other temples, there is no idol worshipped here, but a Sri Yantra is the object of devotion. It's a peaceful and powerful place for meditation.",
    heroImage: "/images/kalimath.jpg",
    images: ["/images/kalimath.jpg"],
    bestTimeToVisit: "Throughout the year (Navratri is special)",
    trekDifficulty: "Easy",
    budgetEstimate: 3000,
    weatherInfo: "Pleasant weather year-round.",
    faqs: [
      { question: "Do we have to trek?", answer: "No, it is accessible by road." },
      { question: "Where can we stay?", answer: "Dharamshalas are available near the temple." }
    ],
    nearbyPlaces: ["Guptkashi", "Ukhimath"],
    route: [
      { 
        day: 1, 
        name: "Rudraprayag", 
        desc: "Major town", 
        time: "Start", 
        image: "/images/rudraprayag.jpg",
        hotelName: "Riverside Resort",
        hotelImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
        hotelLink: "https://www.booking.com",
        food: "Dinner Buffet"
      },
      { 
        day: 1, 
        name: "Guptkashi", 
        desc: "Enroute town", 
        time: "2 hrs", 
        image: "/images/guptkashi.jpg",
        hotelName: "Guptkashi Tourist Lodge",
        hotelImage: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80",
        hotelLink: "https://www.booking.com",
        food: "Breakfast & North Indian Meals"
      },
      { 
        day: 1, 
        name: "Kalimath", 
        desc: "The Shakti Peeth", 
        time: "45 mins", 
        image: "/images/kalimath.jpg",
        hotelName: "Kalimath Ashram Rooms",
        hotelImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
        hotelLink: "https://www.booking.com",
        food: "Pure Veg Ashram Prasad Lunch"
      }
    ]
  }
];

const importData = async () => {
  try {
    await Destination.deleteMany();
    await Package.deleteMany();

    const createdDestinations = await Destination.insertMany(destinations);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
