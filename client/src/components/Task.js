import React, { useState, useMemo } from 'react';

function Task({ task, onResult, onAttempt, maxAttempts = 2, attemptsCount = 0, showFeedback = false }) {
  const [showHint, setShowHint] = useState(false);
  const [userCommand, setUserCommand] = useState('');
  const [feedback, setFeedback] = useState({ 
    message: '', 
    isSuccess: false, 
    show: false 
  });
  const [hasAnswered, setHasAnswered] = useState(false);

  const isOutOfAttempts = useMemo(() => attemptsCount >= maxAttempts, [attemptsCount, maxAttempts]);

  const checkCommand = (e) => {
    e.preventDefault();
    if (!userCommand.trim()) {
      displayFeedback('Введите команду для проверки', false);
      return;
    }

    const isCorrect = compareCommands(userCommand, task.command);
    if (onAttempt) {
      onAttempt(task.id, isCorrect);
    }
    
    // Сохраняем результат если передан callback
    if (onResult) {
      onResult(task.id, isCorrect);
    }
    
    const nextAttempts = attemptsCount + 1;
    const shouldLock = isCorrect || nextAttempts >= maxAttempts;
    if (shouldLock) {
      setHasAnswered(true);
    }
    
    if (showFeedback) {
      displayFeedback(
        isCorrect ? '✅ Правильно! Отличная работа!' : '❌ Неверно. Попробуйте еще раз.',
        isCorrect
      );
    } else {
      displayFeedback(
        isCorrect ? '✅ Правильно!' : `❌ Неверно. Правильная команда: ${task.command}`,
        isCorrect
      );
    }
  };

  const compareCommands = (userCmd, correctCmd) => {
    const normalize = cmd => cmd.toLowerCase().replace(/\s+/g, ' ').trim();
    return normalize(userCmd) === normalize(correctCmd);
  };

  const displayFeedback = (message, isSuccess) => {
    setFeedback({ message, isSuccess, show: true });
    setTimeout(() => {
      setFeedback(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  return (
    <div className={`task ${(hasAnswered || isOutOfAttempts) ? 'answered' : ''}`}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <form onSubmit={checkCommand} className="input-group">
        <input
          type="text"
          className="command-input"
          value={userCommand}
          onChange={(e) => setUserCommand(e.target.value)}
          placeholder="Введите команду..."
          spellCheck="false"
          disabled={hasAnswered || isOutOfAttempts}
        />
        <button 
          type={(hasAnswered || isOutOfAttempts) ? "button" : "submit"}
          className="check-btn"
          disabled={hasAnswered || isOutOfAttempts}
          onClick={(hasAnswered || isOutOfAttempts) ? undefined : undefined}
        >
          {(hasAnswered || isOutOfAttempts) ? 'Отвечено' : 'Проверить'}
        </button>
        <button 
          type="button"
          className="hint-btn" 
          onClick={() => setShowHint(!showHint)}
        >
          Подсказка
        </button>
      </form>
      <div className="attempts-note-inline">Попытки: {attemptsCount} / {maxAttempts}</div>
      {feedback.show && (
        <div className={`feedback ${feedback.isSuccess ? 'correct' : 'incorrect'}`}>
          {feedback.message}
        </div>
      )}
      <div 
        className="hint" 
        style={{ display: showHint ? 'block' : 'none' }}
        dangerouslySetInnerHTML={{ __html: task.hint }}
      />
    </div>
  );
}

export default Task;