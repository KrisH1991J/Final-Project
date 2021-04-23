import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Products = props => {
	const { store, actions } = useContext(Context);
	return (
		<>
			<Container>
				{" "}
				<h1> Products</h1>
				<Row>
					{store.products.map((product, i) => (
						<Col key={i}>
							{" "}
							<Card style={{ width: "18rem" }}>
								<Card.Img variant="top" src="holder.js/100px180" />
								<Card.Body>
									<Card.Title>{product.name}</Card.Title>

									<Button variant="primary">Go somewhere</Button>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
				;
			</Container>
		</>
	);
};
