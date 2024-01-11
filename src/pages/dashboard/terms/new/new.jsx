import { useState, useCallback } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Textfield from "../../../../components/form/textfield/textfield";
import SelectField from "../../../../components/form/select/select";

import { useDispatch, useSelector } from "../../../../redux/store";
import { addTerm } from "../../../../redux/slices/terms";
import { Alert, Stack } from "@mui/material";
import { Upload } from "../../../../components/upload";
import Iconify from "../../../../components/iconify";
import { LoadingButton } from "@mui/lab";

const initialValues = {
	name: "",
	description: "",
	type: "",
};

const TermSchema = Yup.object().shape({
	name: Yup.string()
		.min(5, "Minimum characters required is 5")
		.required("Title is required"),
	description: Yup.string()
		.min(5, "Minimum characters required is 5")
		.required("Description is required"),
	type: Yup.string().required("Type is required"),
});

const selectOptions = [
	{
		name: "term",
		label: "Term",
	},
	{
		name: "privacy policy",
		label: "Privacy Policy",
	},
	{
		name: "refund policy",
		label: "Refund Policy",
	},
	{
		name: "sales policy",
		label: "Sales Policy",
	},
	{
		name: "cookie policy",
		label: "Cookie Policy",
	},
	{
		name: "waiver",
		label: "Waiver",
	},
	{
		name: "agreement",
		label: "Agreement",
	},
];

const NewTerm = () => {
	const [file, setFile] = useState(null);

	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("info");

	const dispatch = useDispatch();
	const token = localStorage.getItem("token");
	const { me } = useSelector((state) => state.user);

	const handleThumbnailChange = useCallback(
		(acceptedFiles, setFieldValue) => {
			const newFile = acceptedFiles[0];
			if (newFile) {
				const fileUrl = URL.createObjectURL(newFile);
				setFile(fileUrl);
				setFieldValue("file", newFile);
			}
		},
		[]
	);

	const handleSubmit = async (values, actions) => {
		try {
			const response = await dispatch(addTerm(me._id, token, values));
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

		actions.setSubmitting(false);
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={TermSchema}
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

							<SelectField
								name="type"
								label="Type"
								options={selectOptions}
							/>

							<Upload
								name="file"
								file={file}
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

export default NewTerm;
