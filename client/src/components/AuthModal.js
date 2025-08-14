import React, { useState } from 'react';

function AuthModal({ onClose, onLogin }) {
  const [credentials, setCredentials] = useState({
    login: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.login === 'admin' && credentials.password === 'linux123') {
      localStorage.setItem('adminAuthenticated', 'true');
      onLogin();
    } else {
      alert('Неверные учетные данные!');
    }
  };

  return (
    <div className="auth-modal">
      <div className="auth-modal-content">
        <h2>Авторизация администратора</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Логин:</label>
            <input
              type="text"
              name="login"
              value={credentials.login}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Пароль:</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="auth-btn">Войти</button>
            <button type="button" className="auth-cancel-btn" onClick={onClose}>
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AuthModal;