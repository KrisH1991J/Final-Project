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
	const picStyle = {
		width: "171px",
		height: "180px",
		marginTop: "30px"
	};
	const usernameStyle = {
		fontSize: "24px",
		marginTop: "15px"
	};

	return (
		<div>
			<div className="container d-flex flex-row">
				<div className="col-md-3">
					<div className="row g-5">
						<Col>
							<Image
								src="https://image.winudf.com/v2/image1/b3JnLm1lbW9qaXMuYW5kcm9pZF9pY29uXzE1NTA3OTkzNThfMDg4/icon.png?w=&fakeurl=1"
								roundedCircle
								style={picStyle}
							/>
						</Col>
					</div>
					<div className="profile-information">
						<div className="username">
							<h1 style={usernameStyle}>{store.getCurrentUser.username}</h1>
							<div className="review">
								<h2 className="review-icon" style={{ color: "orange" }}>
									<AiFillStar />
									<AiFillStar />
									<AiFillStar />
									<AiFillStar />
								</h2>
							</div>
						</div>
						<div className="row g-0">
							<div className="col-3">
								<h6 className="text-muted">Name: </h6>
							</div>
							<div style={{ color: "orange" }}>
								{store.getCurrentUser.first_name} {store.getCurrentUser.last_name}
							</div>
						</div>
						<div className="row g-0">
							<div className="col-3">
								<h6 className="text-muted">Email:</h6>
							</div>
							<div style={{ color: "orange" }}>{store.getCurrentUser.email}</div>
						</div>
					</div>
				</div>
				<div className="d-flex flex-row">
					<div className="row">
						<UserProducts />
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
