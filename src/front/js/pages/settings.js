import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";

export const Settings = () => {
	const formStyles = {
		width: "400px",
		height: "315px",
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		padding: "10px",
		backgroundColor: "#343a40",
		color: "white"
	};

	return (
		<div>
			<Form style={formStyles}>
				<Form.Group controlId="formChangeUsername">
					<Form.Label>Change Username</Form.Label>
					<Form.Control placeholder="New Username" name="username" />
				</Form.Group>
				<Form.Group controlId="formChangeEmail">
					<Form.Label>Change Email</Form.Label>
					<Form.Control placeholder="New Email" name="email" />
				</Form.Group>
				<Form.Group controlId="formChangePassword">
					<Form.Label>Change Password</Form.Label>
					<Form.Control placeholder="New Password" name="password" />
				</Form.Group>
				<Button variant="danger" type="submit">
					Submit
				</Button>
			</Form>
		</div>
	);
};
