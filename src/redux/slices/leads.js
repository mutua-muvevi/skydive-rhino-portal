import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";

// ----------------------------------------------------------------------

const initialState = {
	isLoading: false,

	leads: null,
	leadsError: null,

	addLead: null,
	addLeadError: null,

	deleteLead: null,
	deleteLeadError: null,

	deleteManyLeads: null,
	deleteManyLeadsError: null,

	fetchAllLeads: null,
	fetchAllLeadsError: null,

	fetchSingleLead: null,
	fetchSingleLeadError: null,

	editLead: null,
	editLeadError: null,

	convertLeadToClient: null,
	convertLeadToClientError: null,
};

//the slice
const slice = createSlice({
	name: "leads",
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

		//FETCH ALL LEADS
		fetchAllLeads(state, action) {
			state.isLoading = false;
			state.leads = action.payload;
		},

		fetchAllLeadsError(state, action) {
			state.isLoading = false;
			state.leadsError = action.payload;
		},

		//FETCH SINGLE LEAD
		fetchSingleLead(state, action) {
			state.isLoading = false;
			state.fetchSingleLead = action.payload;
		},

		fetchSingleLeadError(state, action) {
			state.isLoading = false;
			state.fetchSingleLeadError = action.payload;
		},

		// ADD LEAD
		addLead(state, action) {
			state.isLoading = false;
			state.addLead = action.payload;
		},

		addLeadError(state, action) {
			state.isLoading = false;
			state.addLeadError = action.payload;
		},

		//DELETE LEAD
		deleteLead(state, action) {
			state.isLoading = false;
			state.deleteLead = action.payload;
		},

		deleteLeadError(state, action) {
			state.isLoading = false;
			state.deleteLeadError = action.payload;
		},

		//DELETE MANY LEADS
		deleteManyLeads(state, action) {
			state.isLoading = false;
			state.deleteManyLeads = action.payload;
		},

		deleteManyLeadsError(state, action) {
			state.isLoading = false;
			state.deleteManyLeadsError = action.payload;
		},

		//SET LEAD
		setLead(state, action) {
			state.isLoading = false;
			state.setLead = action.payload;
		},

		setLeadError(state, action) {
			state.isLoading = false;
			state.setLeadError = action.payload;
		},

		// EDIT LEAD
		editLead(state, action) {
			state.isLoading = false;
			state.editLead = action.payload;
		},

		editLeadError(state, action) {
			state.isLoading = false;
			state.editLeadError = action.payload;
		},

		//CONVERT LEAD TO CLIENT
		convertLeadToClient(state, action) {
			state.isLoading = false;
			state.convertLeadToClient = action.payload;
		},

		convertLeadToClientError(state, action) {
			state.isLoading = false;
			state.convertLeadToClientError = action.payload;
		},
	},
});

// Reducer
export default slice.reducer;

// Actions
export const { startLoading, stopLoading } = slice.actions;

// ----------------------------------------------------------------------

//---------------------------add lead--------------------------------
export function addLead(values) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = await axios.post(
				`https://skydiverhino-backend.onrender.com/api/lead/post`,
				values,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const data = await response.data;
			dispatch(slice.actions.addLead(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.addLeadError(error));
			throw error.response;

		} finally {
			dispatch(stopLoading());
		}
	};
}

//---------------------------delete lead--------------------------------
export function deleteLead(userID, token, leadID) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = await axios.delete(
				`https://skydiverhino-backend.onrender.com/api/lead/${userID}/delete/single/${leadID}`,
				{
					headers: {
						"Content-Type": "application/json",
						"Authorization": token,
					},
				}
			);
			const data = await response.data;
			dispatch(slice.actions.deleteLead(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.deleteLeadError(error));
			throw error.response;

		} finally {
			dispatch(stopLoading());
		}
	};
}

//---------------------------delete many leads--------------------------------
export function deleteManyLeads(userID, token, leadIDs) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = await axios.delete(
				`https://skydiverhino-backend.onrender.com/api/lead/${userID}/delete/many`,
				{
					headers: {
						"Content-Type": "application/json",
						"Authorization": token,
					},
					data: {
						ids: leadIDs,
					},
				}
			);
			const data = await response.data;
			dispatch(slice.actions.deleteManyLeads(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.deleteManyLeadsError(error));
			throw error.response;

		} finally {
			dispatch(stopLoading());
		}
	};
}

//---------------------------fetch all leads--------------------------------
export function fetchAllLeads(token, userID) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = await axios.get(
				`https://skydiverhino-backend.onrender.com/api/lead/${userID}/fetch/all`,
				{
					headers: {
						"Content-Type": "application/json",
						"Authorization": token,
					},
				}
			);
			const data = await response.data;
			dispatch(slice.actions.fetchAllLeads(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.fetchAllLeadsError(error));
			throw error.response;

		} finally {
			dispatch(stopLoading());
		}
	};
}

//---------------------------fetch single lead--------------------------------
export function fetchSingleLead(userID, token, leadID) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = await axios.get(
				`https://skydiverhino-backend.onrender.com/api/lead/${userID}/fetch/single/${leadID}`,
				{
					headers: {
						"Content-Type": "application/json",
						"Authorization": token,
					},
				}
			);
			const data = await response.data;
			dispatch(slice.actions.fetchSingleLead(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.fetchSingleLeadError(error));
			throw error.response;

		} finally {
			dispatch(stopLoading());
		}
	};
}

//---------------------------set lead--------------------------------
export function setLead(lead) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		try {
			dispatch(slice.actions.setLead(lead));
			return lead;
		} catch (error) {
			dispatch(slice.actions.setLeadError(error));
			throw error;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	}
}

//---------------------------edit lead--------------------------------
export function editLead(userID, token, leadID, values) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = await axios.put(
				`https://skydiverhino-backend.onrender.com/api/lead/${userID}/edit/${leadID}`,
				values,
				{
					headers: {
						"Content-Type": "application/json",
						"Authorization": token,
					},
				}
			);
			const data = await response.data;
			dispatch(slice.actions.editLead(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.editLeadError(error));
			throw error.response;

		} finally {
			dispatch(stopLoading());
		}
	};
}

//---------------------------convert lead to client--------------------------------
export function convertLeadToClient(userID, token, leadID) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		
		try {
			const response = await axios.get(
				`https://skydiverhino-backend.onrender.com/api/client/${userID}/convert/lead/${leadID}`,
				{
					headers: {
						"Authorization": token,
					},
				}
			);
			const data = await response.data;
			dispatch(slice.actions.convertLeadToClient(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.convertLeadToClientError(error));
			throw error.response;

		} finally {
			dispatch(stopLoading());
		}
	};
}