import React from 'react';
import UserCard from './UserCard.jsx';

function UserList({ users, fetchUsers }) {
	return (
		<div style={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
			{users.map(user => {
				return <UserCard key={user.id} user={user} fetchUsers={fetchUsers} />;
			})}
		</div>
	);
}

export default UserList;
