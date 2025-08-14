import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks`);
    console.log('API Response:', response.data);
    return response;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
};

export const getGroups = async () => {
  try {
    const response = await axios.get(`${API_URL}/task-groups`);
    // Возвращаем уже сгруппированные данные из БД
    const groups = (response.data || []).map(g => ({
      id: g.id,
      name: g.name,
      tasks: (g.tasks || []).map(t => ({
        id: t.id,
        title: t.title,
        description: t.description,
        command: t.command,
        hint: t.hint,
        group: g.name
      }))
    }));
    return { data: groups };
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
};

export const addTask = async (task) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, task);
    return response;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`${API_URL}/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
};

export const updateTask = async (task) => {
  try {
    const response = await axios.put(`${API_URL}/tasks/${task.id}`, task);
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
};

// DB-backed endpoints
export const getDbGroups = async () => {
  const res = await axios.get(`${API_URL}/task-groups`);
  return res.data;
};

export const createDbGroup = async (name) => {
  const res = await axios.post(`${API_URL}/task-groups`, { name });
  return res.data;
};

export const getEmployees = async (q = '') => {
  const res = await axios.get(`${API_URL}/employees`, { params: { q } });
  return res.data;
};

export const createEmployee = async (employee) => {
  const res = await axios.post(`${API_URL}/employees`, employee);
  return res.data;
};

export const createDbTask = async (task) => {
  const res = await axios.post(`${API_URL}/db/tasks`, task);
  return res.data;
};

// Training Results API
export const saveTrainingResult = async (result) => {
  try {
    const response = await axios.post(`${API_URL}/training-results`, result);
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
};

export const getRatings = async () => {
  try {
    const response = await axios.get(`${API_URL}/training-results/ratings`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
};