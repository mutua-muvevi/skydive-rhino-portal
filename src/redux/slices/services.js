import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";
import { isFile } from "../../utils/is-file";

// ----------------------------------------------------------------------

const initialState = {
	isLoading: false,

	//service
	service: null,
	serviceError: null,

	services: null,
	servicesError: null,

	postService: null,
	postServiceError: null,

	editService: null,
	editServiceError: null,

	deleteService: null,
	deleteServiceError: null,

	deleteManyServices: null,
	deleteManyServicesError: null,
};

//the slice
const slice = createSlice({
	name: "services",
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

		//SET SERVICE
		setService(state, action) {
			state.isLoading = false;
			state.service = action.payload;
		},

		setServiceError(state, action) {
			state.isLoading = false;
			state.serviceError = action.payload;
		},

		//SERVICE
		getServiceSuccess(state, action) {
			state.isLoading = false;
			state.service = action.payload;
		},

		getServiceError(state, action) {
			state.isLoading = false;
			state.serviceError = action.payload;
		},

		//SERVICES
		getServicesSuccess(state, action) {
			state.isLoading = false;
			state.services = action.payload;
		},

		getServicesError(state, action) {
			state.isLoading = false;
			state.servicesError = action.payload;
		},

		//POST SERVICE
		postServiceSuccess(state, action) {
			state.isLoading = false;
			state.postService = action.payload;
		},

		postServiceError(state, action) {
			state.isLoading = false;
			state.postServiceError = action.payload;
		},

		//EDIT SERVICE
		editServiceSuccess(state, action) {
			state.isLoading = false;
			state.editService = action.payload;
		},

		editServiceError(state, action) {
			state.isLoading = false;
			state.editServiceError = action.payload;
		},

		//DELETE SERVICE
		deleteServiceSuccess(state, action) {
			state.isLoading = false;
			state.deleteService = action.payload;
		},

		deleteServiceError(state, action) {
			state.isLoading = false;
			state.deleteServiceError = action.payload;
		},

		//DELETE MANY SERVICES
		deleteManyServicesSuccess(state, action) {
			state.isLoading = false;
			state.deleteManyServices = action.payload;
		},

		deleteManyServicesError(state, action) {
			state.isLoading = false;
			state.deleteManyServicesError = action.payload;
		},
	},
});

// Reducer
export default slice.reducer;

// Actions
export const { startLoading, stopLoading } = slice.actions;

// ----------------------------------------------------------------------

//----------------------------services--------------------------------------------
//SET SERVICE FROM ALL SERVICES
export function setService(service) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			dispatch(slice.actions.setService(service));
		} catch (error) {
			dispatch(slice.actions.getServiceError(error));
			throw error;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//SERVICE
export function fetchSingleService(serviceID) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = await axios.get(
				`https://skydiverhino-backend.onrender.com/api/service/fetch/single/${serviceID}`,
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
			dispatch(slice.actions.getServiceError(error));
			throw error;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//SERVICES
export function fetchAllServices() {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = await axios.get(
				"https://skydiverhino-backend.onrender.com/api/service/fetch/all",
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			const data = await response.data;
			dispatch(slice.actions.getServicesSuccess(data));
			return data;
		} catch (error) {
			dispatch(slice.actions.getServicesError(error));
			throw error;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//POST SERVICE
export function addService(userID, token, values) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {console.log("The items are", values)
			const formData = new FormData();

			// Append non-file fields to FormData
			formData.append("name", values.name);
			formData.append("introDescription", values.introDescription);
			formData.append("slug", values.slug);

			// Append non file array fields to FormData
			formData.append(
				"requirements",
				JSON.stringify(values.requirements)
			);
			formData.append("prices", JSON.stringify(values.prices));
			formData.append("faqs", JSON.stringify(values.faqs));

			// Append thumbnail file to FormData
			if (values.thumbnail) {
				formData.append(
					"thumbnail",
					values.thumbnail,
					values.thumbnail.name
				);
			}

			//Append price image to FormData
			if (values.priceImage) {
				formData.append(
					"priceImage",
					values.priceImage,
					values.priceImage.name
				);
			}

			//Append FAQ image to FormData
			if (values.faqImage) {
				formData.append(
					"faqImage",
					values.faqImage,
					values.faqImage.name
				);
			}

			// Append content block files and contentBlocks to FormData
			if (Array.isArray(values.contentBlocks)) {
				values.contentBlocks.forEach((detail, index) => {
					formData.append(
						`contentBlocks[${index}][title]`,
						detail.title
					);
					formData.append(
						`contentBlocks[${index}][details]`,
						detail.details
					);

					// Append each image with the field name 'image'
					if (detail.image) {
						formData.append(
							`image`,
							detail.image,
							detail.image.name
						);
					}
				});
			}

			//Append gallery array to FormData
			if (Array.isArray(values.gallery)) {
				values.gallery.forEach((image) => {
					formData.append(`gallery`, image, image.name);
				});
			}

			//console log formdata
			for (var pair of formData.entries()) {
				console.log("asxaS", pair[0] + ", " + pair[1]);
			}

			const response = await axios.post(
				`https://skydiverhino-backend.onrender.com/api/service/${userID}/post`,
				formData,
				{
					headers: {
						Authorization: token,
					},
				}
			);

			const data = await response.data;
			dispatch(slice.actions.postServiceSuccess(data));
			return response;
		} catch (error) {
			dispatch(slice.actions.postServiceError(error));
			throw error;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//EDIT SERVICE
export function editService(userID, token, values, serviceID) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const formData = new FormData();
			// Append non-file fields to FormData
			formData.append("name", values.name);
			formData.append("introDescription", values.introDescription);
			formData.append("slug", values.slug);

			// Append non file array fields to FormData
			formData.append(
				"requirements",
				JSON.stringify(values.requirements)
			);
			formData.append("prices", JSON.stringify(values.prices));
			formData.append("faqs", JSON.stringify(values.faqs));

			for (var pair of formData.entries()) {
				console.log("asxaS", pair[0] + ", " + pair[1]);
			}

			// Append thumbnail file to FormData
			if (values.thumbnail) {
				if (isFile(values.thumbnail)) {
					formData.append(
						"thumbnail",
						values.thumbnail,
						values.thumbnail.name
					);
				}
			}
			//Append price image to FormData
			if (values.priceImage) {
				if (isFile(values.priceImage)) {
					formData.append(
						"priceImage",
						values.priceImage,
						values.priceImage.name
					);
				}
			}

			//Append FAQ image to FormData
			if (values.faqImage) {
				if (isFile(values.faqImage)) {
					formData.append(
						"faqImage",
						values.faqImage,
						values.faqImage.name
					);
				}
			}

			// Append content block files and contentBlocks to FormData
			if (Array.isArray(values.contentBlocks)) {
				values.contentBlocks.forEach((detail, index) => {
					formData.append(
						`contentBlocks[${index}][title]`,
						detail.title
					);
					formData.append(
						`contentBlocks[${index}][details]`,
						detail.details
					);

					// Append each image with the field name 'image'
					if (detail.image) {
						if (isFile(detail.image)) {
							formData.append(
								`image`,
								detail.image,
								detail.image.name
							);
						}
					}
				});
			}

			//Append gallery array to FormData
			if (Array.isArray(values.gallery)) {
				values.gallery.forEach((image) => {
					if (isFile(image)) {
						formData.append("gallery", image, image.name);
					}
				});
			}
console.log("formdata", userID, token, values, serviceID)
			const response = await axios.put(
				`https://skydiverhino-backend.onrender.com/api/service/${userID}/edit/${serviceID}`,
				formData,
				{
					headers: {
						Authorization: token,
					},
				}
			);

			const data = await response.data;
			dispatch(slice.actions.editServiceSuccess(data));
			return data;
		} catch (error) {
			console.log("Error in editService:", error);
			dispatch(slice.actions.editServiceError(error));
			throw error;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//DELETE SERVICE
export function deleteService(userID, token, serviceID) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		try {
			const response = await axios.delete(
				`https://skydiverhino-backend.onrender.com/api/service/${userID}/delete/single/${serviceID}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
				}
			);

			const data = await response.data;
			dispatch(slice.actions.deleteServiceSuccess(data));
			return data;
		} catch (error) {
			dispatch(slice.actions.deleteServiceError(error));
			throw error;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//DELETE MANY SERVICES
export function deleteManyServices(userID, token, serviceID) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = await axios.delete(
				`https://skydiverhino-backend.onrender.com/api/service/${userID}/delete/many/${serviceID}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
				}
			);

			const data = await response.data;
			dispatch(slice.actions.deleteManyServicesSuccess(response));
			return data;
		} catch (error) {
			dispatch(slice.actions.deleteManyServicesError(error));
			throw error;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//----------------------------end of services--------------------------------------------

//----------------------------details--------------------------------------------

//POST DETAIL
export function postDetail(userID, values, token, serviceID) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		try {
			const response = await axios.put(
				`https://skydiverhino-backend.onrender.com/api/service/${userID}/${serviceID}/details/add`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
				}
			);
			const data = await response.data;

			dispatch(slice.actions.postDetailSuccess(data));
		} catch (error) {
			dispatch(slice.actions.postDetailError(error));
			throw error;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//EDIT DETAIL
export function editDetail(userID, values, token, serviceID, detailID) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		try {
			const response = await axios.put(
				`https://skydiverhino-backend.onrender.com/api/service/${userID}/${serviceID}/details/edit/${detailID}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
				}
			);
			const data = await response.data;

			dispatch(slice.actions.editDetailSuccess(data));
		} catch (error) {
			dispatch(slice.actions.editDetailError(error));
			throw error;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//DELETE DETAIL
export function deleteDetail(userID, token, serviceID, detailID) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		try {
			const response = await axios.delete(
				`https://skydiverhino-backend.onrender.com/api/service/${userID}/${serviceID}/details/delete/single/${detailID}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
				}
			);
			const data = await response.data;

			dispatch(slice.actions.deleteDetailSuccess(data));
		} catch (error) {
			dispatch(slice.actions.deleteDetailError(error));
			throw error;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//DELETE MANY DETAILS
export function deleteManyDetails(userID, token, serviceID, detailID) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = await axios.delete(
				`https://skydiverhino-backend.onrender.com/api/service/${userID}/${serviceID}/details/delete/many/${detailID}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
				}
			);

			const data = await response.data;
			dispatch(slice.actions.deleteManyDetailsSuccess(response));
			return data;
		} catch (error) {
			dispatch(slice.actions.deleteManyDetailsError(error));
			throw error;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//----------------------------end of details--------------------------------------------

//----------------------------prices--------------------------------------------

//POST PRICE
export function postPrice(userID, values, token, serviceID) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		try {
			const response = await axios.put(
				`https://skydiverhino-backend.onrender.com/api/service/${userID}/${serviceID}/price/add`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
				}
			);
			const data = await response.data;

			dispatch(slice.actions.postPriceSuccess(data));
		} catch (error) {
			dispatch(slice.actions.postPriceError(error));
			throw error;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//EDIT PRICE
export function editPrice(userID, values, token, serviceID, priceID) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = await axios.put(
				`https://skydiverhino-backend.onrender.com/api/service/${userID}/${serviceID}/price/edit/${priceID}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
				}
			);
			const data = await response.data;

			dispatch(slice.actions.editPriceSuccess(data));
		} catch (error) {
			dispatch(slice.actions.editPriceError(error));
			throw error;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//DELETE PRICE
export function deletePrice(userID, values, token, serviceID, priceID) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		try {
			const response = await axios.delete(
				`https://skydiverhino-backend.onrender.com/api/service/${userID}/${serviceID}/price/delete/single/${priceID}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
				}
			);
			const data = await response.data;

			dispatch(slice.actions.deletePriceSuccess(data));
		} catch (error) {
			dispatch(slice.actions.deletePriceError(error));
			throw error;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//DELETE MANY PRICES
export function deleteManyPrices(userID, values, token, serviceID, priceID) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = await axios.delete(
				`https://skydiverhino-backend.onrender.com/api/service/${userID}/${serviceID}/price/delete/many/${priceID}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
				}
			);

			const data = await response.data;
			dispatch(slice.actions.deleteManyPricesSuccess(response));
			return data;
		} catch (error) {
			dispatch(slice.actions.deleteManyPricesError(error));
			throw error;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//----------------------------end of prices--------------------------------------------

//----------------------------faq--------------------------------------------
//POST FAQ
export function postFaq(userID, values, token, serviceID) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		try {
			const response = await axios.put(
				`https://skydiverhino-backend.onrender.com/api/service/${userID}/${serviceID}/faq/add`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
				}
			);
			const data = await response.data;

			dispatch(slice.actions.postFaqSuccess(data));
		} catch (error) {
			dispatch(slice.actions.postFaqError(error));
			throw error;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//EDIT FAQ
export function editFaq(userID, values, token, serviceID, faqID) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		try {
			const response = await axios.put(
				`https://skydiverhino-backend.onrender.com/api/service/${userID}/${serviceID}/faq/edit/${faqID}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
				}
			);
			const data = await response.data;

			dispatch(slice.actions.editFaqSuccess(data));
		} catch (error) {
			dispatch(slice.actions.editFaqError(error));
			throw error;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//DELETE FAQ
export function deleteFaq(userID, values, token, serviceID, faqID) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		try {
			const response = await axios.delete(
				`https://skydiverhino-backend.onrender.com/api/service/${userID}/${serviceID}/faq/delete/single/${faqID}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
				}
			);
			const data = await response.data;

			dispatch(slice.actions.deleteFaqSuccess(data));
		} catch (error) {
			dispatch(slice.actions.deleteFaqError(error));
			throw error;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//DELETE MANY FAQS
export function deleteManyFaqs(userID, values, token, serviceID, faqID) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = await axios.delete(
				`https://skydiverhino-backend.onrender.com/api/service/${userID}/${serviceID}/faq/delete/many/${faqID}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
				}
			);

			const data = await response.data;
			dispatch(slice.actions.deleteManyFaqsSuccess(response));
			return data;
		} catch (error) {
			dispatch(slice.actions.deleteManyFaqsError(error));
			throw error;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//----------------------------end of faq--------------------------------------------

//----------------------------requirements--------------------------------------------

//POST REQUIREMENTS
export function postRequirements(userID, values, token, serviceID) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		try {
			const response = await axios.put(
				`https://skydiverhino-backend.onrender.com/api/service/${userID}/${serviceID}/requirements/add`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
				}
			);
			const data = await response.data;

			dispatch(slice.actions.postRequirementsSuccess(data));
		} catch (error) {
			dispatch(slice.actions.postRequirementsError(error));
			throw error;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//EDIT REQUIREMENTS
export function editRequirements(
	userID,
	values,
	token,
	serviceID,
	requirementsID
) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		try {
			const response = await axios.put(
				`https://skydiverhino-backend.onrender.com/api/service/${userID}/${serviceID}/requirements/edit/${requirementsID}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
				}
			);
			const data = await response.data;

			dispatch(slice.actions.editRequirementsSuccess(data));
		} catch (error) {
			dispatch(slice.actions.editRequirementsError(error));
			throw error;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//DELETE REQUIREMENTS
export function deleteRequirements(
	userID,
	values,
	token,
	serviceID,
	requirementsID
) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		try {
			const response = await axios.delete(
				`https://skydiverhino-backend.onrender.com/api/service/${userID}/${serviceID}/requirements/delete/single/${requirementsID}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
				}
			);
			const data = await response.data;

			dispatch(slice.actions.deleteRequirementsSuccess(data));
		} catch (error) {
			dispatch(slice.actions.deleteRequirementsError(error));
			throw error;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}

//DELETE MANY REQUIREMENTS
export function deleteManyRequirements(
	userID,
	values,
	token,
	serviceID,
	requirementsID
) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = await axios.delete(
				`https://skydiverhino-backend.onrender.com/api/service/${userID}/${serviceID}/requirements/delete/many/${requirementsID}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
				}
			);

			const data = await response.data;
			dispatch(slice.actions.deleteManyRequirementsSuccess(response));
			return data;
		} catch (error) {
			dispatch(slice.actions.deleteManyRequirementsError(error));
			throw error;
		} finally {
			dispatch(slice.actions.stopLoading());
		}
	};
}
