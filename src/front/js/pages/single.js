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
export const Single = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();

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
		</div>
	);
};
