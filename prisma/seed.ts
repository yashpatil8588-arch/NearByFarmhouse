import { PrismaClient, Role } from "../src/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Create users
  const admin = await prisma.user.upsert({
    where: { email: "admin@nearbyfarmhouse.com" },
    update: {},
    create: { name: "Admin", email: "admin@nearbyfarmhouse.com", password: "$2b$10$placeholder_hash", role: Role.ADMIN },
  });

  const owner1 = await prisma.user.upsert({
    where: { email: "rajesh@example.com" },
    update: {},
    create: { name: "Rajesh Sharma", email: "rajesh@example.com", password: "$2b$10$placeholder_hash", role: Role.OWNER, phone: "+919876543210" },
  });

  const owner2 = await prisma.user.upsert({
    where: { email: "priya@example.com" },
    update: {},
    create: { name: "Priya Patel", email: "priya@example.com", password: "$2b$10$placeholder_hash", role: Role.OWNER, phone: "+919876543211" },
  });

  const user1 = await prisma.user.upsert({
    where: { email: "rahul@example.com" },
    update: {},
    create: { name: "Rahul Kumar", email: "rahul@example.com", password: "$2b$10$placeholder_hash", role: Role.USER },
  });

  // Create farmhouses
  await prisma.farmhouse.upsert({
    where: { id: "seed-fh-1" },
    update: {},
    create: {
      id: "seed-fh-1",
      name: "Sunset Valley Farmhouse",
      description: "A stunning private farmhouse nestled in the hills of Lonavala with panoramic sunset views, a private pool, and lush green gardens.",
      location: "Lonavala, Maharashtra",
      price: 8500,
      guests: 12,
      images: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      ],
      amenities: ["Swimming Pool", "WiFi", "Parking", "BBQ Area", "Garden", "AC Rooms", "Games"],
      category: "Luxury",
      withFood: true,
      isPrivate: true,
      isApproved: true,
      ownerId: owner1.id,
    },
  });

  await prisma.farmhouse.upsert({
    where: { id: "seed-fh-2" },
    update: {},
    create: {
      id: "seed-fh-2",
      name: "Green Meadows Retreat",
      description: "A peaceful retreat surrounded by lush green meadows, perfect for family getaways and group celebrations.",
      location: "Karjat, Maharashtra",
      price: 5500,
      guests: 8,
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      ],
      amenities: ["Swimming Pool", "WiFi", "Parking", "Garden", "AC Rooms"],
      category: "Family",
      withFood: true,
      isPrivate: false,
      isApproved: true,
      ownerId: owner1.id,
    },
  });

  await prisma.farmhouse.upsert({
    where: { id: "seed-fh-3" },
    update: {},
    create: {
      id: "seed-fh-3",
      name: "Party Palace Farmhouse",
      description: "The ultimate party destination with a large pool, DJ area, and space for 30+ guests.",
      location: "Nashik, Maharashtra",
      price: 12000,
      guests: 30,
      images: [
        "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=800&q=80",
      ],
      amenities: ["Swimming Pool", "WiFi", "Parking", "BBQ Area", "Games", "AC Rooms"],
      category: "Party",
      withFood: false,
      isPrivate: true,
      isApproved: true,
      ownerId: owner2.id,
    },
  });

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
