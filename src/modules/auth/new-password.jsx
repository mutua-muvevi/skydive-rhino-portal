import { useState } from "react";
import { Navigate } from "react-router-dom";

import {
	Alert,
	Box,
	Grid,
	IconButton,
	InputAdornment,
	Stack,
} from "@mui/material";
import { styled } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import { useTheme } from "@mui/styles";

import { Form, Formik } from "formik";
import * as Yup from "yup";

import Textfield from "../../components/form/textfield/textfield";
import Iconify from "../../components/iconify";

import { useDispatch, useSelector } from "../../redux/store";
import { newPassword } from "../../redux/slices/user";

import { PATH_AUTH } from "../../routes/path";


const initialState = {
	password: "",
	confirm_password: "",
};

const newPasswordSchema = Yup.object().shape({
	password: Yup.string().required("Password is required"),
	confirm_password: Yup.string()
		.required("Confirm Password is required")
		.oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const StyledWrapper = styled(Box)(({ theme }) => ({
	backgroundColor: theme.palette.background.default,
	width: "100%",
}));

const NewPassword = () => {
	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("info");

	const [showPassword, setShowPassword] = useState(false);
	const theme = useTheme();

	const dispatch = useDispatch();
	const { resetPassword: { resetToken } } = useSelector((state) => state.user);

	const submitHandler = async (values) => {
		try {
			const response = await dispatch(newPassword(values, resetToken));

			console.log("The response is", response);

			//extract message and success status from the response
			const { success, message } = response.data;

			//set the alert message from the response and determine severity
			setAlertMessage(message);
			setAlertSeverity(success ? "success" : "error");

			// Set a timeout to hide the alert redirect to login
			setTimeout(() => {
				setAlertMessage("");
				return <Navigate to={PATH_AUTH.login} />;
			}, 5000);

		} catch (error) {
			// Handle any errors that may occur during the request
			setAlertMessage(error.data.error || "An error occurred.");
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
				validationSchema={newPasswordSchema}
				onSubmit={submitHandler}
			>
				{({ isSubmitting }) => (
					<Form id="Registration Form">
						<Grid container spacing={3}>
							{alertMessage && (
								<Grid item xs={12} sm={12}>
									<Alert
										severity={alertSeverity}
										sx={{ mb: 2 }}
									>
										<Stack
											direction="row"
											spacing={1}
											textAlign="left"
										>
											{alertMessage}
											{console.log("Alert Message", alertMessage)}
										</Stack>
									</Alert>
								</Grid>
							)}

							<Grid item xs={12} sm={12}>
								<Textfield
									name="password"
									type={showPassword ? "text" : "password"}
									label="Password"
									fullWidth
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													onClick={() =>
														setShowPassword(
															!showPassword
														)
													}
													edge="end"
												>
													{showPassword ? (
														<Iconify icon="icomoon-free:eye" />
													) : (
														<Iconify icon="icomoon-free:eye-blocked" />
													)}
												</IconButton>
											</InputAdornment>
										),
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={12}>
								<Textfield
									name="confirm_password"
									type={showPassword ? "text" : "password"}
									label="Confirm Password"
									fullWidth
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													onClick={() =>
														setShowPassword(
															!showPassword
														)
													}
													edge="end"
												>
													{showPassword ? (
														<Iconify icon="icomoon-free:eye" />
													) : (
														<Iconify icon="icomoon-free:eye-blocked" />
													)}
												</IconButton>
											</InputAdornment>
										),
									}}
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
									Reset password
								</LoadingButton>
							</Grid>
						</Grid>
					</Form>
				)}
			</Formik>
		</StyledWrapper>
	);
};

export default NewPassword;
