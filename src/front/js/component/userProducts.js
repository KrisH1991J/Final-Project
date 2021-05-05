import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
export const UserProducts = props => {
	return (
		<>
			{!props.userHasProducts ? (
				<Jumbotron>
					<h1>Hello, Diego!</h1>
					<p>You dont have any products yet</p>
					<p>
						<Button variant="primary">Add a new product</Button>
					</p>
				</Jumbotron>
			) : (
				props.products.map(product => (
					<Card key={product.id} style={{ width: "18rem" }}>
						<Card.Img variant="top" src="holder.js/100px180" />
						<Card.Body>
							<Card.Title>{product.name}</Card.Title>
							<Card.Text>{product.brand}</Card.Text>
							<Card.Text>{product.price}</Card.Text>
							<Link
								to={{
									pathname: `/single/${product.id}`
								}}>
								<Button variant="primary">Go somewhere</Button>
							</Link>
						</Card.Body>
					</Card>
				))
			)}
		</>
	);
};
