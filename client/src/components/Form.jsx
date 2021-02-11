import React, { useState } from 'react';
import { FormControl, TextField, Button, Typography } from '@material-ui/core';
import axios from 'axios';

function Form({ fetchUsers }) {
	const [formValues, setFormValues] = useState({
		name: '',
		bio: ''
	});

	const handleChange = e => {
		setFormValues({
			...formValues,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = e => {
		e.preventDefault();

		axios
			.post('https://first-node-app-project.herokuapp.com/api/users', formValues)
			.then(res => fetchUsers())
			.catch(err => console.log(err));

		setFormValues({
			name: '',
			bio: ''
		});
	};

	return (
		<div>
			<Typography align="center" variant="h5" style={{ color: '#313131', textTransform: 'lowercase' }}>
				Add user
			</Typography>
			<form onSubmit={handleSubmit}>
				<FormControl>
					<TextField
						id="name"
						label="Name"
						name="name"
						margin="dense"
						value={formValues.name}
						onChange={handleChange}
						aria-describedby="my-helper-text"
						required
						variant="outlined"
					/>
					<TextField
						id="bio"
						label="Bio"
						name="bio"
						margin="dense"
						value={formValues.bio}
						onChange={handleChange}
						aria-describedby="my-helper-text"
						required
						variant="outlined"
					/>
					<Button
						style={{
							backgroundColor: '#21D4FD',
							backgroundImage: 'linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)'
						}}
						variant="contained"
						color="primary"
						type="submit"
						disabled={!formValues}
					>
						Add
					</Button>
				</FormControl>
			</form>
		</div>
	);
}

export default Form;
