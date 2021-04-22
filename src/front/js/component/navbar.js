import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";

export const Navigation = () => {
	return (
		<>
			<Navbar bg="light" variant="light">
				<Navbar.Brand href="#home">Navbar</Navbar.Brand>
				<Nav className="mr-auto">
					<Nav.Link href="#">
						<Link to="/profile"> Profile </Link>
					</Nav.Link>
					<Nav.Link href="#">
						<Link to="/products"> Products </Link>
					</Nav.Link>

					{/* <Nav.Link href="/products">Products</Nav.Link> */}
				</Nav>
				<Form inline>
					<FormControl type="text" placeholder="Search" className="mr-sm-2" />
					<Button variant="outline-primary">Search</Button>
				</Form>
			</Navbar>
		</>
	);
};
