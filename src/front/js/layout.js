import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import injectContext from "./store/appContext";
import { Footer } from "./component/footer";
import { Profile } from "./pages/profile";
import { MakeProduct } from "./pages/makeProduct";
import { Products } from "./pages/products";
import { SingleProduct } from "./pages/singleProduct";
import { Navigation } from "./component/navbar";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div className="container-fluid">
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navigation />
					<div
						className="container"
						style={{
							paddingTop: "150px"
						}}>
						<Switch>
							<Route exact path="/">
								<Home />
							</Route>
							<Route exact path="/products">
								<Products />
							</Route>
							<Route exact path="/profile">
								<Profile />
							</Route>
							<Route exact path="/singleProduct/:id">
								<SingleProduct />
							</Route>
							<Route exact path="/makeProduct">
								<MakeProduct />
							</Route>
							{/* <Route exact path="/settings">
								<Settings />
							</Route> */}
						</Switch>
						<Footer />
					</div>
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
