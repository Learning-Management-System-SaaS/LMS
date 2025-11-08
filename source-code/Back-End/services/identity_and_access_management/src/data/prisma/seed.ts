import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // --- Step 1: Seed Roles ---
  const roles = [
    { name: 'admin', description: 'Full access to the system' },
    { name: 'student', description: 'Regular learner account' },
    { name: 'instructor', description: 'Can create and manage courses' },
    { name: 'tadmin', description: 'Tenant-level admin' },
    { name: 'dadmin', description: 'Division-level admin' },
  ]

  await prisma.role.createMany({ data: roles })
  console.log('✅ Roles seeded.')

  // --- Step 2: Seed Users ---
  const users = [
    {
      tenantDivisionId: 1,
      email: 'admin@example.com',
      firstName: 'Alice',
      lastName: 'Admin',
      password: await bcrypt.hash('password123', 10),
      gender: 'female',
      userRole: 'admin',
      roleId: 1,
    },
    {
      tenantDivisionId: 2,
      email: 'student@example.com',
      firstName: 'Bob',
      lastName: 'Student',
      password: await bcrypt.hash('password123', 10),
      gender: 'male',
      userRole: 'student',
      roleId: 2,
    },
    {
      tenantDivisionId: 3,
      email: 'instructor@example.com',
      firstName: 'Clara',
      lastName: 'Instructor',
      password: await bcrypt.hash('password123', 10),
      gender: 'female',
      userRole: 'instructor',
      roleId: 3,
    },
    {
      tenantDivisionId: 4,
      email: 'tadmin@example.com',
      firstName: 'David',
      lastName: 'TenantAdmin',
      password: await bcrypt.hash('password123', 10),
      gender: 'male',
      userRole: 'tadmin',
      roleId: 4,
    },
    {
      tenantDivisionId: 5,
      email: 'dadmin@example.com',
      firstName: 'Eva',
      lastName: 'DivisionAdmin',
      password: await bcrypt.hash('password123', 10),
      gender: 'female',
      userRole: 'dadmin',
      roleId: 5,
    },
    // Add 5 more randoms
    ...Array.from({ length: 5 }).map((_, i) => ({
      tenantDivisionId: Math.ceil(Math.random() * 3),
      email: `user${i + 6}@example.com`,
      firstName: `User${i + 6}`,
      lastName: `Test`,
      password: bcrypt.hashSync('password123', 10),
      gender: i % 2 === 0 ? 'male' : 'female',
      userRole: ['admin', 'student', 'instructor', 'tadmin', 'dadmin'][i % 5],
      roleId: (i % 5) + 1,
    })),
  ]

  await prisma.user.createMany({ data: users })
  console.log('✅ Users seeded.')

  console.log('🌸 Seeding completed successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
