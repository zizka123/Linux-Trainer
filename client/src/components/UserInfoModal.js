import React, { useEffect, useMemo, useState } from 'react';

function UserInfoModal({ onClose, onSubmit }) {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [department, setDepartment] = useState('');
  const [postLinkId, setPostLinkId] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/employees');
        const data = await res.json();
        setAllEmployees(Array.isArray(data) ? data : []);
      } catch (e) {
        setError('Не удалось загрузить сотрудников');
      } finally {
        setLoading(false);
      }
    };
    loadEmployees();
  }, []);

  useEffect(() => {
    if (!lastName) {
      setSuggestions([]);
      setDepartment('');
      setPostLinkId('');
      return;
    }
    const ln = lastName.toLowerCase();
    const filtered = allEmployees.filter(emp => String(emp.lastName || '').toLowerCase().startsWith(ln));
    setSuggestions(filtered.slice(0, 5));
    if (filtered.length === 1) {
      const emp = filtered[0];
      setDepartment(emp.department || '');
      setPostLinkId(emp.postLinkId || '');
    }
  }, [lastName, allEmployees]);

  const isValid = lastName.trim() !== '' && firstName.trim() !== '';

  const handlePick = (emp) => {
    setLastName(emp.lastName || '');
    setFirstName(emp.firstName || '');
    setDepartment(emp.department || '');
    setPostLinkId(emp.postLinkId || '');
    setSuggestions([]);
  };

  const submit = () => {
    if (!isValid) return;
    onSubmit({ lastName, firstName, department, postLinkId, isGuest: false });
  };

  const submitAsGuest = () => {
    onSubmit({ 
      lastName: 'Гость', 
      firstName: '', 
      department: 'Гостевой доступ', 
      postLinkId: `guest_${Date.now()}`,
      isGuest: true 
    });
  };

  return (
    <div className="auth-modal">
      <div className="auth-modal-content" style={{ maxWidth: 520 }}>
        <h2>Информация о пользователе</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label>Фамилия (обязательно)</label>
          <div className="employee-input-container">
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Иванов" />
            {suggestions.length > 0 && (
              <div className="employee-suggestions-dropdown">
                <div className="suggestions-header">
                  <span className="suggestions-count">Найдено: {suggestions.length}</span>
                </div>
                {suggestions.map(s => (
                  <div key={`${s.lastName}-${s.firstName}-${s.postLinkId}`} className="employee-suggestion-item" onClick={() => handlePick(s)}>
                    <div className="employee-name">
                      <strong>{s.lastName} {s.firstName}</strong>
                    </div>
                    <div className="employee-details">
                      <span className="employee-department">{s.department || 'Не указан'}</span>
                      <span className="employee-id">ID: {s.postLinkId}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="form-group">
          <label>Имя (обязательно)</label>
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Иван" />
        </div>
        <div className="form-group">
          <label>Отдел</label>
          <input value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="УКОИ" disabled />
        </div>
        <div className="form-group">
          <label>ID PostLink</label>
          <input value={postLinkId} onChange={(e) => setPostLinkId(e.target.value)} placeholder="12345" disabled />
        </div>
        <div className="form-actions">
          <button className="auth-btn" onClick={submit} disabled={!isValid}>Продолжить</button>
          <button className="auth-guest-btn" onClick={submitAsGuest}>
            👤 Войти как гость
          </button>
          <button className="auth-cancel-btn" onClick={onClose}>Отмена</button>
        </div>
      </div>
    </div>
  );
}

export default UserInfoModal;


