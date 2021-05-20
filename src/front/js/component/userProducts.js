import React, { useContext } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import Col from "react-bootstrap/Col";

export const UserProducts = props => {
	const { store, actions } = useContext(Context);

	const imgStyles = {
		width: "15rem",
		height: "10rem"
	};

	const cardStyles = {
		width: "16.5rem",
		height: "20rem",
		padding: "10px",
		marginTop: "20px"
	};

	const headerStyle = {
		marginLeft: "325px",
		marginTop: "10px",
		fontSize: "24px"
	};

	const rowStyle = {
		paddingRight: "10px",
		paddingLeft: "5px"
	};

	return (
		<>
			<div className="col-12">
				<h2 style={headerStyle}>Your Products</h2>
			</div>
			{store.userHasProducts.map((props, i) => {
				if (props.user.id === store.getCurrentUser.id) {
					return (
						<div className="row" style={rowStyle} key={i}>
							<Col className="col-4">
								<Card style={cardStyles}>
									<Card.Img variant="top" src={props.product.product_image} style={imgStyles} />
									<Card.Body>
										<Card.Title>{props.product.product_name}</Card.Title>
										<Card.Text>${props.product.product_cost}</Card.Text>
										<Link to={`/singleProduct/${props.id}`}>
											<Button variant="danger">Go somewhere</Button>
										</Link>
									</Card.Body>
								</Card>
							</Col>
						</div>
					);
				}
			})}
		</>
	);
};

UserProducts.propTypes = {
	product_name: PropTypes.string,
	product_cost: PropTypes.string,
	product_image: PropTypes.string,
	product_upc: PropTypes.string
};
