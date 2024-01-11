import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";

// ----------------------------------------------------------------------

const initialState = {
	isLoading: false,

	terms: null,
	termsError: null,

	addTerm: null,
	addTermError: null,

	deleteTerm: null,
	deleteTermError: null,

	deleteManyTerms: null,
	deleteManyTermsError: null,

	fetchAllTerms: null,
	fetchAllTermsError: null,

	fetchSingleTerm: null,
	fetchSingleTermError: null,

	editTerm: null,
	editTermError: null,

	setTerm: null,
	setTermError: null,
};

//the slice
const slice = createSlice({
	name: "terms",
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

		//FETCH ALL TERMS
		fetchAllTerms(state, action) {
			state.isLoading = false;
			state.terms = action.payload;
		},

		fetchAllTermsError(state, action) {
			state.isLoading = false;
			state.termsError = action.payload;
		},

		//FETCH SINGLE TERM
		fetchSingleTerm(state, action) {
			state.isLoading = false;
			state.term = action.payload;
		},

		fetchSingleTermError(state, action) {
			state.isLoading = false;
			state.termError = action.payload;
		},

		//ADD TERM
		addTerm(state, action) {
			state.isLoading = false;
			state.addTerm = action.payload;
		},

		addTermError(state, action) {
			state.isLoading = false;
			state.addTermError = action.payload;
		},

		//EDIT TERM
		editTerm(state, action) {
			state.isLoading = false;
			state.editTerm = action.payload;
		},

		editTermError(state, action) {
			state.isLoading = false;
			state.editTermError = action.payload;
		},

		//DELETE TERM
		deleteTerm(state, action) {
			state.isLoading = false;
			state.deleteTerm = action.payload;
		},

		deleteTermError(state, action) {
			state.isLoading = false;
			state.deleteTermError = action.payload;
		},

		//DELETE MANY TERMS
		deleteManyTerms(state, action) {
			state.isLoading = false;
			state.deleteManyTerms = action.payload;
		},

		deleteManyTermsError(state, action) {
			state.isLoading = false;
			state.deleteManyTermsError = action.payload;
		},

		//SET TERM
		setTerm(state, action) {
			state.isLoading = false;
			state.setTerm = action.payload;
		},

		setTermError(state, action) {
			state.isLoading = false;
			state.setTermError = action.payload;
		},
	},
});

// Reducer
export default slice.reducer;

// Actions
export const { startLoading, stopLoading } = slice.actions;

// ----------------------------------------------------------------------

//-----------------------------add term--------------------------------
export function addTerm(userID, token, values) {
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

			console.log("The values are: ", values)

			const response = await axios.post(
				`https://skydiverhino-backend.onrender.com/api/term/${userID}/post`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `${token}`,
					},
				}
			);
			const data = await response.data;
			dispatch(slice.actions.addTerm(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.addTermError(error));
			throw error;

		} finally {
			dispatch(stopLoading());
		}
	};
}

//-----------------------------edit term--------------------------------
export function editTerm(userID, token, termID, values) {
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
				`https://skydiverhino-backend.onrender.com/api/term/${userID}/edit/${termID}`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `${token}`,
					}
				}
			);
			const data = await response.data;
			dispatch(slice.actions.editTerm(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.editTermError(error));
			throw error;

		} finally {
			dispatch(stopLoading());
		}
	};
}


//-----------------------------delete term--------------------------------
export function deleteTerm(userID, token, termID) {
	return async (dispatch) => {
		dispatch(startLoading());

		try {
			const response = await axios.delete(
				`https://skydiverhino-backend.onrender.com/api/term/${userID}/delete/${termID}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `${token}`,
					},
				}
			);
			const data = await response.data;
			dispatch(slice.actions.deleteTerm(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.deleteTermError(error));
			throw error;

		} finally {
			dispatch(stopLoading());
		}
	};
}

//-----------------------------delete many terms--------------------------------
export function deleteManyTerms(userID, token, termIDs) {
	return async (dispatch) => {
		dispatch(startLoading());

		try {
			const response = await axios.delete(
				`https://skydiverhino-backend.onrender.com/api/term/${userID}/delete/many`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `${token}`,
					},
					data: {
						termIDs: termIDs,
					},
				}
			);
			const data = await response.data;
			dispatch(slice.actions.deleteManyTerms(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.deleteManyTermsError(error));
			throw error;

		} finally {
			dispatch(stopLoading());
		}
	};
}

//-----------------------------fetch all terms--------------------------------
export function fetchAllTerms() {
	return async (dispatch) => {
		dispatch(startLoading());

		try {
			const response = await axios.get(
				`https://skydiverhino-backend.onrender.com/api/term/fetch/all`,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			const data = await response.data;
			dispatch(slice.actions.fetchAllTerms(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.fetchAllTermsError(error));
			throw error;

		} finally {
			dispatch(stopLoading());
		}
	};
}

//-----------------------------fetch single term--------------------------------
export function fetchSingleTerm( termID) {
	return async (dispatch) => {
		dispatch(startLoading());

		try {
			const response = await axios.get(
				`https://skydiverhino-backend.onrender.com/api/term/fetch/single/${termID}`,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			const data = await response.data;
			dispatch(slice.actions.fetchSingleTerm(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.fetchSingleTermError(error));
			throw error;

		} finally {
			dispatch(stopLoading());
		}
	};
}

//-----------------------------set term--------------------------------
export function setTerm(announcement) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		try {
			dispatch(slice.actions.setTerm(announcement));
			return announcement;
		} catch (error) {
			dispatch(slice.actions.setTermError(error));
			throw error;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}