import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import InputGroup from "react-bootstrap/InputGroup";
import Carousel from "react-bootstrap/Carousel";

export const Single = props => {
	const { store, actions } = useContext(Context);
	const [cost, setCost] = useState();
	const [totalProfit, setTotalProfit] = useState(0);
	const params = useParams();
	console.log(params);
	// const words = str.split(',');
	const imagesArray = store.fakeProduct.products[0].imagesCSV.split(",");
	console.log("images: ", imagesArray);
	useEffect(
		() => {
			const profit = () => {
				let price = store.fakeProduct.products[0].stats.current[1] / 100;
				let fba = store.fakeProduct.products[0].fbaFees.pickAndPackFee / 100;
				let storage = store.fakeProduct.products[0].fbaFees.storageFee / 100;
				let costFee = fba + storage + parseInt(cost);
				setTotalProfit(price - costFee);
			};
			profit();
		},
		[cost]
	);
	return (
		<div>
			<Navbar bg="primary" variant="dark">
				<Navbar.Brand href="#home">MarketPulse</Navbar.Brand>
				<Nav className="mr-auto" />
				<Form inline>
					<FormControl type="text" placeholder="UPC CODE" className="mr-sm-2" />
					<Button variant="outline-light">Search</Button>
				</Form>
			</Navbar>

			<div className="card mb-3" style={{ maxWidth: "1150px" }}>
				<div className="row g-0">
					<div className="col-md-8">
						{/* <img
							src="https://images-na.ssl-images-amazon.com/images/I/41HJnZ7UjbL.jpg"
							style={{ height: "300px" }}
						/> */}
						<Carousel>
							{/* {store.fakeProduct.products[0].imageCSV(item, index) =>  */}
							{imagesArray.map((eachImage, eachIndex) => {
								return (
									<Carousel.Item key={eachIndex}>
										<img
											className="d-block w-100"
											src={`https://images-na.ssl-images-amazon.com/images/I/${eachImage}`}
											alt="First slide"
											width="100%"
											height="500px"
										/>
										<Carousel.Caption>
											<h3>{store.fakeProduct.products[0].manufacturer}</h3>
										</Carousel.Caption>
									</Carousel.Item>
								);
							})}
						</Carousel>
						<div>
							{" "}
							<p className="card-text">{store.fakeProduct.products[0].description}</p>
						</div>
					</div>

					<div className="card ">
						<div className="card-body">
							<h3 className="card-title"> {store.fakeProduct.products[0].title} </h3>
							<h6 className="text-muted">
								{" "}
								UPC
								{store.fakeProduct.products[0].upcList}{" "}
							</h6>
							<h6 className="text-muted">
								{" "}
								ASIN
								{store.fakeProduct.products[0].asin}{" "}
							</h6>
							<div className="row g-0">
								<div className="col-md-10">
									<div className="row">
										<h5 className="text-muted"> Price: </h5>{" "}
										<h5>
											{`$${store.fakeProduct.products[0].stats.current[1] / 100}`}{" "}
											<img
												src="https://www.webretailer.com/wp-content/uploads/2019/04/2.-Amazon-Prime-badge.png"
												style={{ height: "20px" }}
											/>
										</h5>
									</div>
									<div className="row">
										<h5 className="text-muted"> FBA Fee: </h5>{" "}
										<h5>{store.fakeProduct.products[0].fbaFees.pickAndPackFee / 100}</h5>
									</div>
									<div className="row">
										<h5 className="text-muted"> Storage Fee: </h5>{" "}
										<h5>{store.fakeProduct.products[0].fbaFees.storageFee / 100}</h5>
									</div>

									{/* <h1>{store.fakeProduct.products[0].price}</h1> */}
								</div>
							</div>
							<div className="col-md-8">
								<InputGroup className="mb-3">
									<InputGroup.Prepend>
										<InputGroup.Text>Cost</InputGroup.Text>
									</InputGroup.Prepend>
									<FormControl
										aria-label="Amount (to the nearest dollar)"
										onChange={e => setCost(e.target.value)}
									/>
								</InputGroup>
							</div>
							{/* (fbafee + storagefee + cost) - price */}
							<div>{totalProfit}</div>
						</div>

						<p className="card-text">
							<small className="text-muted">Last updated 3 mins ago</small>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
