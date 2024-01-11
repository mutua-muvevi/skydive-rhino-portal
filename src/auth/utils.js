// routes
import { PATH_AUTH } from "../routes/path";
// utils
import axios from "../utils/axios";

// ----------------------------------------------------------------------

export const jwtDecode = (token) => {
	const base64Url = token.split(".")[1];
	const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
	const jsonPayload = decodeURIComponent(
		window
			.atob(base64)
			.split("")
			.map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
			.join("")
	);

	return JSON.parse(jsonPayload);
};

// ----------------------------------------------------------------------

export const isValidToken = (token) => {
	if (!token) {
		return false;
	}

	const decoded = jwtDecode(token);

	const currentTime = Date.now() / 1000;

	return decoded.exp > currentTime;
};

// ----------------------------------------------------------------------

export const tokenExpired = (exp) => {
	// eslint-disable-next-line prefer-const
	let expiredTimer;

	const currentTime = Date.now();

	// Test token expires after 10s
	// const timeLeft = currentTime + 10000 - currentTime; // ~10s
	const timeLeft = exp * 1000 - currentTime;

	clearTimeout(expiredTimer);

	// expiredTimer = setTimeout(() => {
	// 	alert("Token expired");

	// 	localStorage.removeItem("token");

	// 	window.location.href = PATH_AUTH.login;
	// }, timeLeft);
};

// ----------------------------------------------------------------------

export const setSession = (token) => {
	if (token) {
		localStorage.setItem("token", token);

		axios.defaults.headers.common.Authorization = `Bearer ${token}`;
		console.log("The token is ", token)

		// This function below will handle when token is expired
		const { exp } = jwtDecode(token); // ~3 days by minimals server
		console.log("The jwt item is", jwtDecode(token))
		
		tokenExpired(exp);
		
	} else {
		localStorage.removeItem("token");

		delete axios.defaults.headers.common.Authorization;
	}
};
