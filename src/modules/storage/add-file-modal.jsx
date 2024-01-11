import {
	Alert,
	Button,
	Card,
	CardContent,
	CardHeader,
	Dialog,
} from "@mui/material";
import { Upload } from "../../components/upload";
import { useCallback, useState } from "react";

import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Stack } from "@mui/material";

import { useDispatch, useSelector } from "../../redux/store";
import { uploadFile } from "../../redux/slices/storage";
import { Navigate } from "react-big-calendar";
import Iconify from "../../components/iconify";
import PropTypes from "prop-types";

const initialState = {
	file: "",
};

const fileSchema = Yup.object().shape({
	file: Yup.string().required("File is required"),
});

const AddFileModal = ({ open, onClose }) => {
	const [file, setFile] = useState([]);
	const dispatch = useDispatch();

	const token = localStorage.getItem("token");
	const { me } = useSelector((state) => state.user);

	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("info");

	//add file
	const addFileHander = useCallback((acceptedFiles, setFieldValue) => {
		const newFile = acceptedFiles[0];
		if (newFile) {
			setFile(
				Object.assign(newFile, {
					preview: URL.createObjectURL(newFile),
				})
			);

			//SET FIELD VALUE FOR FORMIK
			setFieldValue("file", newFile);
		}
	}, []);

	if (!token || !me) {
		return <Navigate to="/auth/login" />;
	}

	const submitFile = async (values) => {
		try {
			const response = await dispatch(
				uploadFile(me._id, file, token)
			);

			//extract success message
			const { success, message } = response.data;

			// Set the alert message from the response and determine severity
			setAlertMessage(message);
			setAlertSeverity(success ? "success" : "error");

			//close the modal
			if (success) {
				setFile(null);
				setTimeout(() => {
					onClose();
				}, 2000);

				//reset formik
				values.file = "";

				//reload the page
				window.location.reload();
			}

		} catch (error) {
			setAlertMessage(error.error || "An error occurred.");
			setAlertSeverity("error");
		}
	};

	return (
		<div>
			<Dialog onClose={onClose} open={open} maxWidth="md" fullWidth>
				<Card>
					<CardHeader title="Add File" />
					<CardContent>
						<Formik
							initialValues={initialState}
							validationSchema={fileSchema}
							onSubmit={submitFile}
						>
							{({ setFieldValue }) => (
								<Form>
									<Stack direction="column" spacing={3}>
										{alertMessage && (
											<Alert
												severity={alertSeverity}
												sx={{ mb: 2 }}
											>
												{alertMessage}
											</Alert>
										)}
										<Upload
											file={file ? file : undefined}
											onDrop={(acceptedFiles) =>
												addFileHander(
													acceptedFiles,
													setFieldValue
												)
											}
											onDelete={() => {
												setFile(null);
												setFieldValue("file", null);
											}}
											name="file"
										/>

										<Button
											variant="contained"
											type="submit"
											endIcon={
												<Iconify icon="ep:upload-filled" />
											}
										>
											Submit File
										</Button>
									</Stack>
								</Form>
							)}
						</Formik>
					</CardContent>
				</Card>
			</Dialog>
		</div>
	);
};

// ----------------------------------------------------------------------

// proptypes validation
AddFileModal.propTypes = {
	open: PropTypes.bool,
	onClose: PropTypes.func,
};

export default AddFileModal;
