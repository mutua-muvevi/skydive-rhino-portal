import { Alert, Box, Grid, InputAdornment, Stack } from "@mui/material";
import { styled } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import { useTheme } from "@mui/styles";

import { Form, Formik } from "formik";
import * as Yup from "yup";

import Textfield from "../../components/form/textfield/textfield";
import Iconify from "../../components/iconify";

import { useDispatch } from "../../redux/store";
import { resetPassword } from "../../redux/slices/user";
import { useState } from "react";

const initialState = {
	email: "",
};

const forgotPasswordSchema = Yup.object().shape({
	email: Yup.string().required("Email is required").email("Email is invalid"),
});

const StyledWrapper = styled(Box)(({ theme }) => ({
	backgroundColor: theme.palette.background.default,
	width: "100%",
}));

const ResetPassword = () => {
	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("info");

	const theme = useTheme();
	const dispatch = useDispatch();

	const submitHandler = async (values) => {
		try {
			const response = await dispatch(resetPassword(values));
			console.log("The response is", response);

			//extract message and success status from the response
			const { success, message } = response.data;

			//set the alert message from the response and determine severity
			setAlertMessage(message);
			setAlertSeverity(success ? "success" : "error");
		} catch (error) {
			// Handle any errors that may occur during the request
			setAlertMessage(error.message || "An error occurred.");
			setAlertSeverity("error");

			// Set a timeout to hide the alert and reload the page
			setTimeout(() => {
				setAlertMessage("");
			}, 5000);
		}
	};
	return (
		<StyledWrapper>
			<Formik
				initialValues={initialState}
				validationSchema={forgotPasswordSchema}
				onSubmit={submitHandler}
			>
				{({ isSubmitting }) => (
					<Form id="Forgot Password Form">
						<Grid container spacing={3}>

							{alertMessage && (
								<Grid item xs={12} sm={12}>
									<Alert severity={alertSeverity} sx={{ mb: 2 }}>
										<Stack direction="row" spacing={1} textAlign="left">
											{alertMessage}
										</Stack>
									</Alert>
								</Grid>
							)}

							<Grid item xs={12} sm={12}>
								<Textfield
									fullWidth
									label="Email"
									name="email"
									type="email"
									variant="outlined"
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<Iconify icon="mdi:email" />
											</InputAdornment>
										),
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={12}>
								<LoadingButton
									fullWidth
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
									Reset Password
								</LoadingButton>
							</Grid>
						</Grid>
					</Form>
				)}
			</Formik>
		</StyledWrapper>
	);
};

export default ResetPassword;
