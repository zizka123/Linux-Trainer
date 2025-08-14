const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Creating default groups...');
  
  // Create default "Нераспределенные задачи" group
  const unassignedTasksGroup = await prisma.taskGroup.upsert({
    where: { name: 'Нераспределенные задачи' },
    update: {},
    create: { name: 'Нераспределенные задачи' }
  });
  
  // Create default "Нераспределенные сотрудники" department
  const unassignedEmployeesDept = await prisma.department.upsert({
    where: { name: 'Нераспределенные сотрудники' },
    update: {},
    create: { name: 'Нераспределенные сотрудники' }
  });
  
  console.log('Default groups created successfully!');
  console.log('- Нераспределенные задачи:', unassignedTasksGroup.id);
  console.log('- Нераспределенные сотрудники:', unassignedEmployeesDept.id);
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
