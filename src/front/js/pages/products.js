import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import getState from "../store/flux";

export const Products = props => {
	const { store, actions } = useContext(Context);

	const imgStyles = {
		width: "327px",
		height: "340px"
	};

	const cardStyles = {
		width: "350px",
		height: "500px",
		padding: "10px",
		marginTop: "30px"
	};

	return (
		<>
			<div className="d-flex flex-row">
				<Row>
					{store.products.map((props, i) => {
						return (
							<Col className="col-4" key={i}>
								<div className="card" style={cardStyles}>
									<img src={props.product_image} className="card-img-top" style={imgStyles} />
									<div className="card-body">
										<h5 className="card-title">{props.product_name}</h5>
										<Card.Text>${props.product_cost}</Card.Text>
										<Link to={`/singleProduct/${props.id}`}>
											<Button variant="danger">Go somewhere</Button>
										</Link>
									</div>
								</div>
							</Col>
						);
					})}
				</Row>
			</div>
		</>
	);
};

Products.propTypes = {
	product_name: PropTypes.string,
	product_cost: PropTypes.string,
	product_image: PropTypes.string,
	product_upc: PropTypes.string,
	id: PropTypes.number
};
