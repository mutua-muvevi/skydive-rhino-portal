import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Textfield from "../../../../components/form/textfield/textfield";
import Iconify from "../../../../components/iconify";

import { useDispatch, useSelector } from "../../../../redux/store";
import { editEvent } from "../../../../redux/slices/events";

import { Alert, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Upload } from "../../../../components/upload";
import DateField from "../../../../components/form/date/date";


//------------------------ || EDIT MANUAL || -------------------------//

const EditEvent = ({ onClose }) => {
	const { setEvent: event } = useSelector((state) => state.events);
	const { me } = useSelector((state) => state.user);

	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("info");
	const [thumbnail, setThumbnail] = useState(
		event && event.thumbnail ? event.thumbnail : null
	);

	const token = localStorage.getItem("token");

	const dispatch = useDispatch();

	const initialValues = {
		name: event ? event.name : "",
		description: event ? event.description : "",
		date: event ? event.date : "",
		venue: event ? event.venue : "",
	};

	const EventSchema = Yup.object().shape({
		name: Yup.string()
			.min(5, "Minimum characters required is 5")
			.required("Title is required"),
		description: Yup.string()
			.min(5, "Minimum characters required is 5")
			.required("Description is required"),
		date: Yup.string().required("Date is required"),
		venue: Yup.string().required("Venue is required"),
	});

	const handleThumbnailChange = useCallback(
		(acceptedFiles, setFieldValue) => {
			const newFile = acceptedFiles[0];
			if (newFile) {
				const thumbnailUrl = URL.createObjectURL(newFile);
				setThumbnail(thumbnailUrl);
				setFieldValue("thumbnail", newFile);
			}
		},
		[]
	);

	const handleSubmit = async (values, actions) => {
		try {
			const response = await dispatch(
				editEvent(me._id, token, values, event._id)
			);
			//extract success message
			const { success, message } = response;

			// Set the alert message from the response and deeventine severity
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
			validationSchema={EventSchema}
			onSubmit={handleSubmit}
		>
			{({ setFieldValue, isSubmitting }) => (
				<Form>
					<Stack direction="column" spacing={3} sx={{ pb: 3, pr: 2 }}>
						{alertMessage && (
							<Alert severity={alertSeverity} sx={{ mb: 2 }}>
								{alertMessage}
							</Alert>
						)}
						<Textfield name="name" label="Name" />

						<Textfield
							name="description"
							label="Description"
							multiline
							rows={5}
						/>

						<DateField name="date" label="Date" />

						<Textfield name="venue" label="Venue" />

						<Upload
							name="thumbnail"
							file={thumbnail}
							onDrop={(acceptedFiles) =>
								handleThumbnailChange(
									acceptedFiles,
									setFieldValue
								)
							}
						/>

						<LoadingButton
							type="submit"
							variant="contained"
							color="primary"
							loading={isSubmitting}
							loadingPosition="start"
							startIcon={<Iconify icon="mdi:content-save" />}
						>
							Save
						</LoadingButton>
					</Stack>
				</Form>
			)}
		</Formik>
	);
};

EditEvent.propTypes = {
	onClose: PropTypes.func,
};

export default EditEvent;
