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
		marginTop: "30px"
	};

	return (
		<>
			{/* <div className="d-flex flex-row"> */}
			{store.userHasProducts.map((props, i) => {
				return (
					<Col className="col-4" key={i}>
						<Card style={cardStyles}>
							<Card.Img variant="top" src={props.product.product_image} style={imgStyles} />
							<Card.Body>
								<Card.Title>{props.product.product_name}</Card.Title>
								<Card.Text>${props.product.product_cost}</Card.Text>
								<Link
									to={{
										pathname: `/single`
									}}>
									<Button variant="danger">Go somewhere</Button>
								</Link>
							</Card.Body>
						</Card>
					</Col>
				);
			})}
			{/* </div> */}
		</>
	);
};

UserProducts.propTypes = {
	product_name: PropTypes.string,
	product_cost: PropTypes.string,
	product_image: PropTypes.string,
	product_upc: PropTypes.string
};
