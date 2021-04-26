import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import Button from "react-bootstrap/Button";
import "../../styles/home.scss";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Container";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<section className="home-top-section">
				<div className="container">
					<div className="row">
						<div className="col-lg-6 col-xl-5">
							<h1 className="h1 headline home-top-section">
								{" "}
								Everything You Need to Sell on Amazon and More
							</h1>
							<h2 className="h2 headline home-top-section">
								{" "}
								Easily manage and grow a thriving eCommerce business with just one platform
							</h2>
							<Button variant="primary" href="/login">
								Sign Up
							</Button>{" "}
						</div>
						<div className="col-lg-6 col-xl-7">
							<div className="animation home-top-section">
								<Card style={{ width: "18rem" }}>
									<Card.Img variant="top" src="" />
								</Card>
							</div>
						</div>
					</div>
				</div>
				<Container>
					<h3 className="in-the-press-title">in the Press </h3>
					<ul>
						<li className="cnbc" style={{ listStyleType: "none" }}>
							<img src="https://www.helium10.com/app/themes/helium10/assets/img/home-page/CNBC.svg" />
						</li>
						<li className="thenyt" style={{ listStyleType: "none" }}>
							<img src="https://www.helium10.com/app/themes/helium10/assets/img/home-page/NYTimes.svg" />{" "}
						</li>
						<li className="Bloom">
							<img src="https://www.helium10.com/app/themes/helium10/assets/img/home-page/Bloomberg.svg" />{" "}
						</li>
					</ul>
				</Container>
				<h2 className="section-title"> everithing you need</h2>
				<section className="section">
					<Container>
						<div className="row align-items-center">
							<div className="col-md-6">
								<div className="image section">
									<img src="https://www.helium10.com/app/themes/helium10/assets/img/home-page/helium-iso-2-01-01.svg" />
								</div>
							</div>
							<div className="col-md-6">
								<div className="section-content">
									<h3 className="section__content__title">Powerful Product Research</h3>
									<p className="section-content">Easily Find products to sell</p>
								</div>
							</div>
						</div>
					</Container>
				</section>
				<section className="section">
					<Container>
						<div className="row align-items-center">
							<div className="col-md-6">
								<div className="image section">
									<img src="https://www.helium10.com/app/themes/helium10/assets/img/home-page/analytics-1.svg" />
								</div>
							</div>
						</div>
						<div className="col-md-6">
							<div className="section__content padding-left">
								<h3 className="section__content__title">Analytics that Power Decision-Making</h3>
								<p className="section-content">Easily Find products to sell</p>
							</div>
						</div>
					</Container>
				</section>
				<h2 className="subtitle"> You can be the next Amazon Pro Seller</h2>
				<section className="review-slider">
					<Container>
						{/* <Carousel>
							<Carousel.Item interval={1000}>
								<img
									className="d-block w-100"
									src="holder.js/800x400?text=First slide&bg=373940"
									alt="First slide"
								/>
								<Carousel.Caption>
									<h3>First slide label</h3>
									<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
								</Carousel.Caption>
							</Carousel.Item>
							<Carousel.Item interval={500}>
								<img
									className="d-block w-100"
									src="holder.js/800x400?text=Second slide&bg=282c34"
									alt="Second slide"
								/>
								<Carousel.Caption>
									<h3>Second slide label</h3>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
								</Carousel.Caption>
							</Carousel.Item>
							<Carousel.Item>
								<img
									className="d-block w-100"
									src="holder.js/800x400?text=Third slide&bg=20232a"
									alt="Third slide"
								/>
								<Carousel.Caption>
									<h3>Third slide label</h3>
									<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
								</Carousel.Caption>
							</Carousel.Item>
						</Carousel> */}
					</Container>
				</section>
			</section>
		</div>
	);
};
