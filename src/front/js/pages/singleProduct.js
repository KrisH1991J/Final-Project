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
import Card from "react-bootstrap/Card";
export const SingleProduct = props => {
	const { store, actions } = useContext(Context);
	const [cost, setCost] = useState();
	const [totalProfit, setTotalProfit] = useState(0);
	const params = useParams();
	const [price, setPrice] = useState();
	const [margin, setMargin] = useState(0);
	const [roi, setRoi] = useState(0);
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
				let totalCost = fba + storage + parseInt(cost);
				console.log(((price - totalCost) / price) * 100);
				setTotalProfit(price - totalCost);
				setMargin(((price - totalCost) / price) * 100);
				setRoi(((price - totalCost) / cost) * 100);
			};
			profit();
		},
		[cost]
	);
	return (
		<section className="product">
			<Navbar bg="primary" variant="dark">
				<Navbar.Brand href="#home">MarketPulse</Navbar.Brand>
				<Nav className="mr-auto" />
				<Form inline>
					<FormControl type="text" placeholder="UPC CODE" className="mr-sm-2" />
					<Button variant="outline-light">Search</Button>
				</Form>
			</Navbar>
			<header className="product-row product-title">
				<div className="product-detail-row">
					<div className="product-column">
						<h1 className="product-title">{store.fakeProduct.products[0].title}</h1>
					</div>
					<div className="product-column">
						<div className="row" style={{ height: "50px" }}>
							{" "}
							<h1> {`$${store.fakeProduct.products[0].stats.current[1] / 100}`}</h1>
							<div className="prime">
								<img
									src="https://www.webretailer.com/wp-content/uploads/2019/04/2.-Amazon-Prime-badge.png"
									style={{ height: "30px" }}
								/>{" "}
							</div>
						</div>
						<div className="text-muted">
							{" "}
							Average: {`$${store.fakeProduct.products[0].stats.avg[1] / 100}`}
						</div>
						<div className="review-count"> Reviews: {store.fakeProduct.products[0].csv[5]}</div>
					</div>
				</div>
			</header>
			<div className="product-graphs-row">
				<div className="product-column">
					<Card>
						<Carousel>
							{/* {store.fakeProduct.products[0].imageCSV(item, index) =>  */}
							{imagesArray.map((eachImage, eachIndex) => {
								return (
									<Carousel.Item key={eachIndex}>
										<div
											style={{
												width: "100%",
												height: "500px",
												backgroundImage: `url(https://images-na.ssl-images-amazon.com/images/I/${eachImage})`,
												backgroundRepeat: "no-repeat",
												backgroundSize: "contain"
											}}
										/>
										{/* <img
											className="d-block w-100"
											src={`https://images-na.ssl-images-amazon.com/images/I/${eachImage}`}
											alt="First slide"
											width="100%"
											height="500px"
										/> */}
										<Carousel.Caption>
											<h3>{store.fakeProduct.products[0].manufacturer}</h3>
										</Carousel.Caption>
									</Carousel.Item>
								);
							})}
						</Carousel>
					</Card>
				</div>
				<div className="product-column">
					<Card>
						{" "}
						<h3 className="calculator-title"> Take Your Pulse </h3>
						<h5 className="rank">
							{" "}
							Rank: {store.fakeProduct.products[0].stats.current[3]} in{" "}
							{store.fakeProduct.products[0].categoryTree[0].name}{" "}
						</h5>
						<Card>
							<h5 className="calculator">
								{" "}
								Sell Price: ${store.fakeProduct.products[0].stats.current[1] / 100}
							</h5>
							<h5 className="calculator">
								{" "}
								FBA FEE: ${store.fakeProduct.products[0].fbaFees.pickAndPackFee / 100}
							</h5>
							<h5 className="calculator">
								{" "}
								Storage Fee: ${store.fakeProduct.products[0].fbaFees.storageFee / 100}
							</h5>
							<h5 className="calculator">
								<div className="col-md-4">
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
							</h5>
							<h5 className="calculator"> NET Profit: ${totalProfit}</h5>
							<h5 className="calculator"> Margin: %{margin}</h5>
							<h5 className="calculator"> ROI: %{roi}</h5>
						</Card>
					</Card>
				</div>
			</div>
		</section>
	);
};
