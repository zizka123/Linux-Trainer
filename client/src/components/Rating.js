import React, { useState, useEffect } from 'react';

function Rating({ onClose }) {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/training-results/ratings');
      if (!response.ok) {
        throw new Error('Failed to fetch ratings');
      }
      const data = await response.json();
      setRatings(data);
    } catch (error) {
      console.error('Error fetching ratings:', error);
      setError('Не удалось загрузить рейтинг');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal rating-modal">
        <div className="modal-header">
          <h2>Рейтинг прохождения тренажа</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        
        <div className="rating-content">
          {loading ? (
            <p>Загрузка рейтинга...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : ratings.length === 0 ? (
            <p>Пока нет результатов тренировок</p>
          ) : (
            <div className="rating-table-container">
              <table className="rating-table">
                <thead>
                  <tr>
                    <th>Место</th>
                    <th>Сотрудник</th>
                    <th>Отдел</th>
                    <th>Прохождений</th>
                    <th>Правильных ответов</th>
                    <th>Неправильных ответов</th>
                    <th>Процент успеха</th>
                  </tr>
                </thead>
                <tbody>
                  {ratings.map((rating, index) => (
                    <tr key={`${rating.lastName}-${rating.firstName}`} className={index < 3 ? `top-${index + 1}` : ''}>
                      <td className="rank">{index + 1}</td>
                      <td className="employee-name">{rating.lastName} {rating.firstName}</td>
                      <td className="department">{rating.department || 'Не указан'}</td>
                      <td className="sessions">{rating.totalSessions}</td>
                      <td className="correct">{rating.totalCorrect}</td>
                      <td className="incorrect">{rating.totalIncorrect}</td>
                      <td className="success-rate">
                        {rating.totalAnswers > 0 
                          ? `${Math.round((rating.totalCorrect / rating.totalAnswers) * 100)}%`
                          : '0%'
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Rating;
