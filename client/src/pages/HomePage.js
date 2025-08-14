import React, { useState, useEffect } from 'react';
import Task from '../components/Task';
import { getGroups, saveTrainingResult } from '../services/api';
import AuthModal from '../components/AuthModal';
import { getTasks } from '../services/api';
import UserInfoModal from '../components/UserInfoModal';
import Rating from '../components/Rating';
import './HomePage.css';

function HomePage() {
  const [groups, setGroups] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTrainingStarted, setIsTrainingStarted] = useState(false);
  const [trainingResults, setTrainingResults] = useState({});
  const [showReport, setShowReport] = useState(false);
  const [selectedGroupIds, setSelectedGroupIds] = useState([]);
  const [isGroupSelectionDone, setIsGroupSelectionDone] = useState(false);
  const [attemptsByTask, setAttemptsByTask] = useState({});
  const [showUserInfoModal, setShowUserInfoModal] = useState(false);
  const [userInfo, setUserInfo] = useState({ lastName: '', firstName: '', department: '', postLinkId: '' });
  const [isUserInfoDone, setIsUserInfoDone] = useState(false);
  const [showRating, setShowRating] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getGroups();
        setGroups(response.data);
      } catch (error) {
        setError('Не удалось загрузить задачи');
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const toggleGroup = (groupId) => {
    setExpanded(prev => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const startTraining = () => {
    setIsTrainingStarted(true);
    setShowReport(false);
    setTrainingResults({});
    // Предварительно выбираем все группы для удобства, исключая "Нераспределенные задачи"
    const availableGroups = groups.filter(g => g.name !== 'Нераспределенные задачи');
    setSelectedGroupIds(availableGroups.map(g => g.id));
    setIsGroupSelectionDone(false);
    setAttemptsByTask({});
  };

  const finishTraining = async () => {
    setShowReport(true);
    
    // Save training results to database only if user is not a guest
    if (isUserInfoDone && userInfo.lastName && userInfo.firstName && !userInfo.isGuest) {
      try {
        const selectedGroups = groups.filter(group => selectedGroupIds.includes(group.id));
        const allTasks = selectedGroups.flatMap(group => group.tasks);
        const correctAnswers = allTasks.filter(task => trainingResults[task.id] === true).length;
        const incorrectAnswers = allTasks.filter(task => trainingResults[task.id] === false).length;
        
        // First, try to find or create the employee
        const employeeResponse = await fetch('http://localhost:5000/api/employees/by-info', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            lastName: userInfo.lastName,
            firstName: userInfo.firstName,
            postLinkId: userInfo.postLinkId || `${userInfo.lastName}_${userInfo.firstName}_${Date.now()}`,
            departmentName: userInfo.department || 'Не указан'
          })
        });
        
        const employee = await employeeResponse.json();
        
        // Save training result
        const sessionId = `${Date.now()}_${employee.id}`;
        await saveTrainingResult({
          employeeId: employee.id,
          sessionId,
          totalTasks: allTasks.length,
          correctAnswers,
          incorrectAnswers
        });
        
        console.log('Training results saved successfully');
      } catch (error) {
        console.error('Error saving training results:', error);
      }
    } else if (userInfo.isGuest) {
      console.log('Guest user - results not saved to database');
    }
  };

  const resetTraining = () => {
    setIsTrainingStarted(false);
    setShowReport(false);
    setTrainingResults({});
    setSelectedGroupIds([]);
    setIsGroupSelectionDone(false);
    setAttemptsByTask({});
  };

  const handleTaskResult = (taskId, isCorrect) => {
    setTrainingResults(prev => ({
      ...prev,
      [taskId]: isCorrect
    }));
  };

  const handleAttempt = (taskId, isCorrect) => {
    setAttemptsByTask(prev => ({
      ...prev,
      [taskId]: (prev[taskId] || 0) + 1
    }));
  };

  const toggleSelectGroup = (groupId) => {
    setSelectedGroupIds(prev => (
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    ));
  };

  const toggleSelectAllGroups = () => {
    const availableGroups = groups.filter(g => g.name !== 'Нераспределенные задачи');
    if (selectedGroupIds.length === availableGroups.length) {
      setSelectedGroupIds([]);
    } else {
      setSelectedGroupIds(availableGroups.map(g => g.id));
    }
  };

  const confirmGroupSelection = () => {
    if (selectedGroupIds.length > 0) {
      setIsGroupSelectionDone(true);
      setShowUserInfoModal(true);
    }
  };

  return (
    <div className="home-page-wrapper">
      <header className="home-header">
        <h1>Тренажер по командам AstraLinux</h1>
        <div className="header-buttons">
          <button 
            onClick={() => setShowRating(true)} 
            className="rating-link"
          >
            Рейтинг
          </button>
          <button 
            onClick={() => setShowAuthModal(true)} 
            className="admin-link"
          >
            Панель администратора
          </button>
        </div>
      </header>
      
      <div className="home-content">
        {loading ? (
          <p>Загрузка задач...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : groups.length === 0 ? (
          <p>Нет доступных задач</p>
        ) : !isTrainingStarted ? (
          <div className="start-training-section">
            <div className="start-training-content">
              <h2>Добро пожаловать в тренажер по командам AstraLinux!</h2>
              <p>Проверьте свои знания команд Linux и AstraLinux в интерактивном режиме.</p>
              <button 
                onClick={startTraining} 
                className="start-training-btn"
              >
                Запустить тренаж
              </button>
            </div>
          </div>
        ) : showReport ? (
          <div className="training-report">
            <h2>Отчет по тренажеру</h2>
            {(() => {
              const selectedGroups = groups.filter(group => selectedGroupIds.includes(group.id));
              const allTasks = selectedGroups.flatMap(group => group.tasks);
              const correctAnswers = allTasks.filter(task => trainingResults[task.id] === true);
              const incorrectAnswers = allTasks.filter(task => trainingResults[task.id] === false);
              const unansweredTasks = allTasks.filter(task => trainingResults[task.id] === undefined);
              
              return (
                <div className="report-content">
                  <div className="report-summary">
                    <div className="report-stat">
                      <span className="stat-label">Правильных ответов:</span>
                      <span className="stat-value correct">{correctAnswers.length}</span>
                    </div>
                    <div className="report-stat">
                      <span className="stat-label">Неправильных ответов:</span>
                      <span className="stat-value incorrect">{incorrectAnswers.length}</span>
                    </div>
                    <div className="report-stat">
                      <span className="stat-label">Не отвечено:</span>
                      <span className="stat-value unanswered">{unansweredTasks.length}</span>
                    </div>
                    <div className="report-stat">
                      <span className="stat-label">Всего задач:</span>
                      <span className="stat-value total">{allTasks.length}</span>
                    </div>
                  </div>
                   
                   <div className="report-details">
                     {(() => {
                       // Группируем задачи по группам
                       const groupResults = {};
                       
                       selectedGroups.forEach(group => {
                         groupResults[group.name] = {
                           correct: [],
                           incorrect: [],
                           unanswered: []
                         };
                         
                         group.tasks.forEach(task => {
                           const result = trainingResults[task.id];
                           if (result === true) {
                             groupResults[group.name].correct.push(task);
                           } else if (result === false) {
                             groupResults[group.name].incorrect.push(task);
                           } else {
                             groupResults[group.name].unanswered.push(task);
                           }
                         });
                       });
                       
                       return Object.entries(groupResults).map(([groupName, results]) => {
                         const totalInGroup = results.correct.length + results.incorrect.length + results.unanswered.length;
                         const hasAnyResults = results.correct.length > 0 || results.incorrect.length > 0 || results.unanswered.length > 0;
                         
                         if (!hasAnyResults) return null;
                         
                         return (
                           <div key={groupName} className="report-group">
                             <h3 className="group-title">{groupName} ({totalInGroup} задач)</h3>
                             
                              {results.correct.length > 0 && (
                               <div className="report-section correct-section">
                                 <h4>✅ Правильные ответы ({results.correct.length})</h4>
                                 <ul>
                                   {results.correct.map(task => (
                                     <li key={task.id}>
                                       <strong>{task.title}</strong> - {task.description}
                                        <br />
                                        <span className="correct-command">Попытки: {attemptsByTask[task.id] || 0} / 2</span>
                                     </li>
                                   ))}
                                 </ul>
                               </div>
                             )}
                             
                              {results.incorrect.length > 0 && (
                               <div className="report-section incorrect-section">
                                 <h4>❌ Неправильные ответы ({results.incorrect.length})</h4>
                                 <ul>
                                   {results.incorrect.map(task => (
                                     <li key={task.id}>
                                       <strong>{task.title}</strong> - {task.description}
                                       <br />
                                       <span className="correct-command">Правильная команда: <code>{task.command}</code></span>
                                        <br />
                                        <span className="correct-command">Попытки: {attemptsByTask[task.id] || 0} / 2</span>
                                     </li>
                                   ))}
                                 </ul>
                               </div>
                             )}
                             
                              {results.unanswered.length > 0 && (
                               <div className="report-section unanswered-section">
                                 <h4>⏭️ Не отвеченные задачи ({results.unanswered.length})</h4>
                                 <ul>
                                   {results.unanswered.map(task => (
                                     <li key={task.id}>
                                       <strong>{task.title}</strong> - {task.description}
                                       <br />
                                       <span className="correct-command">Правильная команда: <code>{task.command}</code></span>
                                        <br />
                                        <span className="correct-command">Попытки: {attemptsByTask[task.id] || 0} / 2</span>
                                     </li>
                                   ))}
                                 </ul>
                               </div>
                             )}
                           </div>
                         );
                       });
                     })()}
                   </div>
                  
                  <div className="report-actions">
                    <button onClick={resetTraining} className="reset-training-btn">
                      Начать заново
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        ) : !isGroupSelectionDone ? (
          <div className="group-selection">
            <h2>Выберите группы для тренировки</h2>
            <div className="group-selection-actions-top">
              <label className="select-all">
                <input
                  type="checkbox"
                  checked={selectedGroupIds.length === groups.filter(g => g.name !== 'Нераспределенные задачи').length}
                  onChange={toggleSelectAllGroups}
                />
                Выбрать все
              </label>
            </div>
            <div className="group-selection-list">
              {groups.filter(group => group.name !== 'Нераспределенные задачи').map(group => (
                <label key={group.id} className="group-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedGroupIds.includes(group.id)}
                    onChange={() => toggleSelectGroup(group.id)}
                  />
                  <span>{group.name} ({group.tasks.length})</span>
                </label>
              ))}
            </div>
            <div className="group-selection-actions-bottom">
              <button
                onClick={confirmGroupSelection}
                className="start-training-btn"
                disabled={selectedGroupIds.length === 0}
              >
                Запуск
              </button>
            </div>
          </div>
        ) : showUserInfoModal && !isUserInfoDone ? (
          <UserInfoModal 
            onClose={() => setShowUserInfoModal(false)}
            onSubmit={(info) => { setUserInfo(info); setIsUserInfoDone(true); setShowUserInfoModal(false); }}
          />
        ) : (
          <div className="training-mode">
            <div className="training-header">
              <h2>Тренажер активен</h2>
              {userInfo.isGuest ? (
                <div className="guest-mode-info">
                  <p>👤 <strong>Гостевой режим:</strong> Решайте задачи и проверяйте свои ответы. Результаты не сохраняются в рейтинг.</p>
                </div>
              ) : (
                <p>Решайте задачи и проверяйте свои ответы. Все результаты будут сохранены для отчета.</p>
              )}
              <p className="attempts-note">Максимум попыток на задачу: 2</p>
            </div>
            
            <div className="task-list">
              {groups.filter(group => selectedGroupIds.includes(group.id) && group.name !== 'Нераспределенные задачи').map(group => (
                <div key={group.id} className="group-block">
                  <div className="group-header" onClick={() => toggleGroup(group.id)}>
                    <h3>
                      {group.name}
                      {!expanded[group.id] && (
                        <span className="group-count-badge">{group.tasks.length}</span>
                      )}
                    </h3>
                    <button className={`toggle-details-btn ${expanded[group.id] ? 'expanded' : ''}`} aria-label={expanded[group.id] ? 'Скрыть' : 'Показать'}>
                      <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.12 9.29L12 13.17l3.88-3.88a1 1 0 111.41 1.42l-4.59 4.58a1 1 0 01-1.41 0L6.7 10.71a1 1 0 011.42-1.42z" fill="currentColor"/>
                      </svg>
                    </button>
                  </div>
                  {expanded[group.id] && (
                    <div className="group-tasks">
                      {group.tasks.map(task => (
                        <Task 
                          key={task.id} 
                          task={task} 
                          onResult={handleTaskResult}
                          onAttempt={handleAttempt}
                          maxAttempts={2}
                          attemptsCount={attemptsByTask[task.id] || 0}
                          showFeedback={true}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="training-footer">
              <button onClick={finishTraining} className="finish-training-btn">
                Закончить тренаж
              </button>
            </div>
          </div>
        )}
      </div>
      
      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)} 
          onLogin={() => window.location.href = '/admin'}
        />
      )}
      
      {showRating && (
        <Rating onClose={() => setShowRating(false)} />
      )}
    </div>
  );
}

export default HomePage;