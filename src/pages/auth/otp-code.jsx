import { useState } from "react";

import { Helmet } from "react-helmet-async";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { Alert, Button, Link, Stack, Typography } from "@mui/material";
// routes
import { PATH_AUTH } from "../../routes/path";
// components
import Iconify from "../../components/iconify";
// sections
import AuthOtpCodeForm from "../../modules/auth/otp-code-form";
// assets
import { SentIcon } from "../../assets/icons";
//redux
import { useDispatch, useSelector } from "../../redux/store";
import { resendOTPCode } from "../../redux/slices/user";

// ----------------------------------------------------------------------

export default function OTPCode() {
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("info");

	const userID = user ? user._id : "";
	const token = localStorage.getItem("token");

	const submitHandler = async () => {
		try {
			const postResendOTP = await dispatch(resendOTPCode(userID, token));

			// Extract message and success status from the response
			const { success, message } = postResendOTP.data;

			// Set the alert message from the response and determine severity
			setAlertMessage(message);
			setAlertSeverity(success ? "success" : "error");

			// Set a timeout to hide the alert and reload the page
			setTimeout(() => {
				setAlertMessage("");
				window.location.reload();
			}, 5000);
		} catch (error) {
			// Handle any errors that may occur during the request
			setAlertMessage(error.message || "An error occurred.");
			setAlertSeverity("error");

			// Set a timeout to hide the alert and reload the page
			setTimeout(() => {
				setAlertMessage("");
				window.location.reload();
			}, 5000);
		}
	};

	return (
		<>
			<Helmet>
				<title> New Password | Skydive Rhino Kenya</title>
			</Helmet>

			<SentIcon sx={{ mb: 5, height: 96 }} />

			<Typography variant="h3" paragraph>
				Verification Code
			</Typography>

			<Typography variant="body1" sx={{ color: "text.secondary", mb: 5 }}>
				We&apos;ve sent a 6-digit confirmation email to your email.
				<br />
				Please enter the code in below box to verify your email.
			</Typography>

			<Stack direction="column" spacing={3}>
				{alertMessage && (
					<Alert severity={alertSeverity} sx={{ mb: 2 }}>
						{alertMessage}
					</Alert>
				)}

				<AuthOtpCodeForm />
			</Stack>

			<Typography variant="body2" sx={{ my: 3 }}>
				Don’t have a code? &nbsp;
				<Button variant="text" color="primary" onClick={submitHandler}>
					Resend code
				</Button>
			</Typography>

			<Link
				component={RouterLink}
				to={PATH_AUTH.login}
				color="inherit"
				variant="subtitle2"
				sx={{
					mx: "auto",
					alignItems: "center",
					display: "inline-flex",
				}}
			>
				<Iconify icon="eva:chevron-left-fill" width={16} />
				Return to sign in
			</Link>
		</>
	);
}
