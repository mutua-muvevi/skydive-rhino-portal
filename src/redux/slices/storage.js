import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";

// ----------------------------------------------------------------------

const initialState = {
	isLoading: false,

	download: null,
	downLoadError: null,

	delete: null,
	deleteError: null,

	allFiles: null,
	allFilesError: null,

	uploadFile: null,
	uploadFileError: null,
};

//the slice
const slice = createSlice({
	name: "storage",
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

		//DOWNLOAD FILE
		downloadFile(state, action) {
			state.isLoading = false;
			state.download = action.payload;
		},

		downLoadFileError(state, action) {
			state.isLoading = false;
			state.downLoadError = action.payload;
		},

		//DELETE FILE
		deleteFile(state, action) {
			state.isLoading = false;
			state.delete = action.payload;
		},

		deleteFileError(state, action) {
			state.isLoading = false;
			state.deleteError = action.payload;
		},

		//FETCH ALL FILES
		fetchFiles(state, action) {
			state.isLoading = false;
			state.allFiles = action.payload;
		},

		fetchFilesError(state, action) {
			state.isLoading = false;
			state.allFiles = action.payload;
		},

		//UPLOAD FILE
		uploadFile(state, action) {
			state.isLoading = false;
			state.uploadFile = action.payload;
		},

		uploadFileError(state, action) {
			state.isLoading = false;
			state.uploadFileError = action.payload;
		}
	},
});

//export

// Reducer
export default slice.reducer;

// Actions
export const { startLoading, stopLoading } = slice.actions;

// ---

//The Actions
// =========================

//download file
export function downloadFile(userID, filename, token) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = await axios.get(
				`https://skydiverhino-backend.onrender.com/api/storage/${userID}/download/${filename}`,
				{
					headers: {
						Authorization: token,
					},
					responseType: "blob", // Important for handling binary data
				}
			);

			// Create a URL for the file
			const url = window.URL.createObjectURL(new Blob([response.data]));

			// Create a link and download the file
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", filename); // or any other extension
			document.body.appendChild(link);
			link.click();

			link.parentNode.removeChild(link);
			window.URL.revokeObjectURL(url);

			dispatch(slice.actions.downloadFile(response));
			return response;
		} catch (error) {
			dispatch(slice.actions.downLoadFileError(error));
			throw error.response;
		} finally {
			dispatch(slice.actions.stopLoading()); // Ensure loading is stopped even if there's an error
		}
	};
}

//delete File
export function deleteFile(userID, filename, token) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = await axios.delete(
				`https://skydiverhino-backend.onrender.com/api/storage/${userID}/delete/${filename}`,
				{
					headers: {
						Authorization: token,
					},
				}
			);

			dispatch(slice.actions.deleteFile(response));
			return response;
		} catch (error) {
			dispatch(slice.actions.deleteFileError(error));
			throw error.response;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//fetch all files
export function fetchAllFiles(userID, token) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = await axios.get(
				`https://skydiverhino-backend.onrender.com/api/storage/${userID}/fetch`,
				{
					headers: {
						Authorization: token,
					},
				}
			);

			dispatch(slice.actions.fetchFiles(response.data.data));
			return response.data.data;
		} catch (error) {
			dispatch(slice.actions.fetchFilesError(error));
			throw error.response;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//upload file
export function uploadFile(userID, file, token) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		// Create a form data object to send the file
		const formData = new FormData();

		// Append the file to the form data object
		formData.append("file", file);

		try {
			const response = await axios.post(
				`https://skydiverhino-backend.onrender.com/api/storage/${userID}/upload`,
				formData,
				{
					headers: {
						"Authorization": token,
						"Content-Type": "multipart/form-data",
					},
				}
			);

			dispatch(slice.actions.uploadFile(response));
			return response;
		} catch (error) {
			dispatch(slice.actions.uploadFileError(error));
			throw error.response;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}
