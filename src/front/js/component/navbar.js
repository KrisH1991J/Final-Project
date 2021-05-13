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
						<Nav.Link href="/makeProduct" style={navStyles}>
							Add Product
						</Nav.Link>
						<Nav.Link href="/products">View All Products</Nav.Link>
						<NavDropdown title="Profile" id="collasible-nav-dropdown">
							<NavDropdown.Item href="/profile">Home</NavDropdown.Item>
							<NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="/" onClick={() => actions.logoutUser()}>
								Logout
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar>
			)}
		</>
	);
};
