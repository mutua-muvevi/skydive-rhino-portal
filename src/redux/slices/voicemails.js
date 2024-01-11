import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";

// ----------------------------------------------------------------------

const initialState = {
	isLoading: false,

	voicemail: null,
	voicemailError: null,

	voicemails: null,
	voicemailsError: null,

	addVoicemail: null,
	addVoicemailError: null,

	editVoicemail: null,
	editVoicemailError: null,

	deleteVoicemail: null,
	deleteVoicemailError: null,

	deleteManyVoicemails: null,
	deleteManyVoicemailsError: null,

	fetchAllVoicemails: null,
	fetchAllVoicemailsError: null,

	fetchSingleVoicemail: null,
	fetchSingleVoicemailError: null,

	setVoicemail: null,
	setVoicemailError: null,
};

//the slice
const slice = createSlice({
	name: "voicemails",
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

		//FETCH ALL VOICEMAILS
		fetchAllVoicemails(state, action) {
			state.isLoading = false;
			state.voicemails = action.payload;
		},

		fetchAllVoicemailsError(state, action) {
			state.isLoading = false;
			state.voicemailsError = action.payload;
		},

		//FETCH SINGLE VOICEMAIL
		fetchSingleVoicemail(state, action) {
			state.isLoading = false;
			state.voicemail = action.payload;
		},

		fetchSingleVoicemailError(state, action) {
			state.isLoading = false;
			state.voicemailError = action.payload;
		},

		//ADD VOICEMAIL
		addVoicemail(state, action) {
			state.isLoading = false;
			state.addVoicemail = action.payload;
		},

		addVoicemailError(state, action) {
			state.isLoading = false;
			state.addVoicemailError = action.payload;
		},

		//EDIT VOICEMAIL
		editVoicemail(state, action) {
			state.isLoading = false;
			state.editVoicemail = action.payload;
		},

		editVoicemailError(state, action) {
			state.isLoading = false;
			state.editVoicemailError = action.payload;
		},

		//DELETE VOICEMAIL
		deleteVoicemail(state, action) {
			state.isLoading = false;
			state.deleteVoicemail = action.payload;
		},

		deleteVoicemailError(state, action) {
			state.isLoading = false;
			state.deleteVoicemailError = action.payload;
		},

		//DELETE MANY VOICEMAILS
		deleteManyVoicemails(state, action) {
			state.isLoading = false;
			state.deleteManyVoicemails = action.payload;
		},

		deleteManyVoicemailsError(state, action) {
			state.isLoading = false;
			state.deleteManyVoicemailsError = action.payload;
		},

		//SET VOICEMAIL
		setVoicemail(state, action) {
			state.isLoading = false;
			state.setVoicemail = action.payload;
		},

		setVoicemailError(state, action) {
			state.isLoading = false;
			state.setVoicemailError = action.payload;
		},
	},
});

// Reducer
export default slice.reducer;

// Actions
export const { startLoading, stopLoading } = slice.actions;

// ----------------------------------------------------------------------

//----------------------------add voicemail--------------------------------
export function addVoicemail(userID, token, values) {
	return async (dispatch) => {
		dispatch(startLoading());
		try {
			const response = await axios.post(
				`https://skydiverhino-backend.onrender.com/api/voicemail/${userID}/new`,
				values,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					}
				}
			);
			
			const data = await response.data;
			dispatch(slice.actions.addVoicemail(data));
			return data;
		} catch (error) {
			dispatch(slice.actions.addVoicemailError(error));
			throw error;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//----------------------------edit voicemail--------------------------------
export function editVoicemail(userID, token, values, id,) {
	return async (dispatch) => {
		dispatch(startLoading());
		try {
			const response = await axios.put(
				`https://skydiverhino-backend.onrender.com/api/voicemail/${userID}/edit/${id}`,
				values,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
				}
			);

			const data = await response.data;
			dispatch(slice.actions.editVoicemail(data));
			return data;
		} catch (error) {
			dispatch(slice.actions.editVoicemailError(error));
			throw error;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//----------------------------delete voicemail--------------------------------
export function deleteVoicemail(userID, token, id) {
	return async (dispatch) => {
		dispatch(startLoading());
		try {
			const response = await axios.delete(
				`https://skydiverhino-backend.onrender.com/api/voicemail/${userID}/delete/single/${id}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
				}
			);

			const data = await response.data;
			dispatch(slice.actions.deleteVoicemail(data));
			return data;
		} catch (error) {
			dispatch(slice.actions.deleteVoicemailError(error));
			throw error;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//----------------------------delete many voicemails--------------------------------
export function deleteManyVoicemails(userID, token, voicemailIDs) {
	return async (dispatch) => {
		dispatch(startLoading());
		try {
			const response = await axios.delete(
				`https://skydiverhino-backend.onrender.com/api/voicemail/${userID}/delete/many`,
				{
					headers: {
						Authorization: token,
					},
					data: {
						voicemailIDs,
					},
				}
			);

			const data = await response.data;
			dispatch(slice.actions.deleteManyVoicemails(data));
			return data;
		} catch (error) {
			dispatch(slice.actions.deleteManyVoicemailsError(error));
			throw error;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//----------------------------fetch all voicemails--------------------------------
export function fetchAllVoicemails(userID, token) {
	return async (dispatch) => {
		dispatch(startLoading());
		try {
			const response = await axios.get(
				`https://skydiverhino-backend.onrender.com/api/voicemail/${userID}/fetch/all`,
				{
					headers: {
						Authorization: token,
						"Content-Type": "application/json",
					},
				}
			);

			const data = await response.data;
			dispatch(slice.actions.fetchAllVoicemails(data));
			return data;
		} catch (error) {
			dispatch(slice.actions.fetchAllVoicemailsError(error));
			throw error;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//----------------------------fetch single voicemail--------------------------------
export function fetchSingleVoicemail(userID, token, id) {
	return async (dispatch) => {
		dispatch(startLoading());
		try {
			const response = await axios.get(
				`https://skydiverhino-backend.onrender.com/api/voicemail/${userID}/fetch/single/${id}`,
				{
					headers: {
						Authorization: token,
						"Content-Type": "application/json",
					},
				}
			);

			const data = await response.data;
			dispatch(slice.actions.fetchSingleVoicemail(data));
			return data;
		} catch (error) {
			dispatch(slice.actions.fetchSingleVoicemailError(error));
			throw error;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//----------------------------set voicemail--------------------------------
export function setVoicemail(voicemail) {
	return async (dispatch) => {
		dispatch(startLoading());
		try {
			dispatch(slice.actions.setVoicemail(voicemail));
			return voicemail;
		} catch (error) {
			dispatch(slice.actions.setVoicemailError(error));
			throw error;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}