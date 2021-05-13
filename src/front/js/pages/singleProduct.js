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
import { useHistory } from "react-router-dom";
import { FiInfo } from "react-icons/fi";

export const SingleProduct = props => {
	const { store, actions } = useContext(Context);
	const amzData =
		store.amazonData[0] == undefined ||
		store.amazonData[0].products[0] == undefined ||
		store.amazonData[0].products == undefined
			? false
			: true;
	const backendData = store.products[0] == undefined ? false : true;
	const history = useHistory();

	let filterProducts =
		backendData && amzData
			? store.products.filter(product => {
					return product.product_upc == store.amazonData[0].products[0].upcList[0];
			  })
			: [{ product_cost: 0 }];
	const [cost, setCost] = useState(filterProducts[0].product_cost);
	const [totalProfit, setTotalProfit] = useState(0);
	const params = useParams();
	const [price, setPrice] = useState();
	const [margin, setMargin] = useState(0);
	const [roi, setRoi] = useState(0);
	console.log(params);
	// const words = str.split(',');
	const imagesArray = amzData ? store.amazonData[0].products[0].imagesCSV.split(",") : "";
	console.log("images: ", imagesArray);
	useEffect(
		() => {
			if (amzData) {
				const profit = () => {
					let price = store.amazonData[0].products[0].stats.current[1] / 100;
					let refFee = price * 0.15;
					let fba = store.amazonData[0].products[0].fbaFees.pickAndPackFee / 100;
					let storage = store.amazonData[0].products[0].fbaFees.storageFee / 100;
					let totalCost = fba + storage + refFee + parseInt(cost);
					console.log(((price - totalCost) / price) * 100);
					setTotalProfit(price - totalCost);
					setMargin(((price - totalCost) / price) * 100);
					setRoi(((price - totalCost) / cost) * 100);
				};
				profit();
			}
		},
		[cost]
	);
	const profitColor = () => {};
	return amzData ? (
		<div className="product-body">
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
							<h1 className="product-title">{store.amazonData[0].products[0].title}</h1>
						</div>
						<div className="product-column">
							<div className="row" style={{ height: "50px" }}>
								{" "}
								<h1> {`$${store.amazonData[0].products[0].stats.current[1] / 100}`}</h1>
								<div className="prime">
									<img
										src="https://www.webretailer.com/wp-content/uploads/2019/04/2.-Amazon-Prime-badge.png"
										style={{ height: "30px" }}
									/>{" "}
								</div>
							</div>
							<div className="text-muted">
								{" "}
								Average: {`$${store.amazonData[0].products[0].stats.avg[1] / 100}`}
							</div>
							<div className="review-count"> Reviews: {store.amazonData[0].products[0].csv[5]}</div>
						</div>
					</div>
				</header>
				<div className="product-graphs-row">
					<div className="product-column">
						<Card>
							<Carousel>
								{/* {store.amazonData[0].products[0].imageCSV(item, index) =>  */}
								{imagesArray.map((eachImage, eachIndex) => {
									return (
										<Carousel.Item key={eachIndex}>
											<div
												style={{
													width: "90%",
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
												<h3>{store.amazonData[0].products[0].manufacturer}</h3>
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
							<a href="https://amazon.com" target="_blank" rel="noopener noreferrer">
								<h5 className="rank">
									{" "}
									Rank: {store.amazonData[0].products[0].stats.current[3]} in{" "}
									{store.amazonData[0].products[0].categoryTree[0].name}{" "}
								</h5>
							</a>
							<Card className="calculatorCard">
								<h5 className="calculator">
									{" "}
									Sell Price: ${store.amazonData[0].products[0].stats.current[1] / 100}
								</h5>
								<h5 className="calculator">
									{" "}
									FBA FEE: ${store.amazonData[0].products[0].fbaFees.pickAndPackFee / 100}
								</h5>
								<h5 className="calculator">
									{" "}
									Storage Fee: ${store.amazonData[0].products[0].fbaFees.storageFee / 100}
								</h5>
								<h5 className="calculator">
									{" "}
									Referral Fee: $
									{((store.amazonData[0].products[0].stats.current[1] / 100) * 0.15).toFixed(2)}
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
												value={cost}
											/>
										</InputGroup>
									</div>
								</h5>
								<h5 className="calculator">
									{" "}
									NET Profit:{" "}
									<span
										style={{
											color: totalProfit >= 5 ? "green" : totalProfit >= 0 ? "orange" : "red"
										}}>
										{" "}
										${totalProfit.toFixed(2)}{" "}
									</span>
								</h5>
								<h5 className="calculator">
									{" "}
									Margin:{" "}
									<span style={{ color: margin >= 20 ? "green" : margin >= 0 ? "orange" : "red" }}>
										{margin.toFixed(0)}%{" "}
									</span>
								</h5>
								<h5 className="calculator">
									{" "}
									ROI:{" "}
									<span style={{ color: roi > 30 ? "green" : roi >= 0 ? "orange" : "red" }}>
										{roi.toFixed(0)}%{" "}
									</span>
								</h5>
								<div>
									<Button>
										{/* <a href="https://amazon.com" target="_blank"> */}{" "}
										{/*THIS IS FOR EXTERNAL LINKS LIKE https://amazon.com*/}
										{/* <Link to={`www.amazon.com/${store.amazonData[0].products[0].asin}`}>THIS IS FOR INTERNAL LINKS LIKE /login */}{" "}
										hello {/* </a> */}
									</Button>{" "}
								</div>
							</Card>
							<Card />
						</Card>
					</div>
					<div className="recommendation">
						<Card>
							{" "}
							<div
								style={{
									color:
										store.amazonData[0].products[0].stats.current[3] < 50000 &&
										totalProfit > 10 &&
										margin > 20 &&
										roi > 30
											? "green"
											: store.amazonData[0].products[0].stats.current[3] < 100000 &&
											  totalProfit > 5 &&
											  margin > 10 &&
											  roi > 15
												? "orange"
												: "red"
								}}>
								{" "}
								{store.amazonData[0].products[0].stats.current[3] < 50000 &&
								totalProfit > 10 &&
								margin > 20 &&
								roi > 30 ? (
									<span>
										{" "}
										<FiInfo /> Amazing
									</span>
								) : store.amazonData[0].products[0].stats.current[3] < 100000 &&
								totalProfit > 5 &&
								margin > 10 &&
								roi > 15 ? (
									<span>
										{" "}
										<FiInfo /> great
									</span>
								) : (
									<span>
										{" "}
										<FiInfo /> high
									</span>
								)}{" "}
							</div>
						</Card>
					</div>{" "}
					<div className="stats">
						<Card>
							{" "}
							<h4>Product Detail</h4>
							<p> UPC {store.amazonData[0].products[0].upcList[0]} </p>
							<p> ASIN {store.amazonData[0].products[0].asin} </p>
							<p> BRAND {store.amazonData[0].products[0].brand} </p>
						</Card>
					</div>{" "}
				</div>
			</section>
		</div>
	) : (
		<div> UPC dont found </div>
	);
};
