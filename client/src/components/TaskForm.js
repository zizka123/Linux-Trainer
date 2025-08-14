import React, { useState, useEffect, useRef } from 'react';

function TaskForm({ onSubmit, initialData, onCancel, groups = [], notify }) {
  const hintRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    command: '',
    hint: '',
    group: '',
    newGroup: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        command: initialData.command,
        hint: initialData.hint,
        group: initialData.group || '',
        newGroup: ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        command: '',
        hint: '',
        group: '',
        newGroup: ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalGroup = formData.group === '__new__' ? formData.newGroup.trim() : formData.group;
    if (!finalGroup) {
      // простая валидация группы
      setFormData(prev => ({ ...prev }));
      return;
    }
    const success = await onSubmit({
      ...formData,
      group: finalGroup,
      id: initialData?.id
    });
    if (success && !initialData) {
      setFormData({
        title: '',
        description: '',
        command: '',
        hint: '',
        group: '',
        newGroup: ''
      });
    }
  };

  

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label>Название задачи:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Описание:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          required
        />
      </div>
      <div className="form-group">
        <label>Команда:</label>
        <input
          type="text"
          name="command"
          value={formData.command}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Группа:</label>
        <select name="group" value={formData.group} onChange={handleChange} required>
          <option value="">Выберите группу</option>
          <option value="__new__">Создать новую группу…</option>
          {groups.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>
      {formData.group === '__new__' && (
        <div className="form-group">
          <label>Новая группа:</label>
          <input
            type="text"
            name="newGroup"
            value={formData.newGroup}
            onChange={handleChange}
            placeholder="Введите название новой группы"
            required
          />
        </div>
      )}
      <div className="form-group">
        <label>Подсказка (разрешена разметка HTML):</label>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            type="button"
            className="hint-btn"
            onClick={() => {
              const textarea = hintRef.current;
              if (!textarea || textarea.selectionStart === undefined) return;
              const start = textarea.selectionStart;
              const end = textarea.selectionEnd;
              if (start === end) {
                if (typeof notify === 'function') {
                  notify('Выделите текст', 'warn');
                }
                return;
              }
              const value = textarea.value;
              const selected = value.substring(start, end);
              const wrapped = `<span class='code'>${selected}</span>`;
              const newValue = value.slice(0, start) + wrapped + value.slice(end);
              const event = { target: { name: 'hint', value: newValue } };
              handleChange(event);
              setTimeout(() => {
                textarea.focus();
                textarea.selectionStart = start;
                textarea.selectionEnd = start + wrapped.length;
              }, 0);
            }}
          >
            Выделить как <span className="code-inline-label"><span class='code'>код</span></span>
          </button>
        </div>
        <textarea
          name="hint"
          value={formData.hint}
          onChange={handleChange}
          rows="5"
          required
          ref={hintRef}
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="save-btn">
          {initialData ? 'Обновить задачу' : 'Сохранить задачу'}
        </button>
        {onCancel && (
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Отмена
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;