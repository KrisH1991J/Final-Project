import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import InputGroup from "react-bootstrap/InputGroup";

export const Single = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	const myStyles = {
		backgroundColor: "white"
	};

	const h1Header = {
		fontSize: "40px",
		fontWeight: "bold"
	};

	const h1Style = {
		textAlign: "center",
		fontSize: "36px",
		marginTop: "15px"
	};

	const textStyles = {
		color: "red",
		textAlign: "center",
		marginBottom: "30px",
		fontSize: "20px"
	};

	const myImageStyles = {
		height: "30rem",
		width: "40rem",
		marginTop: "15px",
		marginRight: "20px"
	};

	const buttonStyles = {
		width: "60px"
	};

	const navStyles = {
		marginLeft: "175px"
	};

	const searchStyles = {
		marginLeft: "175px"
	};

	return (
		<div>
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
						<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
						<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item href="/">Logout</NavDropdown.Item>
					</NavDropdown>
				</Nav>
			</Navbar>
			{/* <div className="card mb-3" style={{ maxWidth: "1150px" }}>
				<div className="row g-0">
					<div className="col-md-8">
						<img
							src="https://static.highsnobiety.com/thumbor/fIuRY1m-OfEfs7LvmjQzgYHHAX0=/1600x1067/static.highsnobiety.com/wp-content/uploads/2021/02/12163548/air-jordan-1-university-blue-release-info-02.jpg"
							style={{ height: "500px" }}
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
		</div> */}
			<div className="container" style={myStyles} type="products">
				<div className="jumbotron">
					<h1 className="display-4">
						<div className="d-flex">
							<img
								className="card-img-top"
								style={myImageStyles}
								src={store.products[params.id].product_image}
								alt="..."
							/>
							<span style={h1Style}>
								<span style={h1Header}>{store.products[params.id].product_name}</span> <br />
								{store.products[params.id].product_description}
							</span>
						</div>
					</h1>
					<hr className="my-4" style={textStyles} />
					<div className="container d-flex justify-content-between" style={textStyles}>
						<span>
							Product Name <br />
							{store.products[params.id].product_name}
						</span>
						<span>
							Product Cost <br />
							{store.products[params.id].product_cost}
						</span>
						<span>
							Product UPC <br />
							{store.products[params.id].product_upc}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

Single.propTypes = {
	match: PropTypes.object,
	product_name: PropTypes.string,
	product_cost: PropTypes.string,
	product_image: PropTypes.string,
	product_upc: PropTypes.string,
	id: PropTypes.number
};
