const { PrismaClient } = require("../app/generated/prisma");

const prisma = new PrismaClient();

const listings = [
  {
    category: "Beach",
    locationValue: "CR",  // Costa Rica
    guestCount: 4,
    roomCount: 2,
    bathroomCount: 1,
    imageSrc: "https://res.cloudinary.com/dcs7lnkkj/image/upload/v1754804296/Tropical_Beachfront_Casita_lera26.jpg",
    price: 120,
    title: "Tropical Beachfront Casita",
    userId: "6880bf8df491cd9c165d8a39",
    description: "Cozy and breezy—steps from the sand.",
  },
  {
    category: "Beach",
    locationValue: "GR",  // Greece
    guestCount: 2,
    roomCount: 1,
    bathroomCount: 1,
    imageSrc: "https://res.cloudinary.com/dcs7lnkkj/image/upload/v1754804373/Seaside_Sanctuary_in_the_Aegean_d0u3bu.jpg",
    price: 90,
    title: "Seaside Sanctuary in the Aegean",
    userId: "6880bf8df491cd9c165d8a39",
    description: "Charming cottage with sea views.",
  },
  {
    category: "Windmills",
    locationValue: "NL",  // Netherlands
    guestCount: 5,
    roomCount: 3,
    bathroomCount: 2,
    imageSrc: "https://res.cloudinary.com/dcs7lnkkj/image/upload/v1754804449/Historic_Windmill_Dwelling_hiznyr.webp",
    price: 150,
    title: "Historic Windmill Dwelling",
    userId: "6880bf8df491cd9c165d8a39",
    description: "Stay in a whimsical windmill-style home.",
  },
  {
    category: "Modern",
    locationValue: "US",  // United States
    guestCount: 6,
    roomCount: 4,
    bathroomCount: 3,
    imageSrc: "https://res.cloudinary.com/dcs7lnkkj/image/upload/v1754804541/Sleek_Modern_Escape_ntrsvg.webp",
    price: 250,
    title: "Sleek Modern Escape",
    userId: "6880bf8df491cd9c165d8a39",
    description: "Clean lines, open spaces, luxury.",
  },
  {
    category: "Modern",
    locationValue: "DE",  // Germany
    guestCount: 2,
    roomCount: 1,
    bathroomCount: 1,
    imageSrc: "https://res.cloudinary.com/dcs7lnkkj/image/upload/v1754804734/Industrial_Chic_Loft_m4lgvk.webp",
    price: 110,
    title: "Industrial Chic Loft",
    userId: "6880bf8df491cd9c165d8a39",
    description: "Stylish city retreat in Berlin.",
  },
  {
    category: "Countryside",
    locationValue: "FR",  // France
    guestCount: 4,
    roomCount: 2,
    bathroomCount: 1,
    imageSrc: "https://res.cloudinary.com/dcs7lnkkj/image/upload/v1754804801/Quaint_Country_Cottage_rom7db.webp",
    price: 95,
    title: "Quaint Country Cottage",
    userId: "6880bf8df491cd9c165d8a39",
    description: "Relaxing rural hideaway with garden.",
  },
  {
    category: "Lake",
    locationValue: "CA",  // Canada
    guestCount: 4,
    roomCount: 2,
    bathroomCount: 1,
    imageSrc: "https://res.cloudinary.com/dcs7lnkkj/image/upload/v1754804891/Lakeside_Log_Cabin_tn5rrd.webp",
    price: 130,
    title: "Lakeside Log Cabin",
    userId: "6880bf8df491cd9c165d8a39",
    description: "Rustic cabin right on the lakefront.",
  },
  {
    category: "Castle",
    locationValue: "GB",  // United Kingdom (Scotland)
    guestCount: 10,
    roomCount: 8,
    bathroomCount: 5,
    imageSrc: "https://res.cloudinary.com/dcs7lnkkj/image/upload/v1754804938/Enchanted_Highland_Castle_ebf6rd.avif",
    price: 400,
    title: "Enchanted Highland Castle",
    userId: "6880bf8df491cd9c165d8a39",
    description: "Live like royalty in this historic gem.",
  },
  {
    category: "Islands",
    locationValue: "MV",  // Maldives
    guestCount: 4,
    roomCount: 2,
    bathroomCount: 2,
    imageSrc: "https://res.cloudinary.com/dcs7lnkkj/image/upload/v1754804997/Overwater_Island_Escape_joy6et.webp",
    price: 450,
    title: "Overwater Island Escape",
    userId: "6880bf8df491cd9c165d8a39",
    description: "Luxury villa surrounded by turquoise waters.",
  },
  {
    category: "Camping",
    locationValue: "NZ",  // New Zealand
    guestCount: 3,
    roomCount: 1,
    bathroomCount: 1,
    imageSrc: "https://res.cloudinary.com/dcs7lnkkj/image/upload/v1754805055/Forest_Camp_Cabin_sabvtg.webp",
    price: 80,
    title: "Forest Camp Cabin",
    userId: "6880bf8df491cd9c165d8a39",
    description: "Secluded cabin with campfire and stargazing.",
  },
];

async function run() {
  try {
    await prisma.listing.createMany({
      data: listings,
    });
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect;
  }
}

run();
