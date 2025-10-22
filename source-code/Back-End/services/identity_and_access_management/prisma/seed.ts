import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Hash a default password for all demo users
  const defaultPassword = await hash("Demo@123", 10);

  const users = [
    { tenantId: 1, username: "admin", email: "admin@example.com", name: "Admin User" },
    { tenantId: 1, username: "john_doe", email: "john@example.com", name: "John Doe" },
    { tenantId: 1, username: "jane_smith", email: "jane@example.com", name: "Jane Smith" },
    { tenantId: 1, username: "michael", email: "michael@example.com", name: "Michael Jordan" },
    { tenantId: 1, username: "emily", email: "emily@example.com", name: "Emily Davis" },
    { tenantId: 1, username: "david", email: "david@example.com", name: "David Clark" },
    { tenantId: 1, username: "olivia", email: "olivia@example.com", name: "Olivia Wilson" },
    { tenantId: 1, username: "daniel", email: "daniel@example.com", name: "Daniel Taylor" },
    { tenantId: 1, username: "sarah", email: "sarah@example.com", name: "Sarah Brown" },
    { tenantId: 1, username: "matthew", email: "matthew@example.com", name: "Matthew Hall" },
  ];

  // Insert or update users
  for (const user of users) {
    await prisma.user.upsert({
      where: {
        tenantId_email: {
          tenantId: user.tenantId,
          email: user.email,
        },
      },
      update: {},
      create: {
        ...user,
        password: defaultPassword,
      },
    });
  }

}

main()
  .catch((err) => {
    console.error(" Error inserting users:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
