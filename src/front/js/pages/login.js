import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";

export const Login = () => {
	const loginStyles = {
		backgroundColor: "white",
		border: "1px solid black",
		width: "1000px",
		height: "500px",
		padding: "10px",
		margin: "0",
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)"
	};

	const imgStyles = {
		height: "480px",
		width: "400px"
	};
	const formStyles = {
		position: "absolute",
		top: "50%",
		left: "75%",
		transform: "translate(-50%, -50%)"
	};

	const iconStyles = {
		height: "50px",
		width: "50px",
		marginLeft: "100px",
		marginTop: "-50px",
		marginBottom: "20px"
	};

	return (
		<div>
			<Container style={loginStyles} className="container-flex d-inline">
				<Carousel fade>
					<Carousel.Item interval={2000}>
						<img
							className="d-block w-50"
							src="https://www.ceicdata.com/datapage/charts/ipc_south-africa_market-capitalization--nominal-gdp/?type=area&from=2009-12-01&to=2020-12-01&lang=en"
							alt="First slide"
							style={imgStyles}
						/>
					</Carousel.Item>
					<Carousel.Item interval={2000}>
						<img
							className="d-block w-50"
							src="https://www.seeitmarket.com/wp-content/uploads/2020/01/sp-500-index-trading-chart-analysis-decline-tuesday-january-7.jpg"
							alt="Second slide"
							style={imgStyles}
						/>
					</Carousel.Item>
					<Carousel.Item interval={2000}>
						<img
							className="d-block w-50"
							src="https://www.kamilfranek.com/assets/images/amazon_revenue_segments_breakdown_chart.png"
							alt="Third slide"
							style={imgStyles}
						/>
					</Carousel.Item>
				</Carousel>
				<Form className="d-block w-48" style={formStyles}>
					<img src="https://gw.alipayobjects.com/zos/antfincdn/4zAaozCvUH/unexpand.svg" style={iconStyles} />
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Email Address</Form.Label>
						<Form.Control type="email" placeholder="Enter email" />
						<Form.Text className="text-muted">We will never share your email with anyone else.</Form.Text>
					</Form.Group>

					<Form.Group controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Password" />
					</Form.Group>
					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Form>
			</Container>
		</div>
	);
};
