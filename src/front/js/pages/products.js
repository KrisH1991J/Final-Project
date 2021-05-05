import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import FormControl from "react-bootstrap/FormControl";
import getState from "../store/flux";

export const Products = props => {
	const { store, actions } = useContext(Context);

	const navStyles = {
		marginLeft: "175px"
	};

	const searchStyles = {
		marginLeft: "175px"
	};

	const imgStyles = {
		width: "327px",
		height: "375px"
	};

	const cardStyles = {
		width: "350px",
		height: "500px",
		padding: "10px",
		marginTop: "30px"
	};

	return (
		<>
			<Navbar bg="dark" variant="dark">
				<Navbar.Brand>MarketPulse</Navbar.Brand>
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
						<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
						<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item href="/">Logout</NavDropdown.Item>
					</NavDropdown>
				</Nav>
			</Navbar>
			<div className="d-flex flex-row">
				<Row>
					{store.products.map((props, i) => {
						return (
							<Col className="col-4" key={i}>
								<div className="card" style={cardStyles}>
									<img src={props.product_image} className="card-img-top" style={imgStyles} />
									<div className="card-body">
										<h5 className="card-title">{props.product_name}</h5>
										<Link to={`/single/${props.id}`}>
											<Button variant="danger">Go somewhere</Button>
										</Link>
									</div>
								</div>
							</Col>
						);
					})}
				</Row>
			</div>
		</>
	);
};

Products.propTypes = {
	product_name: PropTypes.string,
	product_cost: PropTypes.string,
	product_image: PropTypes.string,
	product_upc: PropTypes.string,
	id: PropTypes.number
};
