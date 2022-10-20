import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const temperatures = await prisma.temperature.findMany({
    orderBy: {
      created_at: 'desc',
    },
    take: 1,
  })
  res.json(temperatures)
  await prisma.$disconnect()
}
