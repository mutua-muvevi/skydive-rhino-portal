import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";

// ----------------------------------------------------------------------

const initialState = {
	isLoading: false,

	curriculum: null,
	curriculumError: null,

	curriculums: null,
	curriculumsError: null,

	addCurriculum: null,
	addCurriculumError: null,

	editCurriculum: null,
	editCurriculumError: null,

	deleteCurriculum: null,
	deleteCurriculumError: null,

	deleteManyCurriculums: null,
	deleteManyCurriculumsError: null,

	fetchAllCurriculums: null,
	fetchAllCurriculumsError: null,

	fetchSingleCurriculum: null,
	fetchSingleCurriculumError: null,

	setCurriculum: null,
	setCurriculumError: null,
};

//the slice
const slice = createSlice({
	name: "curriculums",
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

		//FETCH ALL CURRICULUMS
		fetchAllCurriculums(state, action) {
			state.isLoading = false;
			state.curriculums = action.payload;
		},

		fetchAllCurriculumsError(state, action) {
			state.isLoading = false;
			state.curriculumsError = action.payload;
		},

		//FETCH SINGLE CURRICULUM
		fetchSingleCurriculum(state, action) {
			state.isLoading = false;
			state.curriculum = action.payload;
		},

		fetchSingleCurriculumError(state, action) {
			state.isLoading = false;
			state.curriculumError = action.payload;
		},

		//ADD CURRICULUM
		addCurriculum(state, action) {
			state.isLoading = false;
			state.addCurriculum = action.payload;
		},

		addCurriculumError(state, action) {
			state.isLoading = false;
			state.addCurriculumError = action.payload;
		},

		//EDIT CURRICULUM
		editCurriculum(state, action) {
			state.isLoading = false;
			state.editCurriculum = action.payload;
		},

		editCurriculumError(state, action) {
			state.isLoading = false;
			state.editCurriculumError = action.payload;
		},

		//DELETE CURRICULUM
		deleteCurriculum(state, action) {
			state.isLoading = false;
			state.deleteCurriculum = action.payload;
		},

		deleteCurriculumError(state, action) {
			state.isLoading = false;
			state.deleteCurriculumError = action.payload;
		},

		//DELETE MANY CURRICULUMS
		deleteManyCurriculums(state, action) {
			state.isLoading = false;
			state.deleteManyCurriculums = action.payload;
		},

		deleteManyCurriculumsError(state, action) {
			state.isLoading = false;
			state.deleteManyCurriculumsError = action.payload;
		},

		//SET CURRICULUM
		setCurriculum(state, action) {
			state.isLoading = false;
			state.setCurriculum = action.payload;
		},

		//SET CURRICULUM ERROR
		setCurriculumError(state, action) {
			state.isLoading = false;
			state.setCurriculumError = action.payload;
		},
	},
});

// Reducer
export default slice.reducer;

// Actions
export const { startLoading, stopLoading } = slice.actions;

// ----------------------------------------------------------------------

//-----------------------------add a curriculum---------------------------------
export function addCurriculum(userID, token, curriculum) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		try {
			const formData = new FormData();

			// Append non-file fields to FormData
			formData.append("title", curriculum.title);
			formData.append("introDescription", curriculum.introDescription);

			// Append thumbnail file to FormData
			if (curriculum.thumbnail) {
				formData.append(
					"thumbnail",
					curriculum.thumbnail,
					curriculum.thumbnail.name
				);
			}

			// Append content block files and details to FormData
			if (Array.isArray(curriculum.contentBlocks)) {
				curriculum.contentBlocks.forEach((block, index) => {
					formData.append(
						`contentBlocks[${index}][title]`,
						block.title
					);
					formData.append(
						`contentBlocks[${index}][details]`,
						block.details
					);

					// Append each file with the field name 'file'
					if (block.file) {
						formData.append(`file`, block.file, block.file.name);
					}
				});
			}

			const response = await axios.post(
				`https://skydiverhino-backend.onrender.com/api/curriculum/${userID}/new`,
				formData,
				{
					headers: {
						Authorization: token,
						"Content-Type": "multipart/form-data",
					},
				}
			);

			const data = await response.data;
			dispatch(slice.actions.addCurriculum(data));
			return data;
		} catch (error) {
			dispatch(slice.actions.addCurriculumError(error));
			throw error.response;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//-----------------------------edit a curriculum---------------------------------
export function editCurriculum(userID, token, curriculum, curriculumID) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		try {
			const formData = new FormData();
			// return console.log(curriculum);

			// Append non-file fields to FormData
			formData.append("title", curriculum.title);
			formData.append("introDescription", curriculum.introDescription);

			// Append thumbnail file to FormData
			if (curriculum.thumbnail instanceof File) {
				formData.append(
					"thumbnail",
					curriculum.thumbnail,
					curriculum.thumbnail.name
				);
			}

			// Append content block files and details to FormData

			curriculum.contentBlocks.forEach((block, index) => {
				formData.append(`contentBlocks[${index}][title]`, block.title);
				formData.append(
					`contentBlocks[${index}][details]`,
					block.details
				);

				// Check if 'block.file' is an instance of File and not a string (URL)
				if (block.file instanceof File) {
					formData.append(
						`contentBlocks[${index}][file]`,
						block.file,
						block.file.name
					);
				}
			});

			const response = await axios.put(
				`https://skydiverhino-backend.onrender.com/api/curriculum/${userID}/edit/${curriculumID}`,
				formData,
				{
					headers: {
						Authorization: token,
						"Content-Type": "multipart/form-data",
					},
				}
			);

			const data = await response.data;
			dispatch(slice.actions.editCurriculum(data));
			return data;
		} catch (error) {
			dispatch(slice.actions.editCurriculumError(error));
			throw error.response;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//-----------------------------delete a curriculum---------------------------------
export function deleteCurriculum(userID, token, curriculumID) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		try {
			const response = await axios.delete(
				`https://skydiverhino-backend.onrender.com/api/curriculum/${userID}/delete/${curriculumID}`,
				{
					headers: {
						Authorization: token,
					},
				}
			);

			const data = await response.data;
			dispatch(slice.actions.deleteCurriculum(data));
			return data;
		} catch (error) {
			dispatch(slice.actions.deleteCurriculumError(error));
			throw error.response;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//-----------------------------delete many curriculums---------------------------------
export function deleteManyCurriculums(userID, token, curriculumIDs) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		try {
			const response = await axios.delete(
				`https://skydiverhino-backend.onrender.com/api/curriculum/${userID}/delete/many`,
				{
					headers: {
						Authorization: token,
					},
					data: {
						curriculumIDs,
					},
				}
			);

			const data = await response.data;
			dispatch(slice.actions.deleteManyCurriculums(data));
			return data;
		} catch (error) {
			dispatch(slice.actions.deleteManyCurriculumsError(error));
			throw error.response;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//-----------------------------fetch all curriculums---------------------------------
export function fetchAllCurriculums(userID, token) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		try {
			const response = await axios.get(
				`https://skydiverhino-backend.onrender.com/api/curriculum/${userID}/fetch/all`,
				{
					headers: {
						Authorization: token,
						"Content-Type": "application/json",
					},
				}
			);

			const data = await response.data;
			dispatch(slice.actions.fetchAllCurriculums(data));
			return data;
		} catch (error) {
			dispatch(slice.actions.fetchAllCurriculumsError(error));
			throw error.response;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//-----------------------------fetch single curriculum---------------------------------
export function fetchSingleCurriculum(userID, token, curriculumID) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		try {
			const response = await axios.get(
				`https://skydiverhino-backend.onrender.com/api/curriculum/${userID}/fetch/single/${curriculumID}`,
				{
					headers: {
						Authorization: token,
						"Content-Type": "application/json",
					},
				}
			);

			const data = await response.data;
			dispatch(slice.actions.fetchSingleCurriculum(data));
			return data;
		} catch (error) {
			dispatch(slice.actions.fetchSingleCurriculumError(error));
			throw error.response;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//-----------------------------set curriculum---------------------------------
export function setCurriculum(curriculum) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		try {
			dispatch(slice.actions.setCurriculum(curriculum));
			return curriculum;
		} catch (error) {
			dispatch(slice.actions.setCurriculumError(error));
			throw error.response;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}
