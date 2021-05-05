import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import { Footer } from "./component/footer";
import { Profile } from "./pages/profile";
import { MakeProduct } from "./pages/makeProduct";
import { Products } from "./pages/products";
import { Login } from "./pages/login";
import { SingleProduct } from "./pages/singleProduct";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div className="container-fluid">
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<div className="container">
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
							<Route exact path="/single/:id">
								<Single />
							</Route>
							<Route exact path="/singleProduct">
								<SingleProduct />
							</Route>
							{/* <Route>
								<h1>Not found!</h1>
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
