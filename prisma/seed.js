import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // For seeding user data, uncomment the following lines and adjust as needed

    // await prisma.admin.create({
    //     data: {
    //         email: 'befogdev@gmail.com',
    //         password: 'Befog@123456',
    //     },
    // });

    // console.log('✅ Admin seeded successfully');

    // For seeding admin data, uncomment the following lines and adjust as needed

    // await prisma.adminData.create({
    //     data: {
    //         talent: 'Dancing',
    //         offerCharge: '500',
    //         groupACharge: '1000',
    //         groupBCharge: '1500',
    //         groupCCharge: '2000',
    //     },
    // });

    // console.log('✅ Admin Data seeded successfully');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
