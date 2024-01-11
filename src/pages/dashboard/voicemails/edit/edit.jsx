import { useState } from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Textfield from "../../../../components/form/textfield/textfield";
import Iconify from "../../../../components/iconify";

import { useDispatch, useSelector } from "../../../../redux/store";
import { editVoicemail } from "../../../../redux/slices/voicemails";

import { Alert, Stack } from "@mui/material";
import SelectField from "../../../../components/form/select/select";
import { LoadingButton } from "@mui/lab";
import DateField from "../../../../components/form/date/date";

const EditVoicemail = ({ onClose }) => {
	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("info");

	const { setVoicemail: voicemail } = useSelector(
		(state) => state.voicemails
	);
	const { me } = useSelector((state) => state.user);

	const token = localStorage.getItem("token");

	const dispatch = useDispatch();

	const initialValues = {
		name: voicemail ? voicemail.name : "",
		transcription: voicemail ? voicemail.transcription : "",
		type: voicemail ? voicemail.type.name : "",
		date: voicemail ? voicemail.date : "",
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

	//voicemail options
	const typeOptions = [
		{ name: "voicemail", label: "Voicemail" },
		{ name: "call", label: "Call" },
		{ name: "sms", label: "SMS" },
		{ name: "email", label: "Email" },
		{ name: "other", label: "Other" },
	];

	const handleSubmit = async (values, actions) => {
		try {
			const response = await dispatch(
				editVoicemail(me._id, token, values, voicemail._id)
			);
			//extract success message
			const { success, message } = response;

			// Set the alert message from the response and determine severity
			setAlertMessage(message);
			setAlertSeverity(success ? "success" : "error");

			//close the modal
			if (success) {
				setTimeout(() => {
					onClose();

					//reload the page
					window.location.reload();
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
			initialValues={initialValues}
			validationSchema={VoicemailSchema}
			onSubmit={handleSubmit}
		>
			{({ isSubmitting }) => (
				<Form>
					<Stack direction="column" spacing={3} sx={{ pb: 5 }}>
						{alertMessage && (
							<Alert severity={alertSeverity}>
								{alertMessage}
							</Alert>
						)}
						<Textfield name="name" label="Name" />
						<DateField name="date" label="Date" />
						<Textfield
							name="transcription"
							label="Transcription"
							multiline
							rows={4}
						/>
						<SelectField
							name="type"
							label="Type"
							placeholder="Type of communication"
							options={typeOptions}
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

EditVoicemail.propTypes = {
	onClose: PropTypes.func.isRequired,
};

export default EditVoicemail;
