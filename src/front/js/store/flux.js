const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			isLoggedIn: false,
			token: null || localStorage.getItem("token"),
			userHasProducts: [],
			products: [],
			users: [],
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
					.then(data => {
						setTimeout(
							alert,
							250,
							"Welcome to your profile! You can add products and view a list of all products on the Navbar!"
						);
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
				let actions = getActions();
				let store = getStore();
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
						setStore({ token: data.access_token, token: null });
						alert("Account Created. You can now log in!");
						history.go(0);
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
				let actions = getActions();
				let store = getStore();
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
					})
					.then(data => {
						let lastElement = store.products[store.products.length - 1];
						actions.makeUserProduct(store.getCurrentUser.id, lastElement.id);
						history.push("/profile");
					})
					.catch(error => console.log("Error =>", error));

				console.log(params);
			},
			makeUserProduct: (user_id, product_id) => {
				fetch(process.env.BACKEND_URL + "api/userhasproducts/make", {
					method: "POST",
					body: JSON.stringify({ user_id: user_id, product_id: product_id }),
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
						setStore({ userHasProducts: data.results });
					})
					.catch(error => console.log("Error =>", error));
			},
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
