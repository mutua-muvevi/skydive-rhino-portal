import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Textfield from "../../../../components/form/textfield/textfield";
import Iconify from "../../../../components/iconify";

import { useDispatch, useSelector } from "../../../../redux/store";
import { editManual } from "../../../../redux/slices/manuals";

import { Alert, Stack } from "@mui/material";
import SelectField from "../../../../components/form/select/select";
import { LoadingButton } from "@mui/lab";
import { Upload } from "../../../../components/upload";

const selectOptions = [
	{
		name: "safety",
		label: "Safety Handbook",
	},
	{
		name: "manual",
		label: "Manual",
	},
	{
		name: "others",
		label: "Others",
	},
];

//------------------------ || EDIT MANUAL || -------------------------//

const EditManual = ({ onClose }) => {
	const { setManual: manual } = useSelector((state) => state.manuals);
	const { me } = useSelector((state) => state.user);

	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("info");
	const [file, setFile] = useState(manual && manual.file ? manual.file : null);

	const token = localStorage.getItem("token");

	const dispatch = useDispatch();

	const initialValues = {
		name: manual ? manual.name : "",
		description: manual ? manual.description : "",
		type: manual ? manual.type : "",
	};

	const ManualSchema = Yup.object().shape({
		name: Yup.string()
			.min(5, "Minimum characters required is 5")
			.required("Title is required"),
		description: Yup.string()
			.min(5, "Minimum characters required is 5")
			.required("Description is required"),
		type: Yup.string().required("Type is required"),
	});

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
			const response = await dispatch(
				editManual(me._id, token, values,  manual._id)
			);
			//extract success message
			const { success, message } = response;

			// Set the alert message from the response and demanualine severity
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
			validationSchema={ManualSchema}
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

EditManual.propTypes = {
	onClose: PropTypes.func,
};

export default EditManual;
