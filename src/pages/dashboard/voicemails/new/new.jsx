import { useState } from "react";
import { Stack, Alert, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "../../../../redux/store";
import { addVoicemail } from "../../../../redux/slices/voicemails";
import Textfield from "../../../../components/form/textfield/textfield";
import { LoadingButton } from "@mui/lab";
import SelectField from "../../../../components/form/select/select";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import DateField from "../../../../components/form/date/date";

const initialValues = {
	name: "",
	transcription: "",
	type: "",
	date: "",
};

const VoicemailSchema = Yup.object().shape({
	name: Yup.string()
		.min(4, "Minimum characters required is 4")
		.required("Title is required"),
	transcription: Yup.string()
		.min(20, "Minimum characters required is 20")
		.required("Description is required"),
	type: Yup.string().required("Type is required"),
	date: Yup.string().required("Date is required"),
});

const typeOptions = [
	{ name: "voicemail", label: "Voicemail" },
	{ name: "call", label: "Call" },
	{ name: "sms", label: "SMS" },
	{ name: "email", label: "Email" },
	{ name: "other", label: "Other" },
];

const NewVoicemail = () => {
	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("info");

	const {
		me: { _id: userID },
	} = useSelector((state) => state.user);

	const token = localStorage.getItem("token");

	const dispatch = useDispatch();

	const theme = useTheme();

	const handleMakeVoicemail = async (values) => {
		try {
			const response = await dispatch(
				addVoicemail(userID, token, values)
			);

			//extract success message
			const { success, message } = response;

			// Set the alert message from the response and determine severity
			setAlertMessage(message);
			setAlertSeverity(success ? "success" : "error");

			//close the modal
			if (success) {
				setTimeout(() => {
					window.location.reload();
				}, 2000);
			}
		} catch (error) {
			setAlertMessage(error.error || "An error occurred.");
			setAlertSeverity("error");
		}
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={VoicemailSchema}
			onSubmit={handleMakeVoicemail}
		>
			{({ isSubmitting }) => (
				<Form>
					<Stack direction="column" spacing={3} sx={{ pt: 3, pr: 3, pb:3 }}>
						{alertMessage && (
							<Alert severity={alertSeverity}>
								{alertMessage}
							</Alert>
						)}
						<Textfield name="name" label="Name" size="small" />
						<DateField name="date" label="Date" size="small" />
						<Textfield
							name="transcription"
							label="Transcription"
							size="small"
							multiline
							rows={4}
						/>
						<SelectField
							name="type"
							label="Type"
							placeholder="Type of communication"
							size="small"
							options={typeOptions}
						/>
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
									bgcolor: theme.palette.primary.darker,
									color: (theme) =>
										theme.palette.mode === "light"
											? "common.white"
											: "grey.800",
								},
							}}
						>
							Make an Voicemail
						</LoadingButton>
					</Stack>
				</Form>
			)}
		</Formik>
	);
};

export default NewVoicemail;
