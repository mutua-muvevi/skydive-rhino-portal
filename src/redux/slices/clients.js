import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";

// ----------------------------------------------------------------------

const initialState = {
	isLoading: false,

	clients: null,
	clientsError: null,

	addClient: null,
	addClientError: null,

	deleteClient: null,
	deleteClientError: null,

	deleteManyClients: null,
	deleteManyClientsError: null,

	fetchAllClients: null,
	fetchAllClientsError: null,

	fetchSingleClient: null,
	fetchSingleClientError: null,

	editClient: null,
	editClientError: null,
	
	setClient: null,
	setClientError: null,
};

//the slice
const slice = createSlice({
	name: "clients",
	initialState,
	reducers: {
		// START LOADING
		startLoading(state) {
			state.isLoading = true;
		},

		// STOP LOADING
		stopLoading(state) {
			state.isLoading = false;
		},

		//FETCH ALL CLIENTS
		fetchAllClients(state, action) {
			state.isLoading = false;
			state.clients = action.payload;
		},

		fetchAllClientsError(state, action) {
			state.isLoading = false;
			state.clientsError = action.payload;
		},

		//FETCH SINGLE CLIENT
		fetchSingleClient(state, action) {
			state.isLoading = false;
			state.client = action.payload;
		},

		fetchSingleClientError(state, action) {
			state.isLoading = false;
			state.clientError = action.payload;
		},

		//ADD CLIENT
		addClient(state, action) {
			state.isLoading = false;
			state.addClient = action.payload;
		},

		addClientError(state, action) {
			state.isLoading = false;
			state.addClientError = action.payload;
		},

		//DELETE CLIENT
		deleteClient(state, action) {
			state.isLoading = false;
			state.deleteClient = action.payload;
		},

		deleteClientError(state, action) {
			state.isLoading = false;
			state.deleteClientError = action.payload;
		},

		//DELETE MANY CLIENTS
		deleteManyClients(state, action) {
			state.isLoading = false;
			state.deleteManyClients = action.payload;
		},

		deleteManyClientsError(state, action) {
			state.isLoading = false;
			state.deleteManyClientsError = action.payload;
		},

		//EDIT CLIENT
		editClient(state, action) {
			state.isLoading = false;
			state.editClient = action.payload;
		},

		editClientError(state, action) {
			state.isLoading = false;
			state.editClientError = action.payload;
		},
		
		//SET CLIENT
		setClient(state, action) {
			state.isLoading = false;
			state.setClient = action.payload;
		},

		setClientError(state, action) {
			state.isLoading = false;
			state.setClientError = action.payload;
		},
	},
});

// Reducer
export default slice.reducer;

// Actions
export const { startLoading, stopLoading } = slice.actions;

// ----------------------------------------------------------------------

//---------------------add client--------------------------------
export function addClient(userID, token, values) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = await axios.post(
				`https://skydiverhino-backend.onrender.com/api/client/${userID}/post`,
				values,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `${token}`,
					},
				}
			);
			const data = await response.data;
			dispatch(slice.actions.addClient(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.addClientError(error));
			throw error.response;

		} finally {
			dispatch(stopLoading());
		}
	};
}

//---------------------delete client--------------------------------
export function deleteClient(userID, token, clientID) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = await axios.delete(
				`https://skydiverhino-backend.onrender.com/api/client/${userID}/delete/single/${clientID}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `${token}`,
					},
				}
			);
			const data = await response.data;
			dispatch(slice.actions.deleteClient(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.deleteClientError(error));
			throw error.response;

		} finally {
			dispatch(stopLoading());
		}
	};
}

//---------------------delete many clients--------------------------------
export function deleteManyClients(userID, token, values) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = await axios.delete(
				`https://skydiverhino-backend.onrender.com/api/client/${userID}/delete/many`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `${token}`,
					},
					data: values,
				}
			);
			const data = await response.data;
			dispatch(slice.actions.deleteManyClients(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.deleteManyClientsError(error));
			throw error.response;

		} finally {
			dispatch(stopLoading());
		}
	};
}

//---------------------edit client--------------------------------
export function editClient(userID, token, clientID, values) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = await axios.put(
				`https://skydiverhino-backend.onrender.com/api/client/${userID}/edit/${clientID}`,
				values,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `${token}`,
					},
				}
			);
			const data = await response.data;
			dispatch(slice.actions.editClient(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.editClientError(error));
			throw error.response;

		} finally {
			dispatch(stopLoading());
		}
	};
}

//---------------------fetch all clients--------------------------------
export function fetchAllClients(token, userID) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = await axios.get(
				`https://skydiverhino-backend.onrender.com/api/client/${userID}/fetch/all`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `${token}`,
					},
				}
			);
			const data = await response.data;
			dispatch(slice.actions.fetchAllClients(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.fetchAllClientsError(error));
			throw error.response;

		} finally {
			dispatch(stopLoading());
		}
	};
}

//---------------------fetch single client--------------------------------
export function fetchSingleClient(token, userID, clientID) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = await axios.get(
				`https://skydiverhino-backend.onrender.com/api/client/${userID}/fetch/single/${clientID}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `${token}`,
					},
				}
			);
			const data = await response.data;
			dispatch(slice.actions.fetchSingleClient(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.fetchSingleClientError(error));
			throw error.response;

		} finally {
			dispatch(stopLoading());
		}
	};
}

//---------------------set client--------------------------------
export function setClient(client) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		try {
			dispatch(slice.actions.setClient(client));
			return client;

		} catch (error) {
			dispatch(slice.actions.setClientError(error));
			throw error.response;

		} finally {
			dispatch(stopLoading());
		}
	};
}