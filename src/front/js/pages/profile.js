import React, { useState, useEffect, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import { AiFillStar } from "react-icons/ai";
import { UserProducts } from "../component/userProducts";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";

export const Profile = props => {
	const { store, actions } = useContext(Context);
	const imgStyles = {
		width: "171px",
		height: "180px",
		marginTop: "30px"
	};

	return (
		<div>
			<div className="container d-flex flex-row">
				<div className="col-md-3">
					<div className="row g-5">
						<Col>
							<Image
								src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*"
								roundedCircle
								style={imgStyles}
							/>
						</Col>
					</div>
					<div className="profile-information">
						<div className="username">
							<h1>
								{props.username}
								OleBoi12
							</h1>
							<div className="review">
								<h2 className="review-icon" style={{ color: "yellow" }}>
									<AiFillStar />
									<AiFillStar />
									<AiFillStar />
									<AiFillStar />
								</h2>
							</div>
						</div>
						<div className="row g-0">
							<div className="col-md">
								<h6 className="text-muted">Name: </h6>
							</div>
							<div className="col-md" style={{ color: "red" }}>
								{props.first_name} {props.last_name}
								Oliver Boyson
							</div>
						</div>
						<div className="row g-0">
							<div className="col-md">
								<h6 className="text-muted">Email: </h6>
							</div>
							<div className="col-md" style={{ color: "red" }}>
								{props.email}
								OleBoi12@email.com
							</div>
						</div>
					</div>
				</div>
				<div className="d-flex flex-row">
					<div className="row">
						<UserProducts userHasProducts={store.userHasProducts} />
					</div>
				</div>
			</div>
		</div>
	);
};

Profile.propTypes = {
	username: PropTypes.string,
	email: PropTypes.string,
	first_name: PropTypes.string,
	last_name: PropTypes.string,
	id: PropTypes.number
};
