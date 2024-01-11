import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "axios";

// ----------------------------------------------------------------------

const initialState = {
	isLoading: false,

	user: null,
	userError: null,

	me: null,
	meError: null,

	otp: null,
	otpError: null,

	register: null,
	registerError: null,

	login: null,
	loginError: null,

	resetPassword: null,
	resetPasswordError: null,

	newPassword: null,
	newPasswordError: null,

	editUser: null,
	editUserError: null,
};

// user slice
const slice = createSlice({
	name: "user",
	initialState,
	reducers: {
		//start loading
		startLoading(state) {
			state.isLoading = true;
		},

		// fetchme has error
		hasError(state, action) {
			state.isLoading = false;
			state.userError = action.payload;
		},

		// fetch me
		fetchMe(state, action) {
			const me = action.payload;
			state.isLoading = false;
			state.me = me;
		},

		//fetch me has error
		fetchMeHasError(state, action) {
			state.isLoading = false;
			state.meError = action.payload;
		},

		//register
		register(state, action) {
			const register = action.payload;
			state.isLoading = false;
			state.register = register;
		},

		//register has error
		registerHasError(state, action) {
			state.isLoading = false;
			state.registerError = action.payload;
		},

		//otp
		postOTPCode(state, action) {
			const otp = action.payload;
			state.isLoading = false;
			state.otp = otp;
		},

		//otp has error
		postOTPCodeHasError(state, action) {
			state.isLoading = false;
			state.otpError = action.payload;
		},

		//resend otp
		resendOTPCode(state, action) {
			const otp = action.payload;
			state.isLoading = false;
			state.otp = otp;
		},

		//resend otp has error
		resendOTPCodeHasError(state, action) {
			state.isLoading = false;
			state.otpError = action.payload;
		},

		//login
		loginUser(state, action) {
			const login = action.payload;
			state.isLoading = false;
			state.login = login;
		},

		//login has error
		loginHasError(state, action) {
			state.isLoading = false;
			state.loginError = action.payload;
		},

		//reset password
		resetPassword(state, action) {
			state.isLoading = false;
			state.resetPassword = action.payload;
		},

		//reset password has error
		resetPasswordHasError(state, action) {
			state.isLoading = false;
			state.resetPasswordError = action.payload;
		},

		//new password
		newPassword(state, action) {
			const newPassword = action.payload;
			state.isLoading = false;
			state.newPassword = newPassword;
		},

		//new password has error
		newPasswordHasError(state, action) {
			state.isLoading = false;
			state.newPasswordError = action.payload;
		},

		//edit
		editUser(state, action) {
			const user = action.payload;
			state.isLoading = false;
			state.editUser = user;
		},

		//edit has error
		editUserHasError(state, action) {
			state.isLoading = false;
			state.editUserError = action.payload;
		},
	},
});

// Reducer
export default slice.reducer;

// Functions
// -------------------------------------------------------------
//------------fetch me
export function fetchMe(token) {
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());
		
		try {
			const response = await axios.get("https://skydiverhino-backend.onrender.com/api/user/fetch/me", {
				headers: {
					Authorization: token,
				},
			});
			
			dispatch(slice.actions.fetchMe(response.data.data));
			return response.data.data;
		} catch (error) {
			dispatch(slice.actions.fetchMeHasError(error));
			throw error.response;
		}
	};
}

//-----------register
export function register(values){
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = await axios.post(
				"https://skydiverhino-backend.onrender.com/api/user/register",
				values,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			dispatch(slice.actions.register(response.data));
			return response;
		} catch (error) {
			dispatch(slice.actions.registerHasError(error.response));
			throw error.response
		}
	}
}
//-----------------otp
export function postOTPCode(userID, values, token){
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = axios.post(
				`https://skydiverhino-backend.onrender.com/api/user/${userID}/otp`,
				values,
				{
					headers: {
						"Content-Type": "application/json",
						"Authorization": token
					},
				
				}
			);

			dispatch(slice.actions.postOTPCode(response.data));
			return response;

		} catch (error) {
			dispatch(slice.actions.postOTPCodeHasError(error.response));
			throw error.response
		}
	}
}

//----------------resend otp
export function resendOTPCode(userID, token){
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = await axios.get(
				`https://skydiverhino-backend.onrender.com/api/user/${userID}/otp/resend`,
				{
					headers: {
						"Content-Type": "application/json",
						"Authorization": token
					},
				
				}
			);
			
			dispatch(slice.actions.resendOTPCode(response.data));
			return response;

		} catch (error) {
			dispatch(slice.actions.resendOTPCodeHasError(error.response));
			throw error.response
		}
	}
}

//------------login
export function loginUser(values){
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = await axios.post(
				"https://skydiverhino-backend.onrender.com/api/user/login",
				values,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			console.log("user login response", response)
			dispatch(slice.actions.loginUser(response.data));
			return response;

		} catch (error) {
			dispatch(slice.actions.loginHasError(error.response));
			throw error.response
		}
	}
}

//------------reset password
export function resetPassword(values){
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = await axios.post(
				"https://skydiverhino-backend.onrender.com/api/user/reset/password",
				values,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			console.log("user reset password response", response)
			dispatch(slice.actions.resetPassword(response.data));
			return response;

		} catch (error) {
			dispatch(slice.actions.resetPasswordHasError(error.response));
			throw error.response
		}
	}
}

//------------new password
export function newPassword(values, resetToken){
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = await axios.post(
				`https://skydiverhino-backend.onrender.com/api/user/new/password/${resetToken}`,
				values,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			console.log("user new password response", response)
			dispatch(slice.actions.newPassword(response.data));
			return response;

		} catch (error) {
			dispatch(slice.actions.newPasswordHasError(error.response));
			throw error.response
		}
	}
}

//------------edit user
export function editUser(values, token, userID){
	return async (dispatch) => {
		dispatch(slice.actions.startLoading());

		try {
			const response = await axios.put(
				`https://skydiverhino-backend.onrender.com/api/user/edit/me/${userID}`,
				values,
				{
					headers: {
						"Content-Type": "application/json",
						"Authorization": token
					},
				}
			);

			console.log("user edit response", response)
			dispatch(slice.actions.editUser(response.data));
			return response;

		} catch (error) {
			dispatch(slice.actions.editUserHasError(error.response));
			throw error.response
		}
	}
}