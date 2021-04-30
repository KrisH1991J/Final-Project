const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			isLoggedIn: false,
			token: null,
			userHasProducts: true,
			products: [
				{
					name: "Shoes",
					price: "19.99",
					brand: "Adidas",
					id: "123"
				},
				{
					name: "T-shirt",
					price: "5.99",
					brand: "Champions",
					id: "1234"
				},
				{
					name: "Hat",
					price: "24.99",
					brand: "Nike",
					id: "12345"
				}
			]
		},

		actions: {
			loginUser: event => {
				event.preventDefault();
				const formElements = event.target.elements;
				let params = {};
				Array.prototype.slice.call(formElements, 0).map(el => {
					if (el.type !== "submit") {
						params[el.name] = el.value;
					}
				});

				fetch(process.env.BACKEND_URL + "/api/login", {
					method: "POST",
					body: JSON.stringify(params),
					headers: {
						"Content-Type": "application/json charset=UTF-8"
					}
				})
					.then(resp => resp.json())
					.then(data => console.log(data))
					.catch(error => console.log("Error => ", error));
				console.log(params);
			},
			signupUser: event => {
				event.preventDefault();
				const formElements = event.target.elements;
				let params = {};

				Array.prototype.slice.call(formElements, 0).map(el => {
					if (el.type !== "submit") {
						params[el.name] = el.value;
					}
				});

				fetch(process.env.BACKEND_URL + "/api/signup", {
					method: "POST",
					body: JSON.stringify(params),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => resp.json())
					.then(data => console.log(data))
					.catch(error => console.log("Error =>", error));

				console.log(params);
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
