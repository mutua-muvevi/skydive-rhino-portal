import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
// routes
import { PATH_AUTH } from "../routes/path";
// components
import LoadingScreen from "../components/loading-screen";
//
import { useAuthContext } from "./use-auth-context";

// ----------------------------------------------------------------------

OTPGuard.propTypes = {
	children: PropTypes.node,
};

export default function OTPGuard({ children }) {
	const { isAuthenticated, isInitialized } = useAuthContext();
	

	if (isAuthenticated) {
		return <Navigate to={PATH_AUTH.otp} />;
	}

	if (!isInitialized) {
		return <LoadingScreen />;
	}

	return <> {children} </>;
}
