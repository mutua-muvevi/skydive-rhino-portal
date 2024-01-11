import { useState } from "react";

import { Alert, Grid, Stack } from "@mui/material";
import { styled } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import { useTheme } from "@mui/styles";

import { Form, Formik } from "formik";
import * as Yup from "yup";

import OTPField from "../../components/form/otp/otp";

//redux
import { postOTPCode } from "../../redux/slices/user";
import { useDispatch, useSelector } from "../../redux/store";

const initialState = {
	otp: "",
};

const otpSchema = Yup.object().shape({
	otp: Yup.string()
		.min(6, "All characters are required")
		.required("OTP is required"),
});

const StyledWrapper = styled(Stack)(({ theme }) => ({
	backgroundColor: theme.palette.background.default,
	width: "100%",
}));

const AuthOtpCodeForm = () => {
	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("info");

	const theme = useTheme();

	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user);

	const userID = user ? user._id: "";

	const token = localStorage.getItem("token");

	const submitHandler = async (values) => {
		try {
			const postOTP = await dispatch(postOTPCode(userID, values, token));

			// Extract message and success status from the response
			const { success, message } = postOTP.data;

			// Set the alert message from the response and determine severity
			setAlertMessage(message);
			setAlertSeverity(success ? "success" : "error");
			
		} catch (error) {
			// Handle any errors that may occur during the request
			setAlertMessage(error.response.data.error || "An error occurred.");
			setAlertSeverity("error");
		}
	};
	return (
		<StyledWrapper direction="column" spacing={3}>
			{alertMessage && (
				<Alert severity={alertSeverity} sx={{ mb: 2 }}>
					{alertMessage}
				</Alert>
			)}
				
			<Formik
				initialValues={initialState}
				validationSchema={otpSchema}
				onSubmit={submitHandler}
			>
				{({ isSubmitting }) => (
					<Form id="OTP Code Form">
						<Grid container spacing={3}>
							<Grid item xs={12} sm={12}>
								<OTPField
									name="otp"
									label="OTP"
									fullWidth
									variant="outlined"
								/>
							</Grid>
							<Grid item xs={12} sm={12}>
								<LoadingButton
									fullWidth
									color="primary"
									size="large"
									type="submit"
									variant="contained"
									loading={isSubmitting}
									sx={{
										color: (theme) =>
											theme.palette.mode === "light"
												? "common.white"
												: "grey.800",
										"&:hover": {
											bgcolor:
												theme.palette.primary.darker,
											color: (theme) =>
												theme.palette.mode === "light"
													? "common.white"
													: "grey.800",
										},
									}}
								>
									Submit
								</LoadingButton>
							</Grid>
						</Grid>
					</Form>
				)}
			</Formik>
		</StyledWrapper>
	);
};

export default AuthOtpCodeForm;
