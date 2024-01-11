import { useState } from "react";

import { Alert, Box, IconButton, InputAdornment, Stack } from "@mui/material";
import { styled } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import { useTheme } from "@mui/styles";

import { Form, Formik } from "formik";
import * as Yup from "yup";

import Textfield from "../../components/form/textfield/textfield";
import Iconify from "../../components/iconify";
import { useAuthContext } from "../../auth/use-auth-context";

const initialState = {
	email: "",
	password: "",
};

const loginSchema = Yup.object().shape({
	email: Yup.string().required("Email is required").email("Email is invalid"),
	password: Yup.string().required("Password is required"),
});

const StyledWrapper = styled(Box)(({ theme }) => ({
	backgroundColor: theme.palette.background.default,
	width: "100%",
}));

const LoginForm = () => {
	const [showPassword, setShowPassword] = useState(false);

	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("info");

	const theme = useTheme();
	const { login } = useAuthContext();

	const submitHandler = async (values) => {
		try {
			const response = await login(values.email, values.password);

			// Extract message and success status from the response
			const { success, message } = response.data;

			// Set the alert message from the response and determine severity
			setAlertMessage(message);
			setAlertSeverity(success ? "success" : "error");
		} catch (error) {
			setAlertMessage(error.error || "An error occurred.");
			setAlertSeverity("error");
		}
	};
	return (
		<StyledWrapper>
			<Formik
				initialValues={initialState}
				validationSchema={loginSchema}
				onSubmit={submitHandler}
			>
				{({ isSubmitting }) => (
					<Form id="Login Form">

						<Stack direction="column" spacing={3}>

							{alertMessage && (
								<Alert severity={alertSeverity} sx={{ mb: 2 }}>
									{alertMessage}
								</Alert>
							)}

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
										bgcolor: theme.palette.primary.darker,
										color: (theme) =>
											theme.palette.mode === "light"
												? "common.white"
												: "grey.800",
									},
								}}
							>
								Login
							</LoadingButton>
						</Stack>
					</Form>
				)}
			</Formik>
		</StyledWrapper>
	);
};

export default LoginForm;
