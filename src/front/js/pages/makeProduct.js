import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

export const MakeProduct = props => {
	const { store, actions } = useContext(Context);
	let history = useHistory();
	const [upcError, setUpcError] = useState(false);
	const formStyles = {
		width: "410px",
		height: "500px",
		marginTop: "30px",
		padding: "10px",
		backgroundColor: "#343a40",
		color: "white"
	};

	return (
		<div className="makeproduct">
			<Form
				style={formStyles}
				onSubmit={async event => {
					event.preventDefault();
					const formElements = event.target.elements;
					let params = {};

					Array.prototype.slice.call(formElements, 0).map(el => {
						if (el.type !== "submit") {
							params[el.name] = el.value;
						}
					});
					console.log(params);
					let respons = await actions.getProductsByUpc(params.product_upc);
					console.log(respons);
					setUpcError(!respons);
					if (respons) {
						actions.makeProduct(params, history);
					}
				}}>
				<Form.Group controlId="formProductName">
					<Form.Label>Product Name</Form.Label>
					<Form.Control placeholder="Enter Product Name" name="product_name" />
				</Form.Group>
				<Form.Group controlId="formProductCost">
					<Form.Label>Product Cost</Form.Label>
					<Form.Control placeholder="Enter Product Cost" name="product_cost" />
				</Form.Group>
				<Form.Group controlId="formProductImage">
					<Form.Label>Product Image</Form.Label>
					<Form.Control placeholder="Enter Image URL" name="product_image" />
				</Form.Group>
				<Form.Group controlId="formProductUpc">
					<Form.Label>
						Product UPC
						{upcError && <span style={{ color: "red" }}> UPC Not Found! </span>}
					</Form.Label>
					<Form.Control placeholder="Enter Product UPC" name="product_upc" />
				</Form.Group>
				<Form.Group controlId="formProductDescription">
					<Form.Label>Product Description</Form.Label>
					<Form.Control placeholder="Enter Description" name="product_description" />
				</Form.Group>
				<Button variant="danger" type="submit">
					Submit
				</Button>
			</Form>
		</div>
	);
};

MakeProduct.propTypes = {
	history: PropTypes.object
};
