import { useState, useEffect } from 'react';
import './App.css';
import userService from './services/userService';
import Navbar from './components/Navbar';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

function App() {
  const [users, setUsers]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    userService.getAll()
      .then(res => setUsers(res.data.data))
      .catch(() => setError('Impossible de contacter le serveur'))
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = async (data) => {
    try {
      const res = await userService.create(data);
      setUsers([...users, res.data.data]);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la création');
    }
  };

  const handleDelete = async (id) => {
    try {
      await userService.remove(id);
      setUsers(users.filter(u => u._id !== id));
    } catch {
      setError('Erreur lors de la suppression');
    }
  };

  return (
    <div className="app">
      <Navbar count={users.length} />
      <div className="app-content">
        <div className="app-sidebar">
          <UserForm onSubmit={handleCreate} />
        </div>
        <div className="app-main">
          <UserList users={users} loading={loading} error={error} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}

export default App;
