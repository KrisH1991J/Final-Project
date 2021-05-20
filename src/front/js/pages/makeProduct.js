import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import Carousel from "react-bootstrap/Carousel";
import { FiInfo } from "react-icons/fi";

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
		<>
			<div className="container d-flex">
				<div className="card mb-3" style={{ height: "500px", width: "500px", marginTop: "30px" }}>
					<div className="row g-0">
						<div className="col-md-6">
							<Carousel style={{ height: "500px", width: "498px" }}>
								<Carousel.Item interval={1000}>
									<img
										className="d-block w-100"
										src="https://static1.srcdn.com/wordpress/wp-content/uploads/2020/11/PS5-Review.jpg"
										alt="Second slide"
										style={{ height: "498px" }}
									/>
								</Carousel.Item>
								<Carousel.Item interval={1000}>
									<img
										className="d-block w-100"
										src="https://th.bing.com/th/id/Rae52cd2847323b59764192eff5242685?rik=zRggUAFm6wConQ&riu=http%3a%2f%2fimages.the-house.com%2fadidas-daroga-sleek-canvas-wmns-hiking-shoes-clay-blk-base-green-15-1.jpg&ehk=NiSgFt6%2fwakjt3u9haRmULHFijk%2bpIrNoxu4qU7SdUs%3d&risl=&pid=ImgRaw"
										alt="Second slide"
										style={{ height: "498px" }}
									/>
								</Carousel.Item>
								<Carousel.Item interval={1000}>
									<img
										className="d-block w-100"
										src="https://i.pinimg.com/originals/fd/9f/73/fd9f738bf1994d963dd19449e6045bfe.jpg"
										alt="Third slide"
										style={{ height: "498px" }}
									/>
								</Carousel.Item>
							</Carousel>
						</div>
					</div>
				</div>
				<div className="col-md-6">
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
						<Button variant="warning" type="submit">
							Submit
						</Button>
					</Form>
				</div>
			</div>
		</>
	);
};

MakeProduct.propTypes = {
	history: PropTypes.object
};
