import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import FormControl from "react-bootstrap/FormControl";
import { Context } from "../store/appContext";
import LOGO1 from "../../img/LOGO1.png";
export const Navigation = () => {
	const { store, actions } = useContext(Context);
	const navStyles = {
		marginLeft: "1200px"
	};

	const linkColor = {
		color: "orange",
		fontSize: "24px"
	};

	const linkColor1 = {
		color: "orange"
	};

	return (
		<>
			{store.isLoggedIn && (
				<Navbar
					style={{
						borderBottom: "0.50px solid black",
						position: "fixed",
						zIndex: "100",
						background: "white",
						width: "100%"
					}}>
					<Navbar.Brand href="#home">
						<img
							src={LOGO1}
							style={{
								width: "120px",
								height: "120px"
							}}
						/>{" "}
					</Navbar.Brand>
					<Nav className="mr-auto" />
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
							<NavDropdown.Divider />
							<NavDropdown.Item href="/" style={linkColor1} onClick={() => actions.logoutUser()}>
								{store.isLoggedIn ? "Logout" : "login"}
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar>
			)}
		</>
	);
};
