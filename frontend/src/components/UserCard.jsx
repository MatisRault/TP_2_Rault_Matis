import './UserCard.css';

const UserCard = ({ user, onDelete }) => (
  <div className="user-card">
    <div className="user-card__header">
      <div>
        <p className="user-card__name">{user.name}</p>
        <p className="user-card__email">{user.email}</p>
      </div>
      <span className={`user-card__role user-card__role--${user.role}`}>
        {user.role}
      </span>
    </div>
    <div className="user-card__footer">
      <span className="user-card__date">
        {new Date(user.createdAt).toLocaleDateString('fr-FR')}
      </span>
      <button className="user-card__delete" onClick={() => onDelete(user._id)}>
        Supprimer
      </button>
    </div>
  </div>
);

export default UserCard;
