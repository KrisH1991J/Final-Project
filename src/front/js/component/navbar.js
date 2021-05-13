import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import FormControl from "react-bootstrap/FormControl";

import { Context } from "../store/appContext";

export const Navigation = () => {
	const { store, actions } = useContext(Context);
	const navStyles = {
		marginLeft: "175px"
	};

	const linkColor = {
		color: "yellow"
	};

	const linkColor1 = {
		color: "red"
	};

	const searchStyles = {
		marginLeft: "175px"
	};

	return (
		<>
			{store.isLoggedIn && (
				<Navbar bg="dark" variant="dark">
					<Navbar.Brand href="#home">MarketPulse</Navbar.Brand>
					<Nav className="mr-auto" />
					<Form inline style={searchStyles}>
						<FormControl type="text" placeholder="Find Products" className="mr-sm-2" />
						<Button variant="outline-danger">Search</Button>
					</Form>
					<Nav className="mr-auto">
						<Nav.Link style={navStyles}>
							<Link to="/makeProduct" style={linkColor}>
								Add Product
							</Link>
						</Nav.Link>
						<Nav.Link>
							<Link to="/products" style={linkColor}>
								View All Products
							</Link>
						</Nav.Link>
						<NavDropdown title="Profile" id="collasible-nav-dropdown" style={linkColor}>
							<NavDropdown.Item>
								<Link to="/profile" style={linkColor1}>
									Home
								</Link>
							</NavDropdown.Item>
							<NavDropdown.Item>
								<Link to="/settings" style={linkColor1}>
									Settings
								</Link>
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="/" style={linkColor1} onClick={() => actions.logoutUser()}>
								Logout
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar>
			)}
		</>
	);
};
