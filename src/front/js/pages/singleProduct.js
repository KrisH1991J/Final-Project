import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
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
	// const words = str.split(",");
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
		<>
			<div className="Container-header">
				<div className="title">
					<h1 className="product-title">{store.amazonData[0].products[0].title}</h1>
				</div>{" "}
				<div className="prices">
					<div className="price" style={{ height: "50px" }}>
						{" "}
						<h1> {`$${store.amazonData[0].products[0].stats.current[1] / 100}`}</h1>{" "}
					</div>

					<div className="text-muted">
						{" "}
						Average: {`$${store.amazonData[0].products[0].stats.avg[1] / 100}`}
					</div>
				</div>
				<div className="prime">
					<img
						src="https://www.webretailer.com/wp-content/uploads/2019/04/2.-Amazon-Prime-badge.png"
						style={{ height: "30px" }}
					/>{" "}
				</div>
			</div>
			<div className="Container-product">
				<div className="product-images">
					<Carousel>
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
								</Carousel.Item>
							);
						})}
					</Carousel>
				</div>
				<div className="calculator">
					<h3 className="calculator-title"> Take Your Pulse </h3>
					<a href="https://amazon.com" target="_blank" rel="noopener noreferrer">
						<h5 className="rank">
							{" "}
							Rank: {store.amazonData[0].products[0].stats.current[3]} in{" "}
							{store.amazonData[0].products[0].categoryTree[0].name}{" "}
						</h5>
					</a>
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
						Referral Fee: ${((store.amazonData[0].products[0].stats.current[1] / 100) * 0.15).toFixed(2)}
					</h5>
					<InputGroup className="mb-3">
						<InputGroup.Prepend>
							<InputGroup.Text>Cost</InputGroup.Text>{" "}
						</InputGroup.Prepend>
						<FormControl
							aria-label="Amount (to the nearest dollar)"
							onChange={e => setCost(e.target.value)}
							value={cost}
						/>
					</InputGroup>{" "}
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
					</h5>{" "}
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
					</div>{" "}
				</div>{" "}
			</div>
			<div className="stats">
				<div className="detail">
					{" "}
					<h4>Product Description</h4>
					<p> {store.amazonData[0].products[0].description}</p>{" "}
				</div>
				<div className="description">
					{" "}
					<h4>Product Detail</h4>
					<p> UPC {store.amazonData[0].products[0].upcList[0]} </p>
					<p> ASIN {store.amazonData[0].products[0].asin} </p>
					<p> BRAND {store.amazonData[0].products[0].brand} </p>
				</div>
			</div>{" "}
		</>
	) : (
		<div> UPC not found </div>
	);
};
