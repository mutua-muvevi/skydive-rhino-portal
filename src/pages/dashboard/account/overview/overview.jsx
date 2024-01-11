import { Page } from "../../../../components/page";
import { PATH_DASHBOARD } from "../../../../routes/path";

import CustomBreadcrumbs from "../../../../components/custom-breadcrumbs";
import { useSelector, useDispatch } from "../../../../redux/store";

import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
	Alert,
	Box,
	Grid,
	InputAdornment,
	Stack,
	useTheme,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Textfield from "../../../../components/form/textfield/textfield";
import Iconify from "../../../../components/iconify";
import SelectField from "../../../../components/form/select/select";
import { countries } from "../../../../constants/country";
import { editUser } from "../../../../redux/slices/user";
import { useState } from "react";
import { sentenceCase } from "change-case";

//validation schema
const editUserSchema = Yup.object().shape({
	fullname: Yup.string().required("Fullname is required"),
	email: Yup.string().required("Email is required").email("Email is invalid"),
	city: Yup.string().required("City is required"),
	country: Yup.string().required("Country is required"),
	role: Yup.string().required("Role is required"),
	telephone: Yup.string().required("Telephone is required"),
});

const AccountOverview = () => {
	const { me } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("info");

	const token = localStorage.getItem("token");

	const theme = useTheme();

	const initialState = {
		_id: me ? me._id : "",
		fullname: me ? me.fullname : "",
		email: me ? me.email : "",
		city: me ? me.city : "",
		country: me ? me.country : "",
		role: me ? me.role : "",
		telephone: me ? me.telephone : "",
	};

	const submitHandler = async (values, { resetForm, setErrors }) => {
		try {
			const response = await dispatch(editUser(values, token, me._id));

			// Extract message and success status from the response
			const { success, message } = response.data;

			// Set the alert message from the response and determine severity
			setAlertMessage(message);
			setAlertSeverity(success ? "success" : "error");

			resetForm();

			setTimeout(() => window.location.reload(), 5000);
		} catch (error) {
			if (error && error.errors) {
				setErrors(error.errors);
			}

			setAlertMessage(error.error || "An error occurred.");
			setAlertSeverity("error");

			setTimeout(() => resetForm(), 2000);
		}
	};

	return (
		<Page title="Account Overview">
			<CustomBreadcrumbs
				heading="My Account"
				links={[
					{
						name: "Dashboard",
						href: PATH_DASHBOARD.general.home,
					},
					{ name: "Profile" },
				]}
			/>
			<Formik
				initialValues={initialState}
				validationSchema={editUserSchema}
				onSubmit={submitHandler}
			>
				{({ isSubmitting }) => (
					<Form id="Edit User Form">
						<Grid container spacing={3}>
							<Grid item xs={12}>
								{alertMessage && (
									<Alert
										severity={alertSeverity}
										sx={{ mb: 2 }}
									>
										{alertMessage}
									</Alert>
								)}
								<Box
									rowGap={3}
									columnGap={2}
									display="grid"
									gridTemplateColumns={{
										xs: "repeat(1, 1fr)",
										sm: "repeat(2, 1fr)",
									}}
								>
									<Textfield
										fullWidth
										label="Full Name"
										name="fullname"
										type="text"
										variant="outlined"
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<Iconify icon="mingcute:user-4-fill" />
												</InputAdornment>
											),
										}}
									/>

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
										fullWidth
										label="Telephone"
										name="telephone"
										type="text"
										variant="outlined"
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<Iconify icon="formkit:telephone" />
												</InputAdornment>
											),
										}}
									/>

									<Textfield
										fullWidth
										label="City"
										name="city"
										type="text"
										variant="outlined"
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<Iconify icon="solar:city-bold" />
												</InputAdornment>
											),
										}}
									/>

									<SelectField
										fullWidth
										label="Country"
										name="country"
										type="text"
										variant="outlined"
										options={countries}
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<Iconify icon="carbon:location-filled" />
												</InputAdornment>
											),
										}}
										defaultValue={me && me.country ? sentenceCase(me.country) : ""}
									/>

									<Textfield
										fullWidth
										label="Role"
										name="role"
										type="text"
										variant="outlined"
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<Iconify icon="eos-icons:admin" />
												</InputAdornment>
											),
										}}
									/>
								</Box>

								<Stack alignItems="flex-end" sx={{ mt: 3 }}>
									<LoadingButton
										color="primary"
										size="large"
										type="submit"
										variant="contained"
										loading={isSubmitting}
										endIcon={
											<Iconify icon="fa-solid:check" />
										}
										sx={{
											color: (theme) =>
												theme.palette.mode === "light"
													? "common.white"
													: "grey.800",
											"&:hover": {
												bgcolor:
													theme.palette.primary
														.darker,
												color: (theme) =>
													theme.palette.mode ===
													"light"
														? "common.white"
														: "grey.800",
											},
										}}
									>
										Save Changes
									</LoadingButton>
								</Stack>
							</Grid>
						</Grid>
					</Form>
				)}
			</Formik>
		</Page>
	);
};

export default AccountOverview;
