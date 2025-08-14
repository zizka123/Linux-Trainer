const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const tasksFilePath = path.join(__dirname, '../../tasks/tasks.js');
  delete require.cache[require.resolve(tasksFilePath)];
  const tasksModule = require(tasksFilePath);
  let tasks;
  if (Array.isArray(tasksModule)) tasks = tasksModule;
  else if (Array.isArray(tasksModule.tasks)) tasks = tasksModule.tasks;
  else if (tasksModule && Array.isArray(tasksModule.default)) tasks = tasksModule.default;
  else throw new Error('Invalid tasks format in tasks.js');

  for (const t of tasks) {
    const groupName = t.group || 'Без группы';
    const group = await prisma.taskGroup.upsert({
      where: { name: groupName },
      update: {},
      create: { name: groupName }
    });
    await prisma.task.upsert({
      where: { id: t.id || 0 },
      update: {
        title: t.title,
        description: t.description,
        command: t.command,
        hint: t.hint || ''
      },
      create: {
        title: t.title,
        description: t.description,
        command: t.command,
        hint: t.hint || '',
        groupId: group.id
      }
    });
  }

  console.log(`Imported ${tasks.length} tasks into DB`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


