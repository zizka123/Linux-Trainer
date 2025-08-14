import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getGroups, createDbGroup, createDbTask, createEmployee } from '../services/api';
import './AdminPage.css';

function AdminPage() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [expanded, setExpanded] = useState({});
  const [activeTab, setActiveTab] = useState('tasks'); // tasks | employees

  // DB forms state
  const [newDbTask, setNewDbTask] = useState({ title: '', description: '', command: '', hint: '', groupName: '' });
  const [showGroupDropdown, setShowGroupDropdown] = useState(false);
  const [isCreatingNewGroup, setIsCreatingNewGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newDepartmentName, setNewDepartmentName] = useState('');
  const [newEmployee, setNewEmployee] = useState({ lastName: '', firstName: '', postLinkId: '', departmentName: '' });
  const [showDepartmentDropdown, setShowDepartmentDropdown] = useState(false);
  const [isCreatingNewDepartment, setIsCreatingNewDepartment] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [editingGroup, setEditingGroup] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [isCreatingDepartmentInEdit, setIsCreatingDepartmentInEdit] = useState(false);
  const [isCreatingGroupInEdit, setIsCreatingGroupInEdit] = useState(false);
  const [newDepartmentInEdit, setNewDepartmentInEdit] = useState('');
  const [newGroupInEdit, setNewGroupInEdit] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeleteOptionsModal, setShowDeleteOptionsModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [expandedDepartments, setExpandedDepartments] = useState({});
  const groupDropdownRef = useRef(null);
  const departmentDropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('adminAuthenticated')) {
      navigate('/login');
      return;
    }
    loadGroups();
    loadDepartments();
    loadEmployees();
  }, [navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (groupDropdownRef.current && !groupDropdownRef.current.contains(event.target)) {
        setShowGroupDropdown(false);
      }
      if (departmentDropdownRef.current && !departmentDropdownRef.current.contains(event.target)) {
        setShowDepartmentDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const loadGroups = async () => {
    try {
      setLoading(true);
      const response = await getGroups();
      setGroups(response.data);
      setError(null);
    } catch (error) {
      console.error('Error loading groups:', error);
      setError('Не удалось загрузить группы');
    } finally {
      setLoading(false);
    }
  };

  const loadDepartments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/departments');
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      console.error('Error loading departments:', error);
    }
  };

  const loadEmployees = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/employees');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error loading employees:', error);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/');
  };

  const toggleGroupDetails = (groupId) => {
    setExpanded(prev => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const handleGroupSelection = (groupName) => {
    if (groupName === '+ Создать новую группу') {
      setIsCreatingNewGroup(true);
      setNewDbTask({ ...newDbTask, groupName: '' });
    } else {
      setIsCreatingNewGroup(false);
      setNewDbTask({ ...newDbTask, groupName });
    }
    setShowGroupDropdown(false);
  };

  const handleCreateNewGroupAndTask = async () => {
    try {
      if (!newGroupName.trim()) {
        showNotification('Введите название новой группы', 'error');
        return;
      }
      await createDbGroup(newGroupName.trim());
      const groupName = newGroupName.trim();
      setNewDbTask({ ...newDbTask, groupName });
      setNewGroupName('');
      setIsCreatingNewGroup(false);
      await loadGroups();
      showNotification('Новая группа создана и выбрана', 'success');
    } catch (e) {
      showNotification('Ошибка создания группы', 'error');
    }
  };

  const handleDepartmentSelection = (departmentName) => {
    if (departmentName === '+ Создать новый отдел') {
      setIsCreatingNewDepartment(true);
      setNewEmployee({ ...newEmployee, departmentName: '' });
    } else {
      setIsCreatingNewDepartment(false);
      setNewEmployee({ ...newEmployee, departmentName });
    }
    setShowDepartmentDropdown(false);
  };

  const handleCreateNewDepartment = async () => {
    try {
      if (!newDepartmentName.trim()) {
        showNotification('Введите название нового отдела', 'error');
        return;
      }
      await fetch('http://localhost:5000/api/departments', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ name: newDepartmentName.trim() }) 
      });
      const departmentName = newDepartmentName.trim();
      setNewEmployee({ ...newEmployee, departmentName });
      setNewDepartmentName('');
      setIsCreatingNewDepartment(false);
      await loadDepartments();
      showNotification('Новый отдел создан и выбран', 'success');
    } catch (e) {
      showNotification('Ошибка создания отдела', 'error');
    }
  };

  const handleCancelCreateGroup = () => {
    setIsCreatingNewGroup(false);
    setNewGroupName('');
  };

  const handleCancelCreateDepartment = () => {
    setIsCreatingNewDepartment(false);
    setNewDepartmentName('');
  };

  // CRUD operations for groups, tasks, and employees
  const handleEditGroup = (group) => {
    setEditingGroup({ ...group });
  };

  const handleUpdateGroup = async () => {
    try {
      await fetch(`http://localhost:5000/api/task-groups/${editingGroup.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editingGroup.name })
      });
      setEditingGroup(null);
      await loadGroups();
      showNotification('Группа обновлена', 'success');
    } catch (e) {
      showNotification('Ошибка обновления группы', 'error');
    }
  };

  const handleDeleteGroup = (group) => {
    setDeleteTarget({ type: 'group', id: group.id, name: group.name, hasItems: group.tasks.length > 0 });
    if (group.tasks.length > 0) {
      setShowDeleteOptionsModal(true);
    } else {
      setShowConfirmModal(true);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask({ ...task });
  };

  const handleUpdateTask = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/db/tasks/${editingTask.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editingTask.title,
          description: editingTask.description,
          command: editingTask.command,
          hint: editingTask.hint,
          groupId: editingTask.groupId
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      setEditingTask(null);
      setIsCreatingGroupInEdit(false);
      setNewGroupInEdit('');
      await loadGroups();
      showNotification('Задача обновлена', 'success');
    } catch (e) {
      console.error('Error updating task:', e);
      showNotification('Ошибка обновления задачи', 'error');
    }
  };

  const handleDeleteTask = (task) => {
    setDeleteTarget({ type: 'task', id: task.id, name: task.title });
    setShowConfirmModal(true);
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee({ ...employee, departmentName: employee.department || '' });
  };

  const handleUpdateEmployee = async () => {
    try {
      await fetch(`http://localhost:5000/api/employees/${editingEmployee.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lastName: editingEmployee.lastName,
          firstName: editingEmployee.firstName,
          postLinkId: editingEmployee.postLinkId,
          departmentName: editingEmployee.departmentName
        })
      });
      setEditingEmployee(null);
      await loadEmployees();
      showNotification('Сотрудник обновлен', 'success');
    } catch (e) {
      showNotification('Ошибка обновления сотрудника', 'error');
    }
  };

  const handleDeleteEmployee = (employee) => {
    setDeleteTarget({ type: 'employee', id: employee.id, name: `${employee.firstName} ${employee.lastName}` });
    setShowConfirmModal(true);
  };

  const handleEditDepartment = (department) => {
    setEditingDepartment({ ...department });
  };

  const handleUpdateDepartment = async () => {
    try {
      await fetch(`http://localhost:5000/api/departments/${editingDepartment.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editingDepartment.name })
      });
      setEditingDepartment(null);
      await loadDepartments();
      await loadEmployees();
      showNotification('Отдел обновлен', 'success');
    } catch (e) {
      showNotification('Ошибка обновления отдела', 'error');
    }
  };

  const handleDeleteDepartment = (department, employeeCount) => {
    setDeleteTarget({ 
      type: 'department', 
      id: department.id, 
      name: department.name, 
      hasItems: employeeCount > 0 
    });
    if (employeeCount > 0) {
      setShowDeleteOptionsModal(true);
    } else {
      setShowConfirmModal(true);
    }
  };

  const toggleDepartmentDetails = (departmentName) => {
    setExpandedDepartments(prev => ({ ...prev, [departmentName]: !prev[departmentName] }));
  };

  const confirmDelete = async () => {
    try {
      if (deleteTarget.type === 'group') {
        await fetch(`http://localhost:5000/api/task-groups/${deleteTarget.id}`, { method: 'DELETE' });
        await loadGroups();
      } else if (deleteTarget.type === 'task') {
        await fetch(`http://localhost:5000/api/db/tasks/${deleteTarget.id}`, { method: 'DELETE' });
        await loadGroups();
      } else if (deleteTarget.type === 'employee') {
        await fetch(`http://localhost:5000/api/employees/${deleteTarget.id}`, { method: 'DELETE' });
        await loadEmployees();
      } else if (deleteTarget.type === 'department') {
        await fetch(`http://localhost:5000/api/departments/${deleteTarget.id}`, { method: 'DELETE' });
        await loadDepartments();
        await loadEmployees();
      }
      setShowConfirmModal(false);
      setDeleteTarget(null);
      const itemName = deleteTarget.type === 'group' ? 'Группа' : 
                      deleteTarget.type === 'task' ? 'Задача' : 
                      deleteTarget.type === 'employee' ? 'Сотрудник' : 'Отдел';
      showNotification(`${itemName} удален${deleteTarget.type === 'employee' ? '' : deleteTarget.type === 'department' ? '' : 'а'}`, 'success');
    } catch (e) {
      showNotification('Ошибка удаления', 'error');
    }
  };

  const confirmDeleteWithItems = async () => {
    try {
      if (deleteTarget.type === 'group') {
        // Delete group with all tasks
        await fetch(`http://localhost:5000/api/task-groups/${deleteTarget.id}`, { method: 'DELETE' });
        await loadGroups();
        showNotification('Группа и все задачи удалены', 'success');
      } else if (deleteTarget.type === 'department') {
        // Delete department with all employees
        await fetch(`http://localhost:5000/api/departments/${deleteTarget.id}?deleteEmployees=true`, { method: 'DELETE' });
        await loadDepartments();
        await loadEmployees();
        showNotification('Отдел и все сотрудники удалены', 'success');
      }
      setShowDeleteOptionsModal(false);
      setDeleteTarget(null);
    } catch (e) {
      showNotification('Ошибка удаления', 'error');
    }
  };

  const confirmDeleteOnlyContainer = async () => {
    try {
      if (deleteTarget.type === 'group') {
        // Delete only group, move tasks to null group or default
        await fetch(`http://localhost:5000/api/task-groups/${deleteTarget.id}?onlyGroup=true`, { method: 'DELETE' });
        await loadGroups();
        showNotification('Группа удалена, задачи перенесены в "Нераспределенные задачи"', 'success');
      } else if (deleteTarget.type === 'department') {
        // Delete only department, set employees' department to null
        await fetch(`http://localhost:5000/api/departments/${deleteTarget.id}?onlyDepartment=true`, { method: 'DELETE' });
        await loadDepartments();
        await loadEmployees();
        showNotification('Отдел удален, сотрудники перенесены в "Нераспределенные сотрудники"', 'success');
      }
      setShowDeleteOptionsModal(false);
      setDeleteTarget(null);
    } catch (e) {
      showNotification('Ошибка удаления', 'error');
    }
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
    setShowDeleteOptionsModal(false);
    setDeleteTarget(null);
  };

  const handleCreateDepartmentInEdit = async () => {
    try {
      if (!newDepartmentInEdit.trim()) {
        showNotification('Введите название нового отдела', 'error');
        return;
      }
      await fetch('http://localhost:5000/api/departments', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ name: newDepartmentInEdit.trim() }) 
      });
      
      setEditingEmployee({ ...editingEmployee, departmentName: newDepartmentInEdit.trim() });
      setNewDepartmentInEdit('');
      setIsCreatingDepartmentInEdit(false);
      await loadDepartments();
      showNotification('Новый отдел создан и выбран', 'success');
    } catch (e) {
      showNotification('Ошибка создания отдела', 'error');
    }
  };

  const handleCreateGroupInEdit = async () => {
    try {
      if (!newGroupInEdit.trim()) {
        showNotification('Введите название новой группы', 'error');
        return;
      }
      await fetch('http://localhost:5000/api/task-groups', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ name: newGroupInEdit.trim() }) 
      });
      
      // Find the newly created group
      const response = await fetch('http://localhost:5000/api/task-groups');
      const groups = await response.json();
      const newGroup = groups.find(g => g.name === newGroupInEdit.trim());
      
      setEditingTask({ 
        ...editingTask, 
        group: newGroup, 
        groupId: newGroup.id 
      });
      setNewGroupInEdit('');
      setIsCreatingGroupInEdit(false);
      await loadGroups();
      showNotification('Новая группа создана и выбрана', 'success');
    } catch (e) {
      showNotification('Ошибка создания группы', 'error');
    }
  };

  return (
    <div className="admin-page-wrapper">
      <header className="admin-header">
        <h1>Админ-панель тренажера AstraLinux</h1>
        <button onClick={handleLogout} className="logout-btn">
          ← Вернуться к тренажеру
        </button>
      </header>

      <div className="admin-content-wrapper">
        {/* Tabs */}
        <div className="tabs">
          <button className={`tab ${activeTab === 'tasks' ? 'active' : ''}`} onClick={() => setActiveTab('tasks')}>Задачи и группы</button>
          <button className={`tab ${activeTab === 'employees' ? 'active' : ''}`} onClick={() => setActiveTab('employees')}>Сотрудники и отделы</button>
        </div>

        {activeTab === 'tasks' && (
        <div className="admin-content">
          <div className="task-form-section">
              <h2>Добавить задачу</h2>
              <div className="form-group"><label>Название</label><input value={newDbTask.title} onChange={(e) => setNewDbTask({ ...newDbTask, title: e.target.value })} /></div>
              <div className="form-group"><label>Описание</label><textarea value={newDbTask.description} onChange={(e) => setNewDbTask({ ...newDbTask, description: e.target.value })} /></div>
              <div className="form-group"><label>Команда</label><input value={newDbTask.command} onChange={(e) => setNewDbTask({ ...newDbTask, command: e.target.value })} /></div>
              <div className="form-group"><label>Подсказка</label><textarea value={newDbTask.hint} onChange={(e) => setNewDbTask({ ...newDbTask, hint: e.target.value })} /></div>
              
              <div className="form-group">
                <label>Группа</label>
                <div className="group-selector" ref={groupDropdownRef}>
                  <input 
                    value={newDbTask.groupName} 
                    onChange={(e) => setNewDbTask({ ...newDbTask, groupName: e.target.value })}
                    onFocus={() => setShowGroupDropdown(true)}
                    placeholder="Выберите или введите группу"
                    disabled={isCreatingNewGroup}
                    readOnly={!isCreatingNewGroup && newDbTask.groupName && groups.some(g => g.name === newDbTask.groupName)}
                  />
                  {showGroupDropdown && !isCreatingNewGroup && (
                    <div className="group-dropdown">
                      <div className="group-option create-new" onClick={() => handleGroupSelection('+ Создать новую группу')}>
                        + Создать новую группу
                      </div>
                      {groups.map(group => (
                        <div key={group.id} className="group-option" onClick={() => handleGroupSelection(group.name)}>
                          {group.name} ({group.tasks.length})
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {isCreatingNewGroup && (
                <div className="form-group">
                  <label>Название новой группы</label>
                  <input 
                    value={newGroupName} 
                    onChange={(e) => setNewGroupName(e.target.value)} 
                    placeholder="Основы Linux" 
                  />
                  <div style={{ marginTop: 10, display: 'flex', gap: '10px' }}>
                    <button className="save-btn" onClick={handleCreateNewGroupAndTask}>
                      Создать группу
                    </button>
                    <button className="cancel-btn" onClick={handleCancelCreateGroup}>
                      Отменить
                    </button>
                  </div>
                </div>
              )}

              <button className="save-btn" onClick={async () => {
                try {
                  const { title, description, command, hint, groupName } = newDbTask;
                  if (!title.trim() || !description.trim() || !command.trim() || !groupName.trim()) return;
                  await createDbTask({ title, description, command, hint: hint || '', groupName: groupName.trim() });
                  setNewDbTask({ title: '', description: '', command: '', hint: '', groupName: '' });
                  setIsCreatingNewGroup(false);
                  await loadGroups();
                  showNotification('Задача добавлена', 'success');
                } catch (e) {
                  showNotification('Ошибка добавления задачи', 'error');
                }
              }}>Сохранить задачу</button>
          </div>

          <div className="task-list-section">
            <h2>Список групп</h2>
                      {loading ? (
            <p>Загрузка...</p>
          ) : error ? (
              <p className="error-message">{error}</p>
            ) : groups.length === 0 ? (
              <p>Нет групп для отображения</p>
            ) : (
              groups.filter(group => group.tasks && group.tasks.length > 0).map(group => (
                <div key={group.id} className="admin-task">
                    <div className="group-header">
                      <div onClick={() => toggleGroupDetails(group.id)} style={{ flex: 1, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <h3>
                          {editingGroup && editingGroup.id === group.id ? (
                            <input 
                              value={editingGroup.name}
                              onChange={(e) => setEditingGroup({ ...editingGroup, name: e.target.value })}
                              onBlur={handleUpdateGroup}
                              onKeyPress={(e) => e.key === 'Enter' && handleUpdateGroup()}
                              autoFocus
                            />
                          ) : (
                            <>
                    {group.name}
                      <span className="group-count-badge">{group.tasks.length}</span>
                            </>
                    )}
                  </h3>
                        <button className={`toggle-details-btn ${expanded[group.id] ? 'expanded' : ''}`}>
                          <svg className="chevron" width="16" height="16" viewBox="0 0 24 24">
                          <path d="M8.12 9.29L12 13.17l3.88-3.88a1 1 0 111.41 1.42l-4.59 4.58a1 1 0 01-1.41 0L6.7 10.71a1 1 0 011.42-1.42z" fill="currentColor"/>
                        </svg>
                      </button>
                      </div>
                      <div className="group-actions">
                        {group.name !== 'Нераспределенные задачи' && (
                          <button className="edit-btn" onClick={(e) => { e.stopPropagation(); handleEditGroup(group); }}>
                            ✏️
                          </button>
                        )}
                        {group.name !== 'Нераспределенные задачи' && (
                          <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDeleteGroup(group); }}>
                            🗑️
                          </button>
                        )}
                      </div>
                  </div>
                  {expanded[group.id] && (
                    <div className="admin-task-details">
                      {group.tasks.map(task => (
                          <div key={task.id} className="admin-task-item">
                            {editingTask && editingTask.id === task.id ? (
                              <div className="edit-task-form">
                                <div className="form-group">
                                  <label>Название:</label>
                                  <input value={editingTask.title} onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })} />
                                </div>
                                <div className="form-group">
                                  <label>Описание:</label>
                                  <textarea value={editingTask.description} onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })} />
                                </div>
                                <div className="form-group">
                                  <label>Команда:</label>
                                  <input value={editingTask.command} onChange={(e) => setEditingTask({ ...editingTask, command: e.target.value })} />
                                </div>
                                <div className="form-group">
                                  <label>Подсказка:</label>
                                  <textarea value={editingTask.hint} onChange={(e) => setEditingTask({ ...editingTask, hint: e.target.value })} />
                                </div>
                                <div className="form-group">
                                  <label>Группа:</label>
                                  <select 
                                    value={isCreatingGroupInEdit ? '+ Создать новую группу' : (editingTask.group?.name || '')} 
                                    onChange={(e) => {
                                      if (e.target.value === '+ Создать новую группу') {
                                        setIsCreatingGroupInEdit(true);
                                        setEditingTask({ ...editingTask, group: null, groupId: null });
                                      } else {
                                        setIsCreatingGroupInEdit(false);
                                        const selectedGroup = groups.find(g => g.name === e.target.value);
                                        setEditingTask({ ...editingTask, group: selectedGroup, groupId: selectedGroup?.id });
                                      }
                                    }}
                                  >
                                    <option value="">Выберите группу</option>
                                    <option value="+ Создать новую группу">+ Создать новую группу</option>
                                    {groups.map(group => (
                                      <option key={group.id} value={group.name}>{group.name}</option>
                                    ))}
                                  </select>
                                </div>
                                {isCreatingGroupInEdit && (
                                  <div className="form-group">
                                    <label>Название новой группы:</label>
                                    <input 
                                      value={newGroupInEdit} 
                                      onChange={(e) => setNewGroupInEdit(e.target.value)} 
                                      placeholder="Введите название группы"
                                    />
                                    <div style={{ marginTop: 10, display: 'flex', gap: '10px' }}>
                                      <button className="save-btn" onClick={handleCreateGroupInEdit}>
                                        Создать группу
                                      </button>
                                      <button className="cancel-btn" onClick={() => {
                                        setIsCreatingGroupInEdit(false);
                                        setNewGroupInEdit('');
                                      }}>
                                        Отменить
                                      </button>
                                    </div>
                                  </div>
                                )}
                                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                  <button className="save-btn" onClick={handleUpdateTask}>Сохранить</button>
                                  <button className="cancel-btn" onClick={() => {
                                    setEditingTask(null);
                                    setIsCreatingGroupInEdit(false);
                                    setNewGroupInEdit('');
                                  }}>Отменить</button>
                                </div>
                              </div>
                            ) : (
                              <>
                          <div className="admin-task-line"><strong>Название:</strong> {task.title}</div>
                          <div className="admin-task-line"><strong>Описание:</strong> {task.description}</div>
                          <div className="admin-task-line"><strong>Команда:</strong> <code>{task.command}</code></div>
                                <div className="task-actions">
                                  <button className="edit-btn" onClick={() => handleEditTask(task)}>✏️</button>
                                  <button className="delete-btn" onClick={() => handleDeleteTask(task)}>🗑️</button>
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'employees' && (
          <div className="admin-content">
            <div className="task-form-section">
              <h2>Добавить сотрудника</h2>
              <div className="form-group"><label>Фамилия</label><input value={newEmployee.lastName} onChange={(e) => setNewEmployee({ ...newEmployee, lastName: e.target.value })} /></div>
              <div className="form-group"><label>Имя</label><input value={newEmployee.firstName} onChange={(e) => setNewEmployee({ ...newEmployee, firstName: e.target.value })} /></div>
              <div className="form-group"><label>ID PostLink</label><input value={newEmployee.postLinkId} onChange={(e) => setNewEmployee({ ...newEmployee, postLinkId: e.target.value })} /></div>
              
              <div className="form-group">
                <label>Отдел</label>
                <div className="group-selector" ref={departmentDropdownRef}>
                  <input 
                    value={newEmployee.departmentName} 
                    onChange={(e) => setNewEmployee({ ...newEmployee, departmentName: e.target.value })}
                    onFocus={() => setShowDepartmentDropdown(true)}
                    placeholder="Выберите или введите отдел"
                    disabled={isCreatingNewDepartment}
                    readOnly={!isCreatingNewDepartment && newEmployee.departmentName && departments.some(d => d.name === newEmployee.departmentName)}
                  />
                  {showDepartmentDropdown && !isCreatingNewDepartment && (
                    <div className="group-dropdown">
                      <div className="group-option create-new" onClick={() => handleDepartmentSelection('+ Создать новый отдел')}>
                        + Создать новый отдел
                      </div>
                      {departments.map(department => {
                        const employeeCount = employees.filter(emp => emp.department === department.name).length;
                        return (
                          <div key={department.id} className="group-option" onClick={() => handleDepartmentSelection(department.name)}>
                            {department.name} ({employeeCount})
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {isCreatingNewDepartment && (
                <div className="form-group">
                  <label>Название нового отдела</label>
                  <input 
                    value={newDepartmentName} 
                    onChange={(e) => setNewDepartmentName(e.target.value)} 
                    placeholder="УКОИ" 
                  />
                  <div style={{ marginTop: 10, display: 'flex', gap: '10px' }}>
                    <button className="save-btn" onClick={handleCreateNewDepartment}>
                      Создать отдел
                    </button>
                    <button className="cancel-btn" onClick={handleCancelCreateDepartment}>
                      Отменить
                    </button>
                  </div>
                </div>
              )}

              <button className="save-btn" onClick={async () => {
                try {
                  if (!newEmployee.lastName.trim() || !newEmployee.firstName.trim() || !newEmployee.postLinkId.trim() || !newEmployee.departmentName.trim()) return;
                  await createEmployee(newEmployee);
                  setNewEmployee({ lastName: '', firstName: '', postLinkId: '', departmentName: '' });
                  setIsCreatingNewDepartment(false);
                  await loadEmployees();
                  showNotification('Сотрудник добавлен', 'success');
                } catch (e) {
                  showNotification('Ошибка добавления сотрудника', 'error');
                }
              }}>Сохранить сотрудника</button>
            </div>

            <div className="task-list-section">
              <h2>Список сотрудников</h2>
              {employees.length === 0 ? (
                <p>Нет сотрудников для отображения</p>
              ) : (
                (() => {
                  // Group employees by department
                  const groupedEmployees = employees.reduce((acc, employee) => {
                    const deptName = employee.department || 'Без отдела';
                    if (!acc[deptName]) {
                      acc[deptName] = [];
                    }
                    acc[deptName].push(employee);
                    return acc;
                  }, {});

                  // Find department objects for departments with employees
                  const departmentsWithEmployees = Object.keys(groupedEmployees).map(deptName => {
                    if (deptName === 'Без отдела') {
                      return { name: deptName, id: null, employees: groupedEmployees[deptName] };
                    }
                    const dept = departments.find(d => d.name === deptName);
                    return { 
                      name: deptName, 
                      id: dept?.id || null, 
                      employees: groupedEmployees[deptName] 
                    };
                  });

                  return departmentsWithEmployees.filter(department => department.employees && department.employees.length > 0).map(department => (
                    <div key={department.name} className="admin-task">
                      <div className="group-header">
                        <div onClick={() => toggleDepartmentDetails(department.name)} style={{ flex: 1, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                          <h3>
                            {editingDepartment && editingDepartment.id === department.id ? (
                              <input 
                                value={editingDepartment.name}
                                onChange={(e) => setEditingDepartment({ ...editingDepartment, name: e.target.value })}
                                onBlur={handleUpdateDepartment}
                                onKeyPress={(e) => e.key === 'Enter' && handleUpdateDepartment()}
                                autoFocus
                              />
                            ) : (
                              <>
                                {department.name}
                                <span className="group-count-badge">{department.employees.length}</span>
                              </>
                            )}
                          </h3>
                          <button className={`toggle-details-btn ${expandedDepartments[department.name] ? 'expanded' : ''}`}>
                            <svg className="chevron" width="16" height="16" viewBox="0 0 24 24">
                              <path d="M8.12 9.29L12 13.17l3.88-3.88a1 1 0 111.41 1.42l-4.59 4.58a1 1 0 01-1.41 0L6.7 10.71a1 1 0 011.42-1.42z" fill="currentColor"/>
                            </svg>
                          </button>
                        </div>
                        {department.id && (
                          <div className="group-actions">
                            {department.name !== 'Нераспределенные сотрудники' && (
                              <button className="edit-btn" onClick={(e) => { e.stopPropagation(); handleEditDepartment(department); }}>
                                ✏️
                              </button>
                            )}
                            {department.name !== 'Нераспределенные сотрудники' && (
                              <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDeleteDepartment(department, department.employees.length); }}>
                                🗑️
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                      {expandedDepartments[department.name] && (
                        <div className="admin-task-details">
                          {department.employees.map(employee => (
                            <div key={employee.id} className="admin-task-item">
                              {editingEmployee && editingEmployee.id === employee.id ? (
                                <div className="edit-employee-form">
                                  <div className="form-group">
                                    <label>Фамилия:</label>
                                    <input value={editingEmployee.lastName} onChange={(e) => setEditingEmployee({ ...editingEmployee, lastName: e.target.value })} />
                                  </div>
                                  <div className="form-group">
                                    <label>Имя:</label>
                                    <input value={editingEmployee.firstName} onChange={(e) => setEditingEmployee({ ...editingEmployee, firstName: e.target.value })} />
                                  </div>
                                  <div className="form-group">
                                    <label>ID PostLink:</label>
                                    <input value={editingEmployee.postLinkId} onChange={(e) => setEditingEmployee({ ...editingEmployee, postLinkId: e.target.value })} />
                                  </div>
                                  <div className="form-group">
                                    <label>Отдел:</label>
                                    <select 
                                      value={isCreatingDepartmentInEdit ? '+ Создать новый отдел' : editingEmployee.departmentName} 
                                      onChange={(e) => {
                                        if (e.target.value === '+ Создать новый отдел') {
                                          setIsCreatingDepartmentInEdit(true);
                                          setEditingEmployee({ ...editingEmployee, departmentName: '' });
                                        } else {
                                          setIsCreatingDepartmentInEdit(false);
                                          setEditingEmployee({ ...editingEmployee, departmentName: e.target.value });
                                        }
                                      }}
                                    >
                                      <option value="">Выберите отдел</option>
                                      <option value="+ Создать новый отдел">+ Создать новый отдел</option>
                                      {departments.map(dept => (
                                        <option key={dept.id} value={dept.name}>{dept.name}</option>
                                      ))}
                                    </select>
                                  </div>
                                  {isCreatingDepartmentInEdit && (
                                    <div className="form-group">
                                      <label>Название нового отдела:</label>
                                      <input 
                                        value={newDepartmentInEdit} 
                                        onChange={(e) => setNewDepartmentInEdit(e.target.value)} 
                                        placeholder="Введите название отдела"
                                      />
                                      <div style={{ marginTop: 10, display: 'flex', gap: '10px' }}>
                                        <button className="save-btn" onClick={handleCreateDepartmentInEdit}>
                                          Создать отдел
                                        </button>
                                        <button className="cancel-btn" onClick={() => {
                                          setIsCreatingDepartmentInEdit(false);
                                          setNewDepartmentInEdit('');
                                        }}>
                                          Отменить
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                    <button className="save-btn" onClick={handleUpdateEmployee}>Сохранить</button>
                                    <button className="cancel-btn" onClick={() => {
                                      setEditingEmployee(null);
                                      setIsCreatingDepartmentInEdit(false);
                                      setNewDepartmentInEdit('');
                                    }}>Отменить</button>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <div className="admin-task-line"><strong>Имя:</strong> {employee.firstName} {employee.lastName}</div>
                                  <div className="admin-task-line"><strong>ID PostLink:</strong> {employee.postLinkId}</div>
                                  <div className="employee-actions">
                                    <button className="edit-btn" onClick={() => handleEditEmployee(employee)}>✏️</button>
                                    <button className="delete-btn" onClick={() => handleDeleteEmployee(employee)}>🗑️</button>
                                  </div>
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ));
                                })()
            )}
          </div>
        </div>
        )}
      </div>
      
      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Подтвердите удаление</h3>
            <p>Вы действительно хотите удалить "{deleteTarget?.name}"?</p>
            <div className="modal-actions">
              <button className="confirm-btn" onClick={confirmDelete}>Удалить</button>
              <button className="cancel-btn" onClick={cancelDelete}>Отменить</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Options Modal */}
      {showDeleteOptionsModal && (
        <div className="modal-overlay">
          <div className="modal delete-options-modal">
            <h3>Выберите способ удаления</h3>
            <p>
              {deleteTarget?.type === 'group' 
                ? `Группа "${deleteTarget?.name}" содержит задачи. Что делать?`
                : `Отдел "${deleteTarget?.name}" содержит сотрудников. Что делать?`
              }
            </p>
            <div className="delete-options">
              <button className="confirm-btn" onClick={confirmDeleteWithItems}>
                {deleteTarget?.type === 'group' 
                  ? 'Удалить группу и все задачи'
                  : 'Удалить отдел и всех сотрудников'
                }
              </button>
              <button className="warning-btn" onClick={confirmDeleteOnlyContainer}>
                {deleteTarget?.type === 'group' 
                  ? 'Удалить только группу (задачи перейдут в "Нераспределенные задачи")'
                  : 'Удалить только отдел (сотрудники перейдут в "Нераспределенные сотрудники")'
                }
              </button>
              <button className="cancel-btn" onClick={cancelDelete}>Отменить</button>
            </div>
          </div>
        </div>
      )}
      
      {/* Notification */}
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
}

export default AdminPage;