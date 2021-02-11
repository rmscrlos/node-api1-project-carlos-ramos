import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Form from './components/Form';
import UserList from './components/UserList';
import axios from 'axios';

const AppContainer = styled.div`
	width: 90%;
	height: 90vh;
	margin: 1rem auto;
	padding: 1rem;
	display: flex;
`;

const LeftSide = styled.div`
	background: rgba(255, 255, 255, 0.7);
	box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
	backdrop-filter: blur(4px);
	-webkit-backdrop-filter: blur(4px);
	border-radius: 10px;
	border: none;
	height: 40%;
	width: 27%;
	margin: 1rem;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Line = styled.div`
	background: rgba(255, 255, 255, 0.4);
	width: 0.5px;
	height: 95%;
	margin: auto 1rem;
`;

const RightSide = styled.div`
	height: 100%;
	width: 63%;
	padding: 0 1rem;
`;

function App() {
	const [users, setUsers] = useState([]);

	const fetchUsers = () => {
		axios
			.get('https://first-node-app-project.herokuapp.com/api/users')
			.then(res => {
				setUsers(res.data);
			})
			.catch(err => console.log(err));
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	console.log(users);
	return (
		<AppContainer>
			<LeftSide>
				<Form fetchUsers={fetchUsers} />
			</LeftSide>
			<Line />
			<RightSide>
				<UserList users={users} fetchUsers={fetchUsers} />
			</RightSide>
		</AppContainer>
	);
}

export default App;
