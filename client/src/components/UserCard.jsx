import React, { useState } from 'react';
import { Typography, CardContent, TextField, Button } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/Edit';
import styled from 'styled-components';
import axios from 'axios';

const Card = styled.div`
	background: rgba(255, 255, 255, 0.3);
	box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
	backdrop-filter: blur(4px);
	-webkit-backdrop-filter: blur(4px);
	border-radius: 10px;
	width: 27%;
	margin: 1rem;
`;

const Top = styled.div`
	display: flex;
	justify-content: space-between;
`;

const RightInTop = styled.div`
	display: flex;
	justify-content: space-between;
`;

const UserCard = ({ user, fetchUsers }) => {
	const [update, setUpdate] = useState(false);
	const [updatedUser, setUpdatedUser] = useState({
		name: '',
		bio: ''
	});

	const deleteUser = id => {
		axios
			.delete(`https://first-node-app-project.herokuapp.com/api/users/${id}`)
			.then(res => fetchUsers())
			.catch(err => console.log(err));
	};

	const updateUser = id => {
		axios
			.put(`https://first-node-app-project.herokuapp.com/api/users/${id}`, updatedUser)
			.then(res => {
				fetchUsers();
				setUpdate(false);
			})
			.catch(err => console.log(err));
	};

	const handleChange = e => {
		setUpdatedUser({
			...updatedUser,
			[e.target.name]: e.target.value
		});
	};

	console.log(update);

	return (
		<Card>
			<CardContent>
				<Top>
					<Typography color="textSecondary" gutterBottom>
						User
					</Typography>
					<RightInTop>
						<EditIcon style={{ width: '17px', cursor: 'pointer' }} onClick={() => setUpdate(true)} />
						<DeleteOutlinedIcon
							style={{ width: '17px', cursor: 'pointer', marginLeft: '7px' }}
							onClick={() => deleteUser(user.id)}
						/>
					</RightInTop>
				</Top>
				{update ? (
					<TextField
						id="name"
						label="Name"
						name="name"
						margin="dense"
						aria-describedby="my-helper-text"
						variant="outlined"
						value={updatedUser.name}
						onChange={handleChange}
						required
					/>
				) : (
					<Typography variant="h5" component="h2">
						{user.name}
					</Typography>
				)}
				{update ? (
					<TextField
						id="bio"
						label="Bio"
						name="bio"
						margin="dense"
						aria-describedby="my-helper-text"
						variant="outlined"
						value={updatedUser.bio}
						onChange={handleChange}
						required
					/>
				) : (
					<Typography variant="body2" component="p">
						{user.bio}
					</Typography>
				)}
				{update ? (
					<Button
						style={{
							backgroundColor: '#21D4FD',
							backgroundImage: 'linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)'
						}}
						variant="contained"
						color="primary"
						type="submit"
						disabled={!updatedUser}
						onClick={() => updateUser(user.id)}
					>
						update
					</Button>
				) : null}
			</CardContent>
		</Card>
	);
};

export default UserCard;
