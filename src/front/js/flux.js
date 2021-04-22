const getState = ({getStore, getActions, getStore}) => {
    return {
        store:{
            products: [],
        },
        actions: { getProducts: () => {
            fetch("https://swapi.dev/api/people/")
            .then(res => res.json())
            .then(data => setStore({products: data.results})); 
        }

        }
    }
}