import React, { useContext } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

export const UserProducts = props => {
	const { store, actions } = useContext(Context);
	const history = useHistory();
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
						<Card.Img variant="top" src={product.product_image} />
						<Card.Body>
							<Card.Title>{product.product_name}</Card.Title>
							<Card.Text>{product.brand}</Card.Text>
							<Card.Text>{product.price}</Card.Text>
							{/* <Link
								to={{
									pathname: `/single/${props.theid}`,
									state: { product: product }
								}}> */}

							<Button
								onClick={() => {
									actions.getProductsByUpc(product.product_upc, history);
									console.log(store.amazonData);
								}}
								variant="danger">
								Go somewhere
							</Button>
							{/* </Link> */}
						</Card.Body>
					</Card>
				))
			)}
		</>
	);
};
