import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";

// ----------------------------------------------------------------------

const initialState = {
	isLoading: false,

	reservations: null,
	reservationsError: null,

	addReservation: null,
	addReservationError: null,

	deleteReservation: null,
	deleteReservationError: null,

	deleteManyReservations: null,
	deleteManyReservationsError: null,

	fetchAllReservations: null,
	fetchAllReservationsError: null,

	fetchSingleReservation: null,
	fetchSingleReservationError: null,
};

//the slice
const slice = createSlice({
	name: "reservations",
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

		//FETCH ALL RESERVATIONS
		fetchAllReservations(state, action) {
			state.isLoading = false;
			state.reservations = action.payload;
		},

		fetchAllReservationsError(state, action) {
			state.isLoading = false;
			state.reservationsError = action.payload;
		},

		//FETCH SINGLE RESERVATION
		fetchSingleReservation(state, action) {
			state.isLoading = false;
			state.fetchSingleReservation = action.payload;
		},

		fetchSingleReservationError(state, action) {
			state.isLoading = false;
			state.fetchSingleReservationError = action.payload;
		},

		//ADD RESERVATION
		addReservation(state, action) {
			state.isLoading = false;
			state.addReservation = action.payload;
		},

		addReservationError(state, action) {
			state.isLoading = false;
			state.addReservationError = action.payload;
		},

		//DELETE RESERVATION
		deleteReservation(state, action) {
			state.isLoading = false;
			state.deleteReservation = action.payload;
		},

		deleteReservationError(state, action) {
			state.isLoading = false;
			state.deleteReservationError = action.payload;
		},

		//DELETE MANY RESERVATIONS
		deleteManyReservations(state, action) {
			state.isLoading = false;
			state.deleteManyReservations = action.payload;
		},

		deleteManyReservationsError(state, action) {
			state.isLoading = false;
			state.deleteManyReservationsError = action.payload;
		},

		//SET RESERVATION
		setReservation(state, action) {
			state.isLoading = false;
			state.reservation = action.payload;
		},

		setReservationError(state, action) {
			state.isLoading = false;
			state.reservationError = action.payload;
		},
	},
});

// Reducer
export default slice.reducer;

// Actions
export const { startLoading, stopLoading, } = slice.actions;

//----------------------------------------------------------------------

//---------------------------------reservations---------------------------------

//FETCH ALL RESERVATIONS
export const fetchAllReservations = (token, userID) => async (dispatch) => {
	dispatch(slice.actions.startLoading());

	try {
		const response = await axios.get(
			`https://skydiverhino-backend.onrender.com/api/reservation/${userID}/fetch/all`,
			{
				headers: {
					"Content-Type": "application/json",
					"Authorization": token,
				},
			}
		);

		const data = await response.data;
		dispatch(slice.actions.fetchAllReservations(data));
		return data;

	} catch (error) {
		dispatch(slice.actions.fetchAllReservationsError(error.message));
		throw error.response;

	} finally {
		dispatch(slice.actions.stopLoading());
	}
};

//FETCH SINGLE RESERVATION
export const fetchSingleReservation = (token, userID, id) => async (dispatch) => {
	dispatch(slice.actions.startLoading());

	try {
		const response = await axios.get(
			`https://skydiverhino-backend.onrender.com/api/reservation/${userID}/fetch/single/${id}`,
			{
				headers: {
					"Content-Type": "application/json",
					"Authorization": token,
				},
			}
		);

		const data = await response.data;
		dispatch(slice.actions.fetchSingleReservation(data));
		return data

	} catch (error) {
		dispatch(slice.actions.fetchSingleReservationError(error.message));
		throw error.response;

	} finally {
		dispatch(slice.actions.stopLoading());
	}
};

//ADD RESERVATION
export const addReservation = (values) => async (dispatch) => {
	dispatch(slice.actions.startLoading());
	try {
		const response = await axios.post(
			"https://skydiverhino-backend.onrender.com/api/reservation/post",
			values,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		const data = await response.data;
		dispatch(slice.actions.addReservation(data));
		return data;

	} catch (error) {
		dispatch(slice.actions.addReservationError(error.message));
		throw error.response;

	} finally {
		dispatch(slice.actions.stopLoading());
	}
};

//DELETE RESERVATION
export const deleteReservation = (userID, token, reservationID) => async (dispatch) => {
	dispatch(slice.actions.startLoading());
	try {
		const response = await axios.delete(
			`https://skydiverhino-backend.onrender.com/api/reservation/${userID}/${reservationID}/delete/single`,
			{
				headers: {
					"Content-Type": "application/json",
					"Authorization": token,
				},
			}
		);

		const data = await response.data;
		dispatch(slice.actions.deleteReservation(data));
		return data;

	} catch (error) {
		dispatch(slice.actions.deleteReservationError(error.message));
		throw error.response;
		
	} finally {
		dispatch(slice.actions.stopLoading());
	}
};


//DELETE MANY RESERVATIONS
export const deleteManyReservations = (userID, token, reservationIDs) => async (dispatch) => {
	dispatch(slice.actions.startLoading());
	try {
		const response = await axios.delete(
			`https://skydiverhino-backend.onrender.com/api/reservation/${userID}/${reservationIDs}/delete/many`,
			{
				headers: {
					"Content-Type": "application/json",
					"Authorization": token,
				},
			}
		);

		const data = await response.data;
		dispatch(slice.actions.deleteManyReservations(data));
		return data;

	} catch (error) {
		dispatch(slice.actions.deleteManyReservationsError(error.message));
		throw error.response;

	} finally {
		dispatch(slice.actions.stopLoading());
	}
};

// ----------------------------------set a reservation------------------------------------
export function setReservation(blog) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		try {
			dispatch(slice.actions.setReservation(blog));
			return blog;
		} catch (error) {
			dispatch(slice.actions.setReservationError(error));
			throw error;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}