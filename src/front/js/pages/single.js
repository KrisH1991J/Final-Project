// import React, { useState, useEffect, useContext } from "react";
// import PropTypes from "prop-types";
// import { Link, useParams } from "react-router-dom";
// import { Context } from "../store/appContext";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import FormControl from "react-bootstrap/FormControl";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import Nav from "react-bootstrap/Nav";
// import InputGroup from "react-bootstrap/InputGroup";

// export const Single = props => {
// 	const { store, actions } = useContext(Context);
// 	const [cost, setCost] = useState();
// 	const [totalProfit, setTotalProfit] = useState(0);
// 	const params = useParams();

// 	const myStyles = {
// 		backgroundColor: "white"
// 	};

// 	const h1Header = {
// 		fontSize: "40px",
// 		fontWeight: "bold"
// 	};

// 	const h1Style = {
// 		textAlign: "center",
// 		fontSize: "36px",
// 		marginTop: "15px"
// 	};

// 	const textStyles = {
// 		color: "red",
// 		textAlign: "center",
// 		marginBottom: "30px",
// 		fontSize: "20px"
// 	};

// 	const myImageStyles = {
// 		height: "30rem",
// 		width: "40rem",
// 		marginTop: "15px",
// 		marginRight: "20px"
// 	};

// 	const buttonStyles = {
// 		width: "60px"
// 	};

// 	const navStyles = {
// 		marginLeft: "175px"
// 	};

// 	const searchStyles = {
// 		marginLeft: "175px"
// 	};

// 	return (
// 		<div>
// 			<Navbar bg="dark" variant="dark">
// 				<Navbar.Brand href="#home">MarketPulse</Navbar.Brand>
// 				<Nav className="mr-auto" />
// 				<Form inline style={searchStyles}>
// 					<FormControl type="text" placeholder="Find Products" className="mr-sm-2" />
// 					<Button variant="outline-danger">Search</Button>
// 				</Form>
// 				<Nav className="mr-auto">
// 					<Nav.Link href="/makeProduct" style={navStyles}>
// 						Add Product
// 					</Nav.Link>
// 					<Nav.Link href="/products">View All Products</Nav.Link>
// 					<NavDropdown title="Profile" id="collasible-nav-dropdown">
// 						<NavDropdown.Item href="/profile">Home</NavDropdown.Item>
// 						<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
// 						<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
// 						<NavDropdown.Divider />
// 						<NavDropdown.Item href="/">Logout</NavDropdown.Item>
// 					</NavDropdown>
// 				</Nav>
// 			</Navbar>
// 			{/* <div className="card mb-3" style={{ maxWidth: "1150px" }}>
// 				<div className="row g-0">
// 					<div className="col-md-8">
// 						{/* <img
// 							src="https://images-na.ssl-images-amazon.com/images/I/41HJnZ7UjbL.jpg"
// 							style={{ height: "300px" }}
// 						/> */}
// 						<Carousel>
// 							{/* {store.fakeProduct.products[0].imageCSV(item, index) =>  */}
// 							{imagesArray.map((eachImage, eachIndex) => {
// 								return (
// 									<Carousel.Item key={eachIndex}>
// 										<img
// 											className="d-block w-100"
// 											src={`https://images-na.ssl-images-amazon.com/images/I/${eachImage}`}
// 											alt="First slide"
// 											width="100%"
// 											height="500px"
// 										/>
// 										<Carousel.Caption>
// 											<h3>{store.fakeProduct.products[0].manufacturer}</h3>
// 										</Carousel.Caption>
// 									</Carousel.Item>
// 								);
// 							})}
// 						</Carousel>
// 						<div>
// 							{" "}
// 							<p className="card-text">{store.fakeProduct.products[0].description}</p>
// 						</div>
// 					</div>

// 					<div className="card ">
// 						<div className="card-body">
// 							<h3 className="card-title"> {store.fakeProduct.products[0].title} </h3>
// 							<h6 className="text-muted">
// 								{" "}
// 								UPC
// 								{store.fakeProduct.products[0].upcList}{" "}
// 							</h6>
// 							<h6 className="text-muted">
// 								{" "}
// 								ASIN
// 								{store.fakeProduct.products[0].asin}{" "}
// 							</h6>
// 							<div className="row g-0">
// 								<div className="col-md-10">
// 									<div className="row">
// 										<h5 className="text-muted"> Price: </h5>{" "}
// 										<h5>
// 											{`$${store.fakeProduct.products[0].stats.current[1] / 100}`}{" "}
// 											<img
// 												src="https://www.webretailer.com/wp-content/uploads/2019/04/2.-Amazon-Prime-badge.png"
// 												style={{ height: "20px" }}
// 											/>
// 										</h5>
// 									</div>
// 									<div className="row">
// 										<h5 className="text-muted"> FBA Fee: </h5>{" "}
// 										<h5>{store.fakeProduct.products[0].fbaFees.pickAndPackFee / 100}</h5>
// 									</div>
// 									<div className="row">
// 										<h5 className="text-muted"> Storage Fee: </h5>{" "}
// 										<h5>{store.fakeProduct.products[0].fbaFees.storageFee / 100}</h5>
// 									</div>

// 									{/* <h1>{store.fakeProduct.products[0].price}</h1> */}
// 								</div>
// 							</div>
// 							<div className="col-md-8">
// 								<InputGroup className="mb-3">
// 									<InputGroup.Prepend>
// 										<InputGroup.Text>Cost</InputGroup.Text>
// 									</InputGroup.Prepend>
// 									<FormControl
// 										aria-label="Amount (to the nearest dollar)"
// 										onChange={e => setCost(e.target.value)}
// 									/>
// 								</InputGroup>
// 							</div>
// 							{/* (fbafee + storagefee + cost) - price */}
// 							<div>{totalProfit}</div>
// 						</div>

// 						<p className="card-text">
// 							<small className="text-muted">Last updated 3 mins ago</small>
// 						</p>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 			<div className="container" style={myStyles} type="products">
// 				<div className="jumbotron">
// 					<h1 className="display-4">
// 						<div className="d-flex">
// 							<img
// 								className="card-img-top"
// 								style={myImageStyles}
// 								src={store.products[params.id].product_image}
// 								alt="..."
// 							/>
// 							<span style={h1Style}>
// 								<span style={h1Header}>{store.products[params.id].product_name}</span> <br />
// 								{store.products[params.id].product_description}
// 							</span>
// 						</div>
// 					</h1>
// 					<hr className="my-4" style={textStyles} />
// 					<div className="container d-flex justify-content-between" style={textStyles}>
// 						<span>
// 							Product Name <br />
// 							{store.products[params.id].product_name}
// 						</span>
// 						<span>
// 							Product Cost <br />
// 							{store.products[params.id].product_cost}
// 						</span>
// 						<span>
// 							Product UPC <br />
// 							{store.products[params.id].product_upc}
// 						</span>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// Single.propTypes = {
// 	match: PropTypes.object,
// 	product_name: PropTypes.string,
// 	product_cost: PropTypes.string,
// 	product_image: PropTypes.string,
// 	product_upc: PropTypes.string,
// 	id: PropTypes.number
// };
