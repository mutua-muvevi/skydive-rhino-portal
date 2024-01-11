import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";

// ----------------------------------------------------------------------

const initialState = {
	isLoading: false,

	manuals: null,
	manualsError: null,

	addManual: null,
	addManualError: null,

	deleteManual: null,
	deleteManualError: null,

	deleteManyManuals: null,
	deleteManyManualsError: null,

	fetchAllManuals: null,
	fetchAllManualsError: null,

	fetchSingleManual: null,
	fetchSingleManualError: null,

	editManual: null,
	editManualError: null,

	setManual: null,
	setManualError: null,
};

//the slice
const slice = createSlice({
	name: "manuals",
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

		//FETCH ALL MANUALS
		fetchAllManuals(state, action) {
			state.isLoading = false;
			state.manuals = action.payload;
		},

		fetchAllManualsError(state, action) {
			state.isLoading = false;
			state.manualsError = action.payload;
		},

		//FETCH SINGLE MANUAL
		fetchSingleManual(state, action) {
			state.isLoading = false;
			state.manual = action.payload;
		},

		fetchSingleManualError(state, action) {
			state.isLoading = false;
			state.manualError = action.payload;
		},

		//ADD MANUAL
		addManual(state, action) {
			state.isLoading = false;
			state.addManual = action.payload;
		},

		addManualError(state, action) {
			state.isLoading = false;
			state.addManualError = action.payload;
		},

		//EDIT MANUAL
		editManual(state, action) {
			state.isLoading = false;
			state.editManual = action.payload;
		},

		editManualError(state, action) {
			state.isLoading = false;
			state.editManualError = action.payload;
		},

		//DELETE MANUAL
		deleteManual(state, action) {
			state.isLoading = false;
			state.deleteManual = action.payload;
		},

		deleteManualError(state, action) {
			state.isLoading = false;
			state.deleteManualError = action.payload;
		},

		//DELETE MANY MANUALS
		deleteManyManuals(state, action) {
			state.isLoading = false;
			state.deleteManyManuals = action.payload;
		},

		deleteManyManualsError(state, action) {
			state.isLoading = false;
			state.deleteManyManualsError = action.payload;
		},

		//SET MANUAL
		setManual(state, action) {
			state.isLoading = false;
			state.setManual = action.payload;
		},

		setManualError(state, action) {
			state.isLoading = false;
			state.setManualError = action.payload;
		},
	},
});

// Reducer
export default slice.reducer;

// Actions
export const { startLoading, stopLoading } = slice.actions;

// ----------------------------------------------------------------------

//--------------------------add manual---------------------------------
export function addManual(userID, token, values) {
	return async (dispatch) => {
		dispatch(startLoading());
		try {
			const formData = new FormData();

			//appending non-file values
			formData.append("name", values.name);
			formData.append("description", values.description);
			formData.append("type", values.type);

			//appending the file
			if (values.file) {
				formData.append("file", values.file, values.file.name);
			}

			const response = await axios.post(
				`https://skydiverhino-backend.onrender.com/api/manual/${userID}/new`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `${token}`,
					},
				}
			);
			const data = await response.data;
			dispatch(slice.actions.addManual(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.addManualError(error));
			throw error;

		} finally {
			dispatch(stopLoading());
		}
	};
}

//--------------------------edit manual---------------------------------
export function editManual(userID, token, values, manualID) {
	return async (dispatch) => {
		dispatch(startLoading());
		try {
			const formData = new FormData();

			//appending non-file values
			formData.append("name", values.name);
			formData.append("description", values.description);
			formData.append("type", values.type);

			//appending the file
			if (values.file) {
				formData.append("file", values.file, values.file.name);
			}

			const response = await axios.put(
				`https://skydiverhino-backend.onrender.com/api/manual/${userID}/edit/${manualID}`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `${token}`,
					},
				}
			);
			const data = await response.data;
			dispatch(slice.actions.editManual(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.editManualError(error));
			throw error;

		} finally {
			dispatch(stopLoading());
		}
	};
}

//--------------------------delete manual---------------------------------
export function deleteManual(userID, token, manualID) {
	return async (dispatch) => {
		dispatch(startLoading());
		try {
			const response = await axios.delete(
				`https://skydiverhino-backend.onrender.com/api/manual/${userID}/delete/${manualID}`,
				{
					headers: {
						Authorization: `${token}`,
					},
				}
			);
			const data = await response.data;
			dispatch(slice.actions.deleteManual(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.deleteManualError(error));
			throw error;

		} finally {
			dispatch(stopLoading());
		}
	};
}

//--------------------------delete many manuals---------------------------------
export function deleteManyManuals(userID, token, manualIDs) {
	return async (dispatch) => {
		dispatch(startLoading());
		try {
			const response = await axios.delete(
				`https://skydiverhino-backend.onrender.com/api/manual/${userID}/deleteMany`,
				{
					headers: {
						Authorization: `${token}`,
					},
					data: {
						manualIDs
					}
				}
			);
			const data = await response.data;
			dispatch(slice.actions.deleteManyManuals(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.deleteManyManualsError(error));
			throw error;

		} finally {
			dispatch(stopLoading());
		}
	};
}

//--------------------------fetch all manuals---------------------------------
export function fetchAllManuals(userID, token) {
	return async (dispatch) => {
		dispatch(startLoading());
		try {
			const response = await axios.get(
				`https://skydiverhino-backend.onrender.com/api/manual/${userID}/fetch/all`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `${token}`,
					},
				}
			);
			const data = await response.data;
			dispatch(slice.actions.fetchAllManuals(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.fetchAllManualsError(error));
			throw error;

		} finally {
			dispatch(stopLoading());
		}
	};
}

//--------------------------fetch single manual---------------------------------
export function fetchSingleManual(userID, token, manualID) {
	return async (dispatch) => {
		dispatch(startLoading());
		try {
			const response = await axios.get(
				`https://skydiverhino-backend.onrender.com/api/manual/${userID}/fetch/${manualID}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `${token}`,
					},
				}
			);
			const data = await response.data;
			dispatch(slice.actions.fetchSingleManual(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.fetchSingleManualError(error));
			throw error;

		} finally {
			dispatch(stopLoading());
		}
	};
}

//--------------------------set manual---------------------------------
export function setManual(manual) {
	return async (dispatch) => {
		dispatch(startLoading());
		try {
			dispatch(slice.actions.setManual(manual));
			return manual;

		} catch (error) {
			dispatch(slice.actions.setManualError(error));
			throw error;

		} finally {
			dispatch(stopLoading());
		}
	};
}