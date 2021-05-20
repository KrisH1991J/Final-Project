import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Button from "react-bootstrap/Button";
import "../../styles/home.scss";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import LOGOGIF2 from "../../img/LOGOGIF2 (1).gif";
export const Home = props => {
	const { store, actions } = useContext(Context);
	let history = useHistory();

	return (
		<>
			<div className="row mb-5">
				<div className="col" />
			</div>
			<div className="row">
				<div className="col-md mb-5">
					<img
						src={LOGOGIF2}
						style={{
							width: "500px",
							height: "300px"
						}}
					/>
					<h4>Easily manage and grow a thriving e-commerce business with just one platform.</h4>
				</div>
				<div className="formlogin">
					<Tabs defaultActiveKey="login" id="log_reg_screen">
						<Tab eventKey="login" title="Login">
							<Form onSubmit={event => actions.loginUser(event, history)}>
								<Form.Group controlId="formBasicEmail">
									<Form.Label>Email address</Form.Label>
									<Form.Control name="email" type="email" placeholder="Enter email" />
								</Form.Group>
								<Form.Group controlId="formBasicPassword">
									<Form.Label>Password</Form.Label>
									<Form.Control name="password" type="password" placeholder="Password" />
								</Form.Group>
								<Button variant="danger" type="submit">
									Login
								</Button>
							</Form>
						</Tab>
						<Tab eventKey="signup" title="Sign Up">
							<Form onSubmit={event => actions.signupUser(event, history)}>
								<Form.Row>
									<Form.Group as={Col} controlId="formGridEmail">
										<Form.Label>Email</Form.Label>
										<Form.Control type="email" placeholder="Enter email" name="email" />
									</Form.Group>
									<Form.Group as={Col} controlId="formGridPassword">
										<Form.Label>Password</Form.Label>
										<Form.Control type="password" placeholder="Password" name="password" />
									</Form.Group>
								</Form.Row>
								<Form.Group controlId="formUsername">
									<Form.Label>Username</Form.Label>
									<Form.Control placeholder="User123" name="username" />
								</Form.Group>
								<Form.Group controlId="formFirstName">
									<Form.Label>First Name</Form.Label>
									<Form.Control placeholder="Your name" name="first_name" />
								</Form.Group>
								<Form.Group controlId="formLastName">
									<Form.Label>Last Name</Form.Label>
									<Form.Control placeholder="Last Name" name="last_name" />
								</Form.Group>
								<Button variant="danger" type="submit">
									Submit
								</Button>
							</Form>
						</Tab>
					</Tabs>
				</div>
			</div>
		</>
	);
};

Home.propTypes = {
	history: PropTypes.object
};
