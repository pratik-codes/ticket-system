import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const seedData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
  (ticketNo: number) => {
    return {
      ticketName: `Ticket Number ${ticketNo}`,
      ticketDescription: `This is the description for ticket number ${ticketNo}`,
    };
  },
);

const prisma = new PrismaClient();

async function main() {
  Logger.log('Seeding data....');
  Logger.log(`Total records: `, seedData.length);
  try {
    await prisma.ticket.createMany({ data: seedData });
  } catch (error) {
    Logger.error(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
