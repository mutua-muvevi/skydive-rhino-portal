import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Textfield from "../../../../components/form/textfield/textfield";
import Iconify from "../../../../components/iconify";
import { useDispatch, useSelector } from "../../../../redux/store";
import { addClient } from "../../../../redux/slices/clients";
import { Alert, Stack } from "@mui/material";
import { useState } from "react";
import SelectField from "../../../../components/form/select/select";
import { countries } from "../../../../constants/country";
import { LoadingButton } from "@mui/lab";

const initialState = {
	fullname: "",
	email: "",
	leadSource: "",
	service: "",
	country: "",
	message: "",
	city: "",
};

const ClientSchema = Yup.object().shape({
	fullname: Yup.string()
		.min(5, "Minimum characters required for fullname is 5")
		.required("Fullname is required"),
	email: Yup.string()
		.min(5, "Minimum characters required for email is 5")
		.required("Email is required"),
	leadSource: Yup.string()
		.min(5, "Minimum characters required for Client Source is 5")
		.required("Client source is required"),
	service: Yup.string()
		.min(5, "Minimum characters required for service is 5")
		.required("Service is required"),
	country: Yup.string()
		.min(4, "Minimum characters required for country is 4")
		.required("Country is required"),
	message: Yup.string()
		.min(20, "Minimum characters required for message is 20")
		.required("Message is required"),
	city: Yup.string()
		.min(3, "Minimum characters required for city is 3")
		.required("City is required"),
});

//lead options
const leadSourceOptions = [
	{ name: "Referral", label: "Referral" },
	{ name: "Google", label: "Google" },
	{ name: "Website", label: "Website" },
	{ name: "Facebook", label: "Facebook" },
	{ name: "Instagram", label: "Instagram" },
	{ name: "Tiktok", label: "Tiktok" },
	{ name: "Email", label: "Email" },
	{ name: "Other", label: "Other" },
];

//--------------------------------------------------------------------------
const NewClient = ({ onClose }) => {
	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("info");

	const { services: {data : AllServices} } = useSelector((state) => state.services);
	const { me } = useSelector((state) => state.user);
	const token = localStorage.getItem("token");

	const dispatch = useDispatch();

	//services options
	const serviceOptions = AllServices.map((service) => {
		return {
			name: service._id,
			label: service.name,
		};
	});

	const handleSubmit = async (values, actions) => {
		try {
			const response = await dispatch(addClient(me._id, token, values));
			//extract success message
			const { success, message } = response;

			// Set the alert message from the response and determine severity
			setAlertMessage(message);
			setAlertSeverity(success ? "success" : "error");

			//close the modal
			if (success) {
				setTimeout(() => {
					//reload the page
					window.location.reload();
					onClose();

				}, 2000);
			}
		} catch (error) {
			setAlertMessage(error.error || "An error occurred.");
			setAlertSeverity("error");
		} finally {
			actions.setSubmitting(false);
		}
	};

	return (
		<Formik
			initialValues={initialState}
			validationSchema={ClientSchema}
			onSubmit={handleSubmit}
		>
			{({ isSubmitting }) => (
				<Form>
					<Stack direction="column" spacing={3} sx={{ pb: 5, pt:3 }}>
						{alertMessage && (
							<Alert severity={alertSeverity}>
								{alertMessage}
							</Alert>
						)}
						<Textfield
							name="fullname"
							label="Fullname"
							placeholder="Enter your fullname"
						/>
						<Textfield
							name="email"
							label="Email"
							placeholder="Enter your email"
						/>
						<SelectField
							name="leadSource"
							label="Client Source"
							placeholder="Enter your lead source"
							options={leadSourceOptions}
						/>
						<SelectField
							name="service"
							label="Service"
							placeholder="Enter your service"
							options={serviceOptions}
						/>
						<SelectField
							name="country"
							label="Country"
							placeholder="Enter your country"
							options={countries}
						/>
						<Textfield
							name="city"
							label="City"
							placeholder="Enter your city"
						/>
						<Textfield
							name="message"
							label="Message"
							placeholder="Enter your message"
							multiline
							rows={5}
						/>

						<LoadingButton
							type="submit"
							variant="contained"
							color="primary"
							loading={isSubmitting}
							loadingPosition="start"
							startIcon={<Iconify icon="fluent:save-24-filled" />}
						>
							Submit
						</LoadingButton>
					</Stack>
				</Form>
			)}
		</Formik>
	);
};

NewClient.propTypes = {
	onClose: PropTypes.func.isRequired,
};

export default NewClient;
