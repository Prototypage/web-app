import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const hours = new Date().getHours()
  const min = new Date().getMinutes()
  const sec = new Date().getSeconds()
  const day = new Date().getDay()
  const temperatures = await prisma.humidity.findMany({
    where: {
      created_at: {
        gte: new Date(
          new Date().getTime() -
            (hours * 60 * 60 + min * 60 + sec) * 1000 -
            24 * 60 * 60 * 1000 * (day - 1)
        ),
      },
    },
    orderBy: {
      created_at: 'desc',
    },
  })
  res.json(temperatures)
  await prisma.$disconnect()
}
