const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			isLoggedIn: false,
			token: null || localStorage.getItem("token"),
			userHasProducts: [],
			products: [],
			getCurrentUser: null || localStorage.getItem("user"),
			amazonData: []
		},

		actions: {
			getProductsByUpc: (product_upc, history) => {
				fetch(`${process.env.KEEPA_API}&domain=1&code=${product_upc}&history=1&stats=1`)
					.then(res => res.json())
					.then(data => {
						setStore({ amazonData: [data] });
						history.push("/singleProduct");
					})
					.catch(error => console.log(error));
			},

			getProducts: () => {
				fetch(process.env.BACKEND_URL + "api/products")
					.then(res => res.json())
					.then(data => {
						setStore({ products: data });
					})
					.catch(error => console.log(error));
			},
			loginUser: (event, history) => {
				event.preventDefault();
				console.log(history);
				const formElements = event.target.elements;
				let params = {};
				Array.prototype.slice.call(formElements, 0).map(el => {
					if (el.type !== "submit") {
						params[el.name] = el.value;
					}
				});

				fetch(process.env.BACKEND_URL + "api/login", {
					method: "POST",
					body: JSON.stringify(params),
					headers: {
						"Content-Type": "application/json charset=UTF-8"
					}
				})
					.then(resp => {
						if (!resp.ok) {
							throw Error("Invalid Email or Password!");
						}
						return resp.json();
					})
					.then(data => {
						setStore({ token: data.access_token, isLoggedIn: true, getCurrentUser: data.user });
						localStorage.setItem("token", data.access_token);
						localStorage.setItem("user", data.user);
						history.push("/profile");
					})
					.catch(error => console.log("Error => ", error));
				console.log(params);
			},
			logoutUser: () => {
				localStorage.removeItem("token");
				localStorage.removeItem("user");
				setStore({ token: null });
				setStore({ getCurrentUser: null });
			},
			signupUser: (event, history) => {
				event.preventDefault();
				const formElements = event.target.elements;
				let params = {};

				Array.prototype.slice.call(formElements, 0).map(el => {
					if (el.type !== "submit") {
						params[el.name] = el.value;
					}
				});
				fetch(process.env.BACKEND_URL + "api/signup", {
					method: "POST",
					body: JSON.stringify(params),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => {
						if (!resp.ok) {
							throw Error(resp.statusText);
						}
						return resp.json();
					})
					.then(data => {
						setStore({ token: data.access_token, isLoggedIn: true, getCurrentUser: data.user });
						localStorage.setItem("token", data.access_token);
						localStorage.setItem("user", data.user);
						history.push("/profile");
					})
					.catch(error => console.log("Error =>", error));

				console.log(params);
			},
			checkSession: () => {
				const store = getStore();
				if (store.token !== null) setStore({ isLoggedIn: true });
				if (store.token === null) setStore({ isLoggedIn: false });
			},
			makeProduct: (event, history) => {
				event.preventDefault();
				const formElements = event.target.elements;
				let params = {};

				Array.prototype.slice.call(formElements, 0).map(el => {
					if (el.type !== "submit") {
						params[el.name] = el.value;
					}
				});
				fetch(process.env.BACKEND_URL + "api/products/make", {
					method: "POST",
					body: JSON.stringify(params),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => {
						if (!resp.ok) {
							throw Error(resp.statusText);
						}
						return resp.json();
					})
					.then(data => {
						setStore({ products: data.results });
						history.push("/profile");
					})
					.catch(error => console.log("Error =>", error));

				console.log(params);
			},
			// makeUserProduct: (event, history) => {
			// 	event.preventDefault();
			// 	const formElements = event.target.elements;
			// 	let params = {};

			// 	Array.prototype.slice.call(formElements, 0).map(el => {
			// 		if (el.type !== "submit") {
			// 			params[el.name] = el.value;
			// 		}
			// 	});
			// 	fetch(process.env.BACKEND_URL + "api/userhasproducts/make", {
			// 		method: "POST",
			// 		body: JSON.stringify(params),
			// 		headers: {
			// 			"Content-Type": "application/json"
			// 		}
			// 	})
			// 		.then(resp => {
			// 			if (!resp.ok) {
			// 				throw Error(resp.statusText);
			// 			}
			// 			return resp.json();
			// 		})
			// 		.then(data => {
			// 			getStore().getCurrentUser;
			// 			getStore().products;
			// 			setStore({ userHasProducts: data.results });
			// 			history.push("/profile");
			// 		})
			// 		.catch(error => console.log("Error =>", error));

			// 	console.log(params);
			// },
			loadProducts: () => {
				fetch(process.env.BACKEND_URL + "api/products")
					.then(resp => resp.json())
					.then(data => setStore({ products: data.results }));
			},
			loadUsers: () => {
				fetch(process.env.BACKEND_URL + "api/user")
					.then(resp => resp.json())
					.then(data => setStore({ users: data.results }));
			},
			loadUserProducts: () => {
				fetch(process.env.BACKEND_URL + "api/userhasproducts")
					.then(resp => resp.json())
					.then(data => setStore({ userHasProducts: data.results }));
			},
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: () => {
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "api/hello")
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
