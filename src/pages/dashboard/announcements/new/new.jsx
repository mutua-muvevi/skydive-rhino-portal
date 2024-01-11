import { useState } from "react";
import { Stack, Alert, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "../../../../redux/store";
import { addAnnouncement } from "../../../../redux/slices/announcements";
import Textfield from "../../../../components/form/textfield/textfield";
import { LoadingButton } from "@mui/lab";

import { Formik, Form } from "formik";
import * as Yup from "yup";

const initialValues = {
	title: "",
	description: "",
};

const AnnouncementSchema = Yup.object().shape({
	title: Yup.string().required("Title is required"),
	description: Yup.string().required("Description is required"),
});

const NewAnnouncement = () => {
	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("info");

	const {
		me: { _id: userID },
	} = useSelector((state) => state.user);

	const token = localStorage.getItem("token");

	const dispatch = useDispatch();

	const theme = useTheme();

	const handleMakeAnnouncement = async (values) => {
		try {
			const response = await dispatch(
				addAnnouncement(userID, token, values)
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
			validationSchema={AnnouncementSchema}
			onSubmit={handleMakeAnnouncement}
		>
			{({ isSubmitting }) => (
				<Form>
					<Stack direction="column" spacing={3} sx={{ pt: 3 }}>
						{alertMessage && (
							<Alert severity={alertSeverity}>
								{alertMessage}
							</Alert>
						)}
						<Textfield name="title" label="Title" />
						<Textfield
							name="description"
							label="Description"
							multiline
							rows={4}
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
							Make an Announcement
						</LoadingButton>
					</Stack>
				</Form>
			)}
		</Formik>
	);
};

export default NewAnnouncement;
