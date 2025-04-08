import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.admin.create({
        data: {
            email: 'befogdev@gmail.com',
            password: 'Befog@123456',
        },
    });

    console.log('✅ Admin seeded successfully');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
