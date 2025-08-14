const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Путь к файлу с задачами
const tasksFilePath = path.join(__dirname, '../tasks/tasks.js');

// Функция для загрузки задач
const loadTasks = () => {
  try {
    delete require.cache[require.resolve(tasksFilePath)];
    const tasksModule = require(tasksFilePath);
    
    // Проверяем разные варианты экспорта
    let tasks;
    if (Array.isArray(tasksModule)) {
      tasks = tasksModule;
    } else if (tasksModule && Array.isArray(tasksModule.tasks)) {
      tasks = tasksModule.tasks;
    } else if (tasksModule && tasksModule.default && Array.isArray(tasksModule.default)) {
      tasks = tasksModule.default;
    } else {
      throw new Error('Invalid tasks format');
    }
    
    console.log('Загруженные задачи:', tasks); // Logging
    return tasks;
  } catch (error) {
    console.error('Error loading tasks:', error);
    throw error;
  }
};

// Роут для получения задач (из файла для обратной совместимости)
app.get('/api/tasks', (req, res) => {
  try {
    const tasks = loadTasks();
    res.json(tasks);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      error: 'Не удалось загрузить задачи',
      details: error.message 
    });
  }
});

// Роут для добавления новой задачи
app.post('/api/tasks', (req, res) => {
  try {
    const tasks = loadTasks();
    const newTask = {
      id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
      ...req.body
    };

    tasks.push(newTask);

    // Формируем содержимое файла
    const fileContent = `module.exports = ${JSON.stringify(tasks, null, 2)};`;
    
    // Записываем в файл
    fs.writeFileSync(tasksFilePath, fileContent);

    res.status(201).json(newTask);
  } catch (error) {
    console.error('Ошибка сохранения задачи:', error);
    res.status(500).json({ error: 'Не удалось сохранить задачу' });
  }
});
// Роут для удаления задачи
app.delete('/api/tasks/:id', (req, res) => {
  try {
    const tasks = loadTasks();
    const taskId = parseInt(req.params.id);
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    
    const fileContent = `module.exports = ${JSON.stringify(updatedTasks, null, 2)};`;
    fs.writeFileSync(tasksFilePath, fileContent);
    
    res.json({ success: true });
  } catch (error) {
    console.error('Ошибка удаления задачи:', error);
    res.status(500).json({ error: 'Не удалось удалить задачу' });
  }
});

// Роут для обновления задачи
app.put('/api/tasks/:id', (req, res) => {
  try {
    const tasks = loadTasks();
    const taskId = parseInt(req.params.id);
    const updatedTask = req.body;
    
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, ...updatedTask } : task
    );
    
    const fileContent = `module.exports = ${JSON.stringify(updatedTasks, null, 2)};`;
    fs.writeFileSync(tasksFilePath, fileContent);
    
    res.json(updatedTask);
  } catch (error) {
    console.error('Ошибка обновления задачи:', error);
    res.status(500).json({ error: 'Не удалось обновить задачу' });
  }
});

// ===== Новые маршруты для работы с БД через Prisma =====
// Справочники: отделы, сотрудники
app.get('/api/departments', async (req, res) => {
  try {
    const departments = await prisma.department.findMany({ orderBy: { name: 'asc' } });
    res.json(departments);
  } catch (e) {
    res.status(500).json({ error: 'DB error', details: e.message });
  }
});

app.post('/api/departments', async (req, res) => {
  try {
    const { name } = req.body;
    const dep = await prisma.department.create({ data: { name } });
    res.status(201).json(dep);
  } catch (e) {
    res.status(500).json({ error: 'DB error', details: e.message });
  }
});

app.put('/api/departments/:id', async (req, res) => {
  try {
    const { name } = req.body;
    const department = await prisma.department.update({
      where: { id: parseInt(req.params.id) },
      data: { name }
    });
    res.json(department);
  } catch (e) {
    res.status(500).json({ error: 'DB error', details: e.message });
  }
});

app.delete('/api/departments/:id', async (req, res) => {
  try {
    console.log('DELETE /api/departments/:id called with:', req.params.id, 'query:', req.query);
    const deleteEmployees = req.query.deleteEmployees === 'true';
    const onlyDepartment = req.query.onlyDepartment === 'true';
    const departmentId = parseInt(req.params.id);
    
    console.log('deleteEmployees:', deleteEmployees, 'onlyDepartment:', onlyDepartment, 'departmentId:', departmentId);
    
    if (deleteEmployees) {
      // Delete department with all employees
      await prisma.employee.deleteMany({
        where: { departmentId: departmentId }
      });
    } else if (onlyDepartment) {
      // Find or create "Нераспределенные сотрудники" department
      const unassignedDept = await prisma.department.upsert({
        where: { name: 'Нераспределенные сотрудники' },
        update: {},
        create: { name: 'Нераспределенные сотрудники' }
      });
      
      console.log('Unassigned department:', unassignedDept);
      
      // Move employees to unassigned department
      const updateResult = await prisma.employee.updateMany({
        where: { departmentId: departmentId },
        data: { departmentId: unassignedDept.id }
      });
      
      console.log('Updated employees:', updateResult);
    }
    
    const deleteResult = await prisma.department.delete({
      where: { id: departmentId }
    });
    
    console.log('Deleted department:', deleteResult);
    res.json({ success: true });
  } catch (e) {
    console.error('Error in DELETE /api/departments/:id:', e);
    res.status(500).json({ error: 'DB error', details: e.message });
  }
});

app.get('/api/employees', async (req, res) => {
  try {
    const q = String(req.query.q || '').toLowerCase();
    const employees = await prisma.employee.findMany({
      include: { department: true },
      orderBy: [{ lastName: 'asc' }, { firstName: 'asc' }]
    });
    const mapped = employees.map(e => ({
      id: e.id,
      lastName: e.lastName,
      firstName: e.firstName,
      department: e.department?.name || '',
      postLinkId: e.postLinkId
    }));
    const filtered = q ? mapped.filter(e => e.lastName.toLowerCase().startsWith(q)) : mapped;
    res.json(filtered);
  } catch (e) {
    res.status(500).json({ error: 'DB error', details: e.message });
  }
});

app.post('/api/employees', async (req, res) => {
  try {
    const { lastName, firstName, postLinkId, departmentName } = req.body;
    const department = await prisma.department.upsert({
      where: { name: departmentName },
      update: {},
      create: { name: departmentName }
    });
    const emp = await prisma.employee.create({
      data: {
        lastName,
        firstName,
        postLinkId,
        departmentId: department.id
      }
    });
    res.status(201).json(emp);
  } catch (e) {
    res.status(500).json({ error: 'DB error', details: e.message });
  }
});

// Группы задач
app.get('/api/task-groups', async (req, res) => {
  try {
    const groups = await prisma.taskGroup.findMany({ include: { tasks: true }, orderBy: { name: 'asc' } });
    res.json(groups);
  } catch (e) {
    res.status(500).json({ error: 'DB error', details: e.message });
  }
});

app.post('/api/task-groups', async (req, res) => {
  try {
    const { name } = req.body;
    const group = await prisma.taskGroup.create({ data: { name } });
    res.status(201).json(group);
  } catch (e) {
    res.status(500).json({ error: 'DB error', details: e.message });
  }
});

app.put('/api/task-groups/:id', async (req, res) => {
  try {
    const { name } = req.body;
    const group = await prisma.taskGroup.update({
      where: { id: parseInt(req.params.id) },
      data: { name }
    });
    res.json(group);
  } catch (e) {
    res.status(500).json({ error: 'DB error', details: e.message });
  }
});

app.delete('/api/task-groups/:id', async (req, res) => {
  try {
    console.log('DELETE /api/task-groups/:id called with:', req.params.id, 'query:', req.query);
    const onlyGroup = req.query.onlyGroup === 'true';
    const groupId = parseInt(req.params.id);
    
    console.log('onlyGroup:', onlyGroup, 'groupId:', groupId);
    
    if (onlyGroup) {
      // Find or create "Нераспределенные задачи" group
      const unassignedGroup = await prisma.taskGroup.upsert({
        where: { name: 'Нераспределенные задачи' },
        update: {},
        create: { name: 'Нераспределенные задачи' }
      });
      
      console.log('Unassigned group:', unassignedGroup);
      
      // Move tasks to unassigned group
      const updateResult = await prisma.task.updateMany({
        where: { groupId: groupId },
        data: { groupId: unassignedGroup.id }
      });
      
      console.log('Updated tasks:', updateResult);
    } else {
      // Delete group with all tasks
      await prisma.task.deleteMany({
        where: { groupId: groupId }
      });
    }
    
    const deleteResult = await prisma.taskGroup.delete({
      where: { id: groupId }
    });
    
    console.log('Deleted group:', deleteResult);
    res.json({ success: true });
  } catch (e) {
    console.error('Error in DELETE /api/task-groups/:id:', e);
    res.status(500).json({ error: 'DB error', details: e.message });
  }
});

// Задачи
app.get('/api/db/tasks', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({ include: { group: true } });
    res.json(tasks);
  } catch (e) {
    res.status(500).json({ error: 'DB error', details: e.message });
  }
});

app.post('/api/db/tasks', async (req, res) => {
  try {
    const { title, description, command, hint, groupName } = req.body;
    const group = await prisma.taskGroup.upsert({
      where: { name: groupName },
      update: {},
      create: { name: groupName }
    });
    const task = await prisma.task.create({
      data: { title, description, command, hint, groupId: group.id }
    });
    res.status(201).json(task);
  } catch (e) {
    res.status(500).json({ error: 'DB error', details: e.message });
  }
});

app.put('/api/db/tasks/:id', async (req, res) => {
  try {
    const { title, description, command, hint, groupId } = req.body;
    const parsedGroupId = groupId ? parseInt(groupId) : null;
    
    const task = await prisma.task.update({
      where: { id: parseInt(req.params.id) },
      data: { title, description, command, hint, groupId: parsedGroupId }
    });
    
    console.log(`Task ${task.id} updated - moved to group ${parsedGroupId}`);
    res.json(task);
  } catch (e) {
    console.error('Error updating task:', e);
    res.status(500).json({ error: 'DB error', details: e.message });
  }
});

app.delete('/api/db/tasks/:id', async (req, res) => {
  try {
    await prisma.task.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: 'DB error', details: e.message });
  }
});

app.put('/api/employees/:id', async (req, res) => {
  try {
    const { lastName, firstName, postLinkId, departmentName } = req.body;
    const department = await prisma.department.upsert({
      where: { name: departmentName },
      update: {},
      create: { name: departmentName }
    });
    const employee = await prisma.employee.update({
      where: { id: parseInt(req.params.id) },
      data: {
        lastName,
        firstName,
        postLinkId,
        departmentId: department.id
      }
    });
    res.json(employee);
  } catch (e) {
    res.status(500).json({ error: 'DB error', details: e.message });
  }
});

app.delete('/api/employees/:id', async (req, res) => {
  try {
    await prisma.employee.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: 'DB error', details: e.message });
  }
});

app.post('/api/employees/by-info', async (req, res) => {
  try {
    const { lastName, firstName, postLinkId, departmentName } = req.body;
    
    // Try to find existing employee
    let employee = await prisma.employee.findFirst({
      where: {
        lastName: lastName,
        firstName: firstName
      },
      include: { department: true }
    });
    
    if (employee) {
      res.json(employee);
      return;
    }
    
    // Find or create department
    let department = await prisma.department.findFirst({
      where: { name: departmentName }
    });
    
    if (!department) {
      department = await prisma.department.create({
        data: { name: departmentName }
      });
    }
    
    // Create new employee
    employee = await prisma.employee.create({
      data: {
        lastName,
        firstName,
        postLinkId,
        departmentId: department.id
      },
      include: { department: true }
    });
    
    res.json(employee);
  } catch (e) {
    console.error('Error finding/creating employee:', e);
    res.status(500).json({ error: 'DB error', details: e.message });
  }
});

// Training Results endpoints
app.post('/api/training-results', async (req, res) => {
  try {
    const { employeeId, sessionId, totalTasks, correctAnswers, incorrectAnswers } = req.body;
    
    const result = await prisma.trainingResult.create({
      data: {
        employeeId: parseInt(employeeId),
        sessionId,
        totalTasks: parseInt(totalTasks),
        correctAnswers: parseInt(correctAnswers),
        incorrectAnswers: parseInt(incorrectAnswers)
      }
    });
    
    res.json(result);
  } catch (e) {
    console.error('Error creating training result:', e);
    res.status(500).json({ error: 'DB error', details: e.message });
  }
});

app.get('/api/training-results/ratings', async (req, res) => {
  try {
    const results = await prisma.trainingResult.groupBy({
      by: ['employeeId'],
      _count: {
        id: true
      },
      _sum: {
        correctAnswers: true,
        incorrectAnswers: true,
        totalTasks: true
      }
    });

    // Get employee details for each result
    const ratingsWithEmployees = await Promise.all(
      results.map(async (result) => {
        const employee = await prisma.employee.findUnique({
          where: { id: result.employeeId },
          include: { department: true }
        });
        
        return {
          employeeId: result.employeeId,
          lastName: employee?.lastName || 'Unknown',
          firstName: employee?.firstName || 'Unknown',
          department: employee?.department?.name || null,
          totalSessions: result._count.id,
          totalCorrect: result._sum.correctAnswers || 0,
          totalIncorrect: result._sum.incorrectAnswers || 0,
          totalAnswers: (result._sum.correctAnswers || 0) + (result._sum.incorrectAnswers || 0)
        };
      })
    );

    // Sort by success rate (correct answers / total answers) descending
    ratingsWithEmployees.sort((a, b) => {
      const aRate = a.totalAnswers > 0 ? a.totalCorrect / a.totalAnswers : 0;
      const bRate = b.totalAnswers > 0 ? b.totalCorrect / b.totalAnswers : 0;
      return bRate - aRate;
    });

    res.json(ratingsWithEmployees);
  } catch (e) {
    console.error('Error fetching ratings:', e);
    res.status(500).json({ error: 'DB error', details: e.message });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});