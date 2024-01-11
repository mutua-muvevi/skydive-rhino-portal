import PropTypes from "prop-types";
import { useState, useCallback } from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import {
	Alert,
	Box,
	Button,
	Stack,
	Step,
	StepLabel,
	Stepper,
} from "@mui/material";

import Textfield from "../../../../components/form/textfield/textfield";
import { Upload } from "../../../../components/upload";
import CurriculumPreview from "./preview";
import Iconify from "../../../../components/iconify";
import { useDispatch, useSelector } from "../../../../redux/store";
import { addCurriculum } from "../../../../redux/slices/curriculums";

const initialValues = {
	title: "",
	introDescription: "",
	thumbnail: null,
	contentBlocks: [{ title: "", details: "", file: null }],
};

const CurriculumSchema = Yup.object().shape({
	title: Yup.string().required("Title is required"),
	introDescription: Yup.string().required("Intro description is required"),
	thumbnail: Yup.mixed().required("Thumbnail is required"),
	contentBlocks: Yup.array().of(
		Yup.object().shape({
			title: Yup.string().required("Block title is required"),
			details: Yup.string().required("Block details are required"),
			file: Yup.mixed().required(
				"An file is required for each content block"
			),
		})
	),
});

const steps = ["Curriculum Details", "Content Blocks", "Preview"];


const NewCurriculum = ({ onClose }) => {
	const [activeStep, setActiveStep] = useState(0);
	const [thumbnail, setThumbnail] = useState(null);
	const [contentBlockFiles, setContentBlockFiles] = useState([]);

	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("info");

	const dispatch = useDispatch();
	const token = localStorage.getItem("token");
	const { me } = useSelector((state) => state.user);

	const handleNext = () =>
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	const handleBack = () =>
		setActiveStep((prevActiveStep) => prevActiveStep - 1);

	const handleThumbnailChange = useCallback(
		(acceptedFiles, setFieldValue) => {
			const newFile = acceptedFiles[0];
			if (newFile) {
				const fileUrl = URL.createObjectURL(newFile);
				setThumbnail(fileUrl);
				setFieldValue("thumbnail", newFile);
			}
		},
		[]
	);

	const handleContentBlockFileChange = (index, file, setFieldValue) => {
		const updatedFiles = [...contentBlockFiles];
		const fileUrl = URL.createObjectURL(file);

		updatedFiles[index] = {
			file: file,
			preview: fileUrl,
		};

		setContentBlockFiles(updatedFiles);
		setFieldValue(`contentBlocks[${index}].file`, file);
	};

	const handleSubmit = async (values, actions) => {
		try {
			const response = await dispatch(addCurriculum(me._id, token, values));
			//extract success message
			const { success, message } = response.data;

			// Set the alert message from the response and determine severity
			setAlertMessage(message);
			setAlertSeverity(success ? "success" : "error");

			onClose()

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
		<>
			<Stack sx={{ pr: 2, mb: 3 }}>
				<Stepper
					activeStep={activeStep}
					alternativeLabel
					sx={{ mb: 3 }}
				>
					{steps.map((label) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>
				<Formik
					initialValues={initialValues}
					validationSchema={CurriculumSchema}
					onSubmit={handleSubmit}
				>
					{({
						values,
						setFieldValue,
						isSubmitting,
						// isValid,
						// dirty,
					}) => (
						<Form>
							{activeStep === 0 && (
								<Stack direction="column" spacing={3}>
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
									<Textfield
										name="title"
										label="Curriculum Title"
									/>
									<Textfield
										name="introDescription"
										label="Intro Description"
										multiline
										rows={4}
									/>
								</Stack>
							)}
							{activeStep === 1 && (
								<FieldArray name="contentBlocks">
									{({ push, remove }) => (
										<Box>
											{values.contentBlocks.map(
												(block, index) => (
													<Stack
														key={index}
														direction="column"
														spacing={3}
														sx={{ pb: 3 }}
													>
														<Upload
															name={`contentBlocks[${index}].file`}
															file={
																contentBlockFiles[
																	index
																]?.preview ||
																null
															}
															onDrop={(
																acceptedFiles
															) =>
																handleContentBlockFileChange(
																	index,
																	acceptedFiles[0],
																	setFieldValue
																)
															}
														/>

														<Textfield
															name={`contentBlocks[${index}].title`}
															label={`Content Block ${
																index + 1
															} Title`}
														/>
														<Textfield
															name={`contentBlocks[${index}].details`}
															label={`Content Block ${
																index + 1
															} Details`}
															multiline
															rows={5}
														/>
														{values.contentBlocks
															.length > 1 && (
															<Button
																type="button"
																variant="outlined"
																onClick={() =>
																	remove(
																		index
																	)
																}
															>
																Remove the above
																content block
															</Button>
														)}
													</Stack>
												)
											)}
											<Button
												type="button"
												variant="contained"
												onClick={() =>
													push({
														title: "",
														details: "",
														file: null,
													})
												}
											>
												Add Another Content Block
											</Button>
										</Box>
									)}
								</FieldArray>
							)}
							{activeStep === 2 && (
								<CurriculumPreview formData={values} />
							)}
							<Box
								sx={{
									display: "flex",
									flexDirection: "row",
									pt: 2,
								}}
							>
								<Button
									color="inherit"
									disabled={activeStep === 0}
									onClick={handleBack}
									sx={{ mr: 1 }}
									startIcon={
										<Iconify icon="mdi:arrow-left" />
									}
									variant="outlined"
								>
									Back
								</Button>
								<Box sx={{ flex: "1 1 auto" }} />
								{activeStep === steps.length-1 ? (
									// 'Submit' button on the final step
									<Button
										variant="contained"
										type="submit"
										disabled={isSubmitting}
										endIcon={<Iconify icon="mdi:check" />}
									>
										Submit
									</Button>
								) : (
									// 'Next' button on all other steps
									<Button
										variant="contained"
										type="button"
										onClick={handleNext}
										endIcon={
											<Iconify icon="mdi:arrow-right" />
										}
										// disabled={!isValid }
									>
										Next
									</Button>
								)}
							</Box>
						</Form>
					)}
				</Formik>
			</Stack>
			{alertMessage && (
				<Alert severity={alertSeverity} sx={{ mb: 2 }}>
					{alertMessage}
				</Alert>
			)}
		</>
	);
};

NewCurriculum.propTypes = {
	onClose: PropTypes.func.isRequired,
};

export default NewCurriculum;
