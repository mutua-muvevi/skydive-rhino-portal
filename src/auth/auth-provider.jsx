import PropTypes from "prop-types";

import { useEffect, useState, createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setSession, jwtDecode } from "./utils";
import { useDispatch } from "../redux/store";
import { fetchMe } from "../redux/slices/user";

export const AuthContext = createContext({
	user: null,
	isAuthenticated: false,
	isSuperAdmin: false,
	logout: () => {},
});

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const navigate = useNavigate();
	const location = useLocation();
	
	const dispatch = useDispatch();

	useEffect(() => {
		const token = localStorage.getItem("token");


		if (token) {
			const decodedToken = jwtDecode(token);
			setUser(decodedToken);
			setSession(token);
			setToken(token);

			console.log("token is", token)
			dispatch(fetchMe(token))

		} else {
			navigate("/auth/login");
		}
	}, [navigate, dispatch]);

	useEffect(() => {
		// const isSuperAdmin = user?.role === "superadmin";
		const isFreelancer = user?.role === "freelancer";
		const isClient = user?.role === "client";

		// if (location.pathname.startsWith("/admin") && !isSuperAdmin) {
		// 	navigate("/admin/freelancer/home");
		// } else
		if (location.pathname.startsWith("/freelancer") && !isFreelancer) {
			navigate("/freelancer/home/main");
		} else if (location.pathname.startsWith("/client") && !isClient) {
			navigate("/client/dashboard");
		}
		// Add more role-based routing as needed
	}, [user, location.pathname, navigate]);

	const logout = () => {
		setSession(null);
		setUser(null);
		navigate("/auth/login");
	};

	const contextValue = {
		user,
		isAuthenticated: !!user,
		isSuperAdmin: user?.role === "superadmin",
		logout,
	};

	return (
		<AuthContext.Provider value={contextValue}>
			{console.log("Token", token)}
			{alert("Auth prrovider")}
			{children}
		</AuthContext.Provider>
	);
};

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
