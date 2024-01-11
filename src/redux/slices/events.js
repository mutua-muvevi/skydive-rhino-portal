import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";

// ----------------------------------------------------------------------

const initialState = {
	isLoading: false,

	events: null,
	eventsError: null,

	addEvent: null,
	addEventError: null,

	deleteEvent: null,
	deleteEventError: null,

	deleteManyEvents: null,
	deleteManyEventsError: null,

	fetchAllEvents: null,
	fetchAllEventsError: null,

	fetchSingleEvent: null,
	fetchSingleEventError: null,

	editEvent: null,
	editEventError: null,

	setEvent: null,
	setEventError: null,
};

//the slice
const slice = createSlice({
	name: "events",
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

		//FETCH ALL EVENTS
		fetchAllEvents(state, action) {
			state.isLoading = false;
			state.events = action.payload;
		},

		fetchAllEventsError(state, action) {
			state.isLoading = false;
			state.eventsError = action.payload;
		},

		//FETCH SINGLE EVENT
		fetchSingleEvent(state, action) {
			state.isLoading = false;
			state.event = action.payload;
		},

		fetchSingleEventError(state, action) {
			state.isLoading = false;
			state.eventError = action.payload;
		},

		// ADD EVENT
		addEvent(state, action) {
			state.isLoading = false;
			state.addEvent = action.payload;
		},

		addEventError(state, action) {
			state.isLoading = false;
			state.addEventError = action.payload;
		},

		// EDIT EVENT
		editEvent(state, action) {
			state.isLoading = false;
			state.editEvent = action.payload;
		},

		editEventError(state, action) {
			state.isLoading = false;
			state.editEventError = action.payload;
		},

		// DELETE EVENT
		deleteEvent(state, action) {
			state.isLoading = false;
			state.deleteEvent = action.payload;
		},

		deleteEventError(state, action) {
			state.isLoading = false;
			state.deleteEventError = action.payload;
		},

		// DELETE MANY EVENTS
		deleteManyEvents(state, action) {
			state.isLoading = false;
			state.deleteManyEvents = action.payload;
		},

		deleteManyEventsError(state, action) {
			state.isLoading = false;
			state.deleteManyEventsError = action.payload;
		},

		// SET EVENT
		setEvent(state, action) {
			state.isLoading = false;
			state.setEvent = action.payload;
		},

		setEventError(state, action) {
			state.isLoading = false;
			state.setEventError = action.payload;
		},
	},
});

// Reducer
export default slice.reducer;

// Actions
export const { startLoading, stopLoading } = slice.actions;

// ----------------------------------------------------------------------

//-----------------------add event--------------------------------
export function addEvent(userID, token, values) {
	return async (dispatch) => {
		dispatch(startLoading());

		try {
			const formData = new FormData();

			formData.append("name", values.name);
			formData.append("description", values.description);
			formData.append("date", values.date);
			formData.append("venue", values.venue);

			//appending file values
			if (values.thumbnail) {
				formData.append("thumbnail", values.thumbnail, values.thumbnail.name);
			}
			

			const response = await axios.post(
				`https://skydiverhino-backend.onrender.com/api/event/${userID}/post`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: token,
					},
				}
			);
			const data = await response.data;
			dispatch(slice.actions.addEvent(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.addEventError(error));
			throw error;

		} finally {
			dispatch(stopLoading());
		}
	};
}

//-----------------------edit event--------------------------------
export function editEvent(userID, token, values, eventID) {
	return async (dispatch) => {
		dispatch(startLoading());

		try {
			const formData = new FormData();

			formData.append("name", values.name);
			formData.append("description", values.description);
			formData.append("date", values.date);
			formData.append("venue", values.venue);

			//appending file values
			if (values.thumbnail) {
				formData.append("thumbnail", values.thumbnail, values.thumbnail.name);
			}

			const response = await axios.put(
				`https://skydiverhino-backend.onrender.com/api/event/${userID}/edit/${eventID}`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: token,
					},
				}
			);
			const data = await response.data;
			dispatch(slice.actions.editEvent(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.editEventError(error));
			throw error;

		} finally {
			dispatch(stopLoading());
		}
	};
}

//-----------------------delete event--------------------------------
export function deleteEvent(userID, token, eventID) {
	return async (dispatch) => {
		dispatch(startLoading());

		try {
			const response = await axios.delete(
				`https://skydiverhino-backend.onrender.com/api/event/${userID}/delete/${eventID}`,
				{
					headers: {
						Authorization: token,
					},
				}
			);
			const data = await response.data;
			dispatch(slice.actions.deleteEvent(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.deleteEventError(error));
			throw error;

		} finally {
			dispatch(stopLoading());
		}
	};
}

//-----------------------delete many events--------------------------------
export function deleteManyEvents(userID, token, values) {
	return async (dispatch) => {
		dispatch(startLoading());

		try {
			const response = await axios.delete(
				`https://skydiverhino-backend.onrender.com/api/event/${userID}/delete/many`,
				{
					headers: {
						Authorization: token,
					},
					data: {
						events: values,
					},
				}
			);
			const data = await response.data;
			dispatch(slice.actions.deleteManyEvents(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.deleteManyEventsError(error));
			throw error;

		} finally {
			dispatch(stopLoading());
		}
	};
}

//-----------------------fetch all events--------------------------------
export function fetchAllEvents() {
	return async (dispatch) => {
		dispatch(startLoading());

		try {
			const response = await axios.get(
				`https://skydiverhino-backend.onrender.com/api/event/fetch/all`,
			);
			const data = await response.data;
			dispatch(slice.actions.fetchAllEvents(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.fetchAllEventsError(error));
			throw error;

		} finally {
			dispatch(stopLoading());
		}
	};
}

//-----------------------fetch single event--------------------------------
export function fetchSingleEvent(eventID) {
	return async (dispatch) => {
		dispatch(startLoading());

		try {
			const response = await axios.get(
				`https://skydiverhino-backend.onrender.com/api/event/fetch/${eventID}`,
			);
			const data = await response.data;
			dispatch(slice.actions.fetchSingleEvent(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.fetchSingleEventError(error));
			throw error;

		} finally {
			dispatch(stopLoading());
		}
	};
}

//-----------------------set event--------------------------------
export function setEvent(event) {
	return async (dispatch) => {
		dispatch(startLoading());
		try {
			dispatch(slice.actions.setEvent(event));
			return event;

		} catch (error) {
			dispatch(slice.actions.setEventError(error));
			throw error;

		} finally {
			dispatch(stopLoading());
		}
	};
}