import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import Button from "react-bootstrap/Button";
import "../../styles/home.scss";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
			<div className="row mb-5">
				<div className="col">
					<h1 className="text-center">GURUPIA</h1>
				</div>
			</div>
			<div className="row">
				<div className="col">
					<h2>Everything You Need to Sell on Amazon and More</h2>
					<h4>Easily manage and grow a thriving e-commerce business with just one platform.</h4>
				</div>
				<div className="col">
					<Tabs defaultActiveKey="login" id="log_reg_screen">
						<Tab eventKey="login" title="Login">
							<Form onSubmit={actions.loginUser}>
								<Form.Group controlId="formBasicEmail">
									<Form.Label>Email address</Form.Label>
									<Form.Control name="email" type="email" placeholder="Enter email" />
								</Form.Group>

								<Form.Group controlId="formBasicPassword">
									<Form.Label>Password</Form.Label>
									<Form.Control name="password" type="password" placeholder="Password" />
								</Form.Group>

								<Button variant="primary" type="submit">
									Submit
								</Button>
							</Form>
						</Tab>
						<Tab eventKey="signup" title="Sign Up">
							<Form onSubmit={actions.signupUser}>
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
									<Form.Control placeholder="Your name" name="firstname" />
								</Form.Group>

								<Form.Group controlId="formLastName">
									<Form.Label>Last Name</Form.Label>
									<Form.Control placeholder="Last Name" name="lastname" />
								</Form.Group>

								<Button variant="primary" type="submit">
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
