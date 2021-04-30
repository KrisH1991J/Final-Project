import React, { useState, useEffect, useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import FormControl from "react-bootstrap/FormControl";
import { AiFillStar } from "react-icons/ai";
import { UserProducts } from "../component/userProducts";
import { Context } from "../store/appContext";
export const Profile = () => {
	const { store, actions } = useContext(Context);
	return (
		<div>
			<Navbar bg="primary" variant="dark">
				<Navbar.Brand href="#home">MarketPulse</Navbar.Brand>
				<Nav className="mr-auto" />
				<Form inline>
					<FormControl type="text" placeholder="Find Products" className="mr-sm-2" />
					<Button variant="outline-light">Search</Button>
				</Form>
			</Navbar>
			<div className="row">
				<div className="col-md-03">
					<div className="row g-5">
						<div className="profile-picture">
							<img src="data:image/jpeg;base64,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" />
						</div>
					</div>
					<div className="profile-information">
						<div className="first-name">
							<h1> Diego Rodriguez </h1>
							<div className="review">
								<h2 className="review-icon" style={{ color: "#3498DB" }}>
									<AiFillStar />
									<AiFillStar />
									<AiFillStar />
									<AiFillStar />
								</h2>
							</div>
						</div>
						<div className="row g-0">
							<div className="col-md">
								<h6 className="text-muted">email: </h6>
							</div>
							<div className="col-md" style={{ color: "#3498DB" }}>
								diego@yahoo.com
							</div>
						</div>
						<div className="row g-0">
							<div className="col-md">
								<h6 className="text-muted">username: </h6>
							</div>
							<div className="col-md" style={{ color: "#3498DB" }}>
								diego123
							</div>
						</div>
					</div>
				</div>
				<div className="col">
					{" "}
					<UserProducts userHasProducts={store.userHasProducts} products={store.products} />{" "}
				</div>
			</div>
		</div>
	);
};
