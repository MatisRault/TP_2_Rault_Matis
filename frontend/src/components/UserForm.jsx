import { useState } from 'react';
import './UserForm.css';

const UserForm = ({ onSubmit }) => {
  const [form, setForm]   = useState({ name: '', email: '', role: 'user' });
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email) {
      setError('Les champs nom et email sont requis');
      return;
    }
    setError('');
    await onSubmit(form);
    setForm({ name: '', email: '', role: 'user' });
  };

  return (
    <div className="user-form">
      <h2 className="user-form__title">Ajouter un utilisateur</h2>
      {error && <div className="user-form__error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nom complet" value={form.name} onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="user">Utilisateur</option>
          <option value="admin">Administrateur</option>
        </select>
        <button type="submit" className="user-form__submit">Ajouter</button>
      </form>
    </div>
  );
};

export default UserForm;
