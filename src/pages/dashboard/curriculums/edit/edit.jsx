import { useState, useCallback } from "react";
import PropTypes from "prop-types";
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
import { editCurriculum } from "../../../../redux/slices/curriculums";

const EditCurriculum = ({ curriculum, onClose }) => {
	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("info");
	const [activeStep, setActiveStep] = useState(0);
	const [thumbnail, setThumbnail] = useState(
		curriculum.thumbnail ? curriculum.thumbnail : null
	);

	const [contentBlockImages, setContentBlockImages] = useState(
		curriculum.contentBlocks
			? curriculum.contentBlocks.map((block) => ({
					file: block.file,
					preview: block.file,
			}))
			: []
	);
	const initialValues = {
		title: curriculum ? curriculum.title : "",
		introDescription: curriculum ? curriculum.introDescription : "",
		thumbnail: curriculum ? curriculum.thumbnail : null,
		contentBlocks: curriculum
			? curriculum.contentBlocks
			: [{ title: "", details: "", file: null }],
	};

	const steps = ["Curriculum Details", "Content Blocks", "Preview"];

	const CurriculumSchema = Yup.object().shape({
		title: Yup.string().required("Title is required"),
		introDescription: Yup.string().required(
			"Intro description is required"
		),
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

	const handleContentBlockImageChange = (index, file, setFieldValue) => {
		const updatedImages = [...contentBlockImages];
		const fileUrl = URL.createObjectURL(file);

		updatedImages[index] = {
			file: file,
			preview: fileUrl,
		};

		setContentBlockImages(updatedImages);
		setFieldValue(`contentBlocks[${index}].file`, file);
	};

	const handleSubmit = async (values, actions) => {
		try {
			const response = await dispatch(
				editCurriculum(me._id, token, values, curriculum._id)
			);
			//extract success message
			const { success, message } = response.data;

			// Set the alert message from the response and determine severity
			setAlertMessage(message);
			setAlertSeverity(success ? "success" : "error");

			//close the modal
			if (success) {
				onClose();

				setTimeout(() => {
					onClose();

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
							{alertMessage && (
								<Alert
									severity={alertSeverity}
									sx={{
										mb: 2,
										position: "absolute",
										left: "50%",
										top: "50%",
									}}
								>
									{alertMessage}
								</Alert>
							)}
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
																contentBlockImages[
																	index
																]?.preview ||
																null
															}
															onDrop={(
																acceptedFiles
															) =>
																handleContentBlockImageChange(
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
								{activeStep === steps.length - 1 ? (
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
		</>
	);
};

EditCurriculum.propTypes = {
	curriculum: PropTypes.object.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default EditCurriculum;
