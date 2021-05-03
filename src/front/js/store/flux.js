const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			isLoggedIn: false,
			token: null || localStorage.getItem("token"),
			userHasProducts: true,
			products: [],
			users: []
		},

		actions: {
			loginUser: (event, history) => {
				event.preventDefault();
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
							throw Error(resp.statusText);
						}
						return resp.json();
					})
					.then(data => {
						setStore({ isLoggedIn: true });
						setStore({ token: data.access_token });
						localStorage.setItem("token", data.access_token);
						history.push("/profile");
					})
					.catch(error => console.log("Error => ", error));
				console.log(params);
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
						setStore({ isLoggedIn: true });
						setStore({ token: data.access_token });
						localStorage.setItem("token", data.access_token);
						history.push("/profile");
					})
					.catch(error => console.log("Error =>", error));

				console.log(params);
			},
			getCurrentUser: () => {
				const token = localStorage.getItem("token");
				console.log(token);
				fetch(process.env.BACKEND_URL + "api/protected", {
					method: "GET",
					headers: { Authorization: "Bearer " + token }
				});
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
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: () => {
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/api/hello")
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
