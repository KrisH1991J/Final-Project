import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

export const MakeProduct = props => {
	const { store, actions } = useContext(Context);
	let history = useHistory();

	const navStyles = {
		marginLeft: "175px"
	};

	const searchStyles = {
		marginLeft: "175px"
	};

	const formStyles = {
		width: "410px",
		height: "500px",
		position: "absolute",
		top: "34.75%",
		left: "68.25%",
		transform: "translate(-50%, -50%)",
		padding: "10px",
		backgroundColor: "#343a40",
		color: "white"
	};

	return (
		<div>
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
			<div className="card mb-3" style={{ maxWidth: "700px", marginTop: "30px" }}>
				<div className="row g-0">
					<div className="col-md-8">
						<img
							src="https://i.pinimg.com/236x/6d/a1/8f/6da18fc64d9b833a7b035218a0aea31b--red-shoes-high-tops.jpg"
							style={{ height: "500px", width: "500px" }}
						/>
					</div>

					<div className="col-md-4">
						<div className="card-body">
							<h5 className="card-title"> Product Name </h5>
							<h5 className="text-muted"> 19990490 </h5>
							<div className="row g-0">
								<div className="col-md-8">
									<InputGroup className="mb-3">
										<InputGroup.Prepend>
											<InputGroup.Text>Cost</InputGroup.Text> <InputGroup.Text>$</InputGroup.Text>
										</InputGroup.Prepend>
										<FormControl aria-label="Amount (to the nearest dollar)" />
									</InputGroup>
								</div>
							</div>
							<p className="card-text">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut dignissim nunc, id
								ultricies erat. Sed cursus eros a diam dapibus gravida. Nunc ac fermentum ex, sed porta
								risus.
							</p>
							<p className="card-text">
								<small className="text-muted">Last updated 3 mins ago</small>
							</p>
						</div>
					</div>
				</div>
			</div>
			<Form style={formStyles} onSubmit={event => actions.makeProduct(event, history)}>
				<Form.Group controlId="formProductName">
					<Form.Label>Product Name</Form.Label>
					<Form.Control placeholder="Enter Product Name" name="product_name" />
				</Form.Group>
				<Form.Group controlId="formProductCost">
					<Form.Label>Product Cost</Form.Label>
					<Form.Control placeholder="Enter Product Cost" name="product_cost" />
				</Form.Group>
				<Form.Group controlId="formProductImage">
					<Form.Label>Product Image</Form.Label>
					<Form.Control placeholder="Enter Image URL" name="product_image" />
				</Form.Group>
				<Form.Group controlId="formProductUpc">
					<Form.Label>Product UPC</Form.Label>
					<Form.Control placeholder="Enter Product UPC" name="product_upc" />
				</Form.Group>
				<Form.Group controlId="formProductDescription">
					<Form.Label>Product Description</Form.Label>
					<Form.Control placeholder="Enter Description" name="product_description" />
				</Form.Group>
				<Button variant="danger" type="submit">
					Submit
				</Button>
			</Form>
		</div>
	);
};

MakeProduct.propTypes = {
	history: PropTypes.object
};
