import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";
import { isFile } from "../../utils/is-file";

// ----------------------------------------------------------------------

const initialState = {
	isLoading: false,

	//homepage
	homepage: null,
	homepageError: null,

	//edit
	editHomepage: null,
	editHomepageError: null,

	//fetch homepage
	fetchHomepage: null,
	fetchHomepageError: null,
};

//the slice
const slice = createSlice({
	name: "homepage",
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

		//fetch homepage
		fetchHomepageSuccess(state, action) {
			state.isLoading = false;
			state.fetchHomepage = action.payload;
		},

		fetchHomepageError(state, action) {
			state.isLoading = false;
			state.fetchHomepageError = action.payload;
		},

		//create homepage
		createHomepageSuccess(state, action) {
			state.isLoading = false;
			state.homepage = action.payload;
		},

		createHomepageError(state, action) {
			state.isLoading = false;
			state.homepageError = action.payload;
		},

		//edit homepage
		editHomepageSuccess(state, action) {
			state.isLoading = false;
			state.editHomepage = action.payload;
		},

		editHomepageError(state, action) {
			state.isLoading = false;
			state.editHomepageError = action.payload;
		},
	},
});

// Reducer
export default slice.reducer;

// Actions
export const { startLoading, stopLoading } = slice.actions;

// ----------------------------------------------------------------------

export function fetchHomepage() {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		try {
			const response = await axios.get(
				`https://skydiverhino-backend.onrender.com/api/homepage/fetch`,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			const data = await response.data;
			dispatch(slice.actions.getServiceSuccess(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.fetchHomepageError(error));
			throw error;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

// ----------------------------------------------------------------------
//create homepage
export function createHomepage(userID, token, values) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		try {
			const formData = new FormData();

			//appending non file values

			//banner
			const banner = {
				title: values.bannerTitle,
				subtitle: values.bannerSubtitle,
			}

			formData.append("banner", JSON.stringify(banner));

			//intro
			const intro = {
				title: values.introTitle,
				subtitle: values.introSubtitle,
				description: values.introDescription,
			}

			formData.append("intro", JSON.stringify(intro));

			//tandem
			const tandem = {
				title: values.tandemTitle,
				subtitle: values.tandemSubtitle,
				description: values.tandemDescription,
			}

			formData.append("tandem", JSON.stringify(tandem));

			//aff
			const aff = {
				title: values.affTitle,
				subtitle: values.affSubtitle,
				description: values.affDescription,
			}

			formData.append("aff", JSON.stringify(aff));

			//subscribe
			const subscribe = {
				title: values.subscribeTitle,
				subtitle: values.subscribeSubtitle,
			}

			formData.append("subscribe", JSON.stringify(subscribe));

			//appending file values
			if (isFile(values.bannerImage)) {
				formData.append("bannerImage", values.bannerImage, values.bannerImage.name);
			}

			if (isFile(values.introImage)) {
				formData.append("introImage", values.introImage, values.introImage.name);
			}

			if (isFile(values.tandemImage)) {
				formData.append("tandemImage", values.tandemImage, values.tandemImage.name);
			}

			if (isFile(values.affImage)) {
				formData.append("affImage", values.affImage, values.affImage.name);
			}

			if (isFile(values.subscribeImage)) {
				formData.append("subscribeImage", values.subscribeImage, values.subscribeImage.name);
			}

			//apending multiple files for tandem gallery an aff gallery
			if (values.tandemGallery) {
				for (let i = 0; i < values.tandemGallery.length; i++) {
					formData.append("tandemGallery", values.tandemGallery[i], values.tandemGallery[i].name);
				}
			}

			if (values.affGallery) {
				for (let i = 0; i < values.affGallery.length; i++) {
					formData.append("affGallery", values.affGallery[i], values.affGallery[i].name);
				}
			}

			const response = await axios.post(
				`https://skydiverhino-backend.onrender.com/api/homepage/${userID}/post`,
				values,
				{
					headers: {
						Authorization: token,
					},
				}
			);

			const data = await response.data;
			dispatch(slice.actions.createHomepageSuccess(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.createHomepageError(error));
			throw error;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}


// ----------------------------------------------------------------------
//edit homepage
export function editHomepage(userID, token, values) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		try {
			const formData = new FormData();

			//appending non file values

			//banner
			const banner = {
				title: values.bannerTitle,
				subtitle: values.bannerSubtitle,
			}

			formData.append("banner", JSON.stringify(banner));

			//intro
			const intro = {
				title: values.introTitle,
				subtitle: values.introSubtitle,
				description: values.introDescription,
			}

			formData.append("intro", JSON.stringify(intro));

			//tandem
			const tandem = {
				title: values.tandemTitle,
				subtitle: values.tandemSubtitle,
				description: values.tandemDescription,
			}

			formData.append("tandem", JSON.stringify(tandem));

			//aff
			const aff = {
				title: values.affTitle,
				subtitle: values.affSubtitle,
				description: values.affDescription,
			}

			formData.append("aff", JSON.stringify(aff));

			//subscribe
			const subscribe = {
				title: values.subscribeTitle,
				subtitle: values.subscribeSubtitle,
			}

			formData.append("subscribe", JSON.stringify(subscribe));

			//appending file values
			if (isFile(values.bannerImage)) {
				formData.append("bannerImage", values.bannerImage, values.bannerImage.name);
			}

			if (isFile(values.introImage)) {
				formData.append("introImage", values.introImage, values.introImage.name);
			}

			if (isFile(values.tandemImage)) {
				formData.append("tandemImage", values.tandemImage, values.tandemImage.name);
			}

			if (isFile(values.affImage)) {
				formData.append("affImage", values.affImage, values.affImage.name);
			}

			if (isFile(values.subscribeImage)) {
				formData.append("subscribeImage", values.subscribeImage, values.subscribeImage.name);
			}

			//apending multiple files for tandem gallery an aff gallery
			if (values.tandemGallery) {
				for (let i = 0; i < values.tandemGallery.length; i++) {
					formData.append("tandemGallery", values.tandemGallery[i], values.tandemGallery[i].name);
				}
			}

			if (values.affGallery) {
				for (let i = 0; i < values.affGallery.length; i++) {
					formData.append("affGallery", values.affGallery[i], values.affGallery[i].name);
				}
			}
			const response = await axios.post(
				`https://skydiverhino-backend.onrender.com/api/homepage/${userID}/edit`,
				values,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
				}
			);

			const data = await response.data;
			dispatch(slice.actions.editHomepageSuccess(data));
			return data;

		} catch (error) {
			dispatch(slice.actions.editHomepageError(error));
			throw error;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}
