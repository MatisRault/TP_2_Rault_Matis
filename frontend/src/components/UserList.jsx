import './UserList.css';
import UserCard from './UserCard';

const UserList = ({ users, loading, error, onDelete }) => {
  if (loading) return <div className="user-list__loading">Chargement...</div>;
  if (error)   return <div className="user-list__error">⚠️ {error}</div>;
  if (users.length === 0) return <div className="user-list__empty">Aucun utilisateur</div>;

  return (
    <div className="user-list">
      {users.map(u => <UserCard key={u._id} user={u} onDelete={onDelete} />)}
    </div>
  );
};

export default UserList;
