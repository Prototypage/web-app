import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const pir_sensor = await prisma.pir_sensor.findMany({
    orderBy: {
      created_at: 'desc',
    },
    take: 1,
  })
  res.json(pir_sensor)
  await prisma.$disconnect()
}
