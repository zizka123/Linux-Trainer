import React from 'react';

function ConfirmModal({ title, message, confirmText = 'Да', cancelText = 'Нет', onConfirm, onCancel }) {
  return (
    <div className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
      <div className="auth-modal-content">
        {title && <h2 id="confirm-title">{title}</h2>}
        {message && <p style={{ marginTop: 0 }}>{message}</p>}
        <div className="form-actions">
          <button type="button" className="delete-btn" onClick={onConfirm}>{confirmText}</button>
          <button type="button" className="cancel-btn" onClick={onCancel}>{cancelText}</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
