import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";

// ----------------------------------------------------------------------

const initialState = {
	isLoading: false,

	announcement: null,
	announcementError: null,

	announcements: null,
	announcementsError: null,

	addAnnouncement: null,
	addAnnouncementError: null,

	deleteAnnouncement: null,
	deleteAnnouncementError: null,

	deleteManyAnnouncements: null,
	deleteManyAnnouncementsError: null,

	fetchAllAnnouncements: null,
	fetchAllAnnouncementsError: null,

	fetchSingleAnnouncement: null,
	fetchSingleAnnouncementError: null,
};

//the slice
const slice = createSlice({
	name: "announcements",
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

		//FETCH ALL ANNOUNCEMENTS
		fetchAllAnnouncements(state, action) {
			state.isLoading = false;
			state.announcements = action.payload;
		},

		fetchAllAnnouncementsError(state, action) {
			state.isLoading = false;
			state.announcementsError = action.payload;
		},

		//FETCH SINGLE ANNOUNCEMENT
		fetchSingleAnnouncement(state, action) {
			state.isLoading = false;
			state.announcement = action.payload;
		},

		fetchSingleAnnouncementError(state, action) {
			state.isLoading = false;
			state.announcementError = action.payload;
		},

		//ADD ANNOUNCEMENT
		addAnnouncement(state, action) {
			state.isLoading = false;
			state.addAnnouncement = action.payload;
		},

		addAnnouncementError(state, action) {
			state.isLoading = false;
			state.addAnnouncementError = action.payload;
		},

		//DELETE ANNOUNCEMENT
		deleteAnnouncement(state, action) {
			state.isLoading = false;
			state.deleteAnnouncement = action.payload;
		},

		deleteAnnouncementError(state, action) {
			state.isLoading = false;
			state.deleteAnnouncementError = action.payload;
		},

		//DELETE MANY ANNOUNCEMENTS
		deleteManyAnnouncements(state, action) {
			state.isLoading = false;
			state.deleteManyAnnouncements = action.payload;
		},

		deleteManyAnnouncementsError(state, action) {
			state.isLoading = false;
			state.deleteManyAnnouncementsError = action.payload;
		},

		//SET ANNOUNCEMENT
		setAnnouncement(state, action) {
			state.isLoading = false;
			state.announcement = action.payload;
		},

		setAnnouncementError(state, action) {
			state.isLoading = false;
			state.announcementError = action.payload;
		},
	},
});

// Reducer
export default slice.reducer;

// Actions
export const { startLoading, stopLoading } = slice.actions;

// ----------------------------------------------------------------------

//----------------------------add announcement--------------------------------
export function addAnnouncement(userID, token, values) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		try {
			const response = await axios.post(
				`https://skydiverhino-backend.onrender.com/api/announcement/${userID}/post`,
				values,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					}
				}
			);
			
			const data = await response.data;
			dispatch(slice.actions.addAnnouncement(data));
			return data;
			
		} catch (error) {
			dispatch(slice.actions.addAnnouncementError(error));
			throw error;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//----------------------------------delete announcement------------------------------------
export function deleteAnnouncement(userID, token, id) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		try {
			const response = await axios.delete(
				`https://skydiverhino-backend.onrender.com/api/announcement/${userID}/delete/single/${id}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
				}
			);

			const data = await response.data;
			dispatch(slice.actions.deleteAnnouncement(data));
			return data;
		} catch (error) {
			dispatch(slice.actions.deleteAnnouncementError(error));
			throw error.response;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//----------------------------------delete many announcements------------------------------------
export function deleteManyAnnouncements(userID, token, ids) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		try {
			const response = await axios.delete(
				`https://skydiverhino-backend.onrender.com/api/announcement/${userID}/delete/many/${ids}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
				}
			);

			const data = await response.data;
			dispatch(slice.actions.deleteManyAnnouncements(data));
			return data;
		} catch (error) {
			dispatch(slice.actions.deleteManyAnnouncementsError(error));
			throw error.response;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//----------------------------------fetch all announcements------------------------------------
export function fetchAllAnnouncements(userID, token) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		try {
			const response = await axios.get(
				`https://skydiverhino-backend.onrender.com/api/announcement/fetch/all`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
				}
			);

			const data = await response.data;
			dispatch(slice.actions.fetchAllAnnouncements(data));
			return data;
		} catch (error) {
			dispatch(slice.actions.fetchAllAnnouncementsError(error));
			throw error.response;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//----------------------------------fetch single announcement------------------------------------
export function fetchSingleAnnouncement(userID, token, id) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		try {
			const response = await axios.get(
				`https://skydiverhino-backend.onrender.com/api/announcement/fetch/single/${id}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
				}
			);

			const data = await response.data;
			dispatch(slice.actions.fetchSingleAnnouncement(data));
			return data;
		} catch (error) {
			dispatch(slice.actions.fetchSingleAnnouncementError(error));
			throw error.response;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//---------------------------------set an announcement-------------------------------------
export function setAnnouncement(announcement) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		try {
			dispatch(slice.actions.setAnnouncement(announcement));
			return announcement;
		} catch (error) {
			dispatch(slice.actions.setAnnouncementError(error));
			throw error.response;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}