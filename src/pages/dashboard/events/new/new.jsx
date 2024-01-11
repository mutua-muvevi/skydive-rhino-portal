import { useState, useCallback } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Textfield from "../../../../components/form/textfield/textfield";
import DateField from "../../../../components/form/date/date";

import { useDispatch, useSelector } from "../../../../redux/store";
import { addEvent } from "../../../../redux/slices/events";
import { Alert, Stack } from "@mui/material";
import { Upload } from "../../../../components/upload";
import Iconify from "../../../../components/iconify";
import { LoadingButton } from "@mui/lab";

const initialValues = {
	name: "",
	description: "",
	date: "",
	venue: "",
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

const NewEvent = () => {
	const [thumbnail, setThumbnail] = useState(null);

	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("info");

	const dispatch = useDispatch();
	const token = localStorage.getItem("token");
	const { me } = useSelector((state) => state.user);

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
		try {console.log("values", values)
			const response = await dispatch(addEvent(me._id, token, values));
			//extract success message
			const { success, message } = response;

			// Set the alert message from the response and deeventine severity
			setAlertMessage(message);
			setAlertSeverity(success ? "success" : "error");

			//close the modal
			if (success) {
				setTimeout(() => {
					window.location.reload();
				}, 2000);
			}
		} catch (error) {
			console.log("Error is", error);
			setAlertMessage(error.error || "An error occurred.");
			setAlertSeverity("error");
		}

		actions.setSubmitting(false);
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={EventSchema}
			onSubmit={handleSubmit}
		>
			{({ setFieldValue, isSubmitting }) => {
				return (
					<Form>
						<Stack
							direction="column"
							spacing={3}
							sx={{ pb: 3, pr: 2 }}
						>
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
								startIcon={<Iconify icon="formkit:submit" />}
							>
								Submit
							</LoadingButton>
						</Stack>
					</Form>
				);
			}}
		</Formik>
	);
};

export default NewEvent;
