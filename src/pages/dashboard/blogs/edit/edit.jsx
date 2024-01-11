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
import MultipleSelect from "../../../../components/form/select/multiple";
import { Upload } from "../../../../components/upload";
import BlogPreview from "./preview";
import Iconify from "../../../../components/iconify";
import { useDispatch, useSelector } from "../../../../redux/store";
import { editBlog } from "../../../../redux/slices/blogs";

const EditBlog = ({ blog }) => {
	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("info");
	const [activeStep, setActiveStep] = useState(0);
	const [thumbnail, setThumbnail] = useState(
		blog.thumbnail ? blog.thumbnail : null
	);
	
	const [contentBlockImages, setContentBlockImages] = useState(
		blog.contentBlocks
			? blog.contentBlocks.map((block) => ({
					file: block.image,
					preview: block.image,
			}))
			: []
	);
	const initialValues = {
		title: blog ? blog.title : "",
		tags: blog ? blog.tags : [],
		introDescription: blog ? blog.introDescription : "",
		thumbnail: blog ? blog.thumbnail : null,
		contentBlocks: blog
			? blog.contentBlocks
			: [{ title: "", details: "", image: null }],
	};

	const steps = ["Blog Details", "Content Blocks", "Preview"];

	const tagsOptions = [
		{ value: "tandem", label: "Tandem" },
		{ value: "AFF", label: "Accelerated Freefall" },
	];

	const BlogSchema = Yup.object().shape({
		title: Yup.string().required("Title is required"),
		tags: Yup.array()
			.of(Yup.string())
			.required("At least one tag is required"),
		introDescription: Yup.string().required(
			"Intro description is required"
		),
		thumbnail: Yup.mixed().required("Thumbnail is required"),
		contentBlocks: Yup.array().of(
			Yup.object().shape({
				title: Yup.string().required("Block title is required"),
				details: Yup.string().required("Block details are required"),
				image: Yup.mixed().required(
					"An image is required for each content block"
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
		setFieldValue(`contentBlocks[${index}].image`, file);
	};

	const handleSubmit = async (values, actions) => {
		try {
			const response = await dispatch(
				editBlog(me._id, token, blog._id, values)
			);
			//extract success message
			const { success, message } = response.data;

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
					validationSchema={BlogSchema}
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
										label="Blog Title"
									/>
									<MultipleSelect
										name="tags"
										label="Tags"
										options={tagsOptions}
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
															name={`contentBlocks[${index}].image`}
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
														image: null,
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
								<BlogPreview formData={values} />
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
		</>
	);
};

EditBlog.propTypes = {
	blog: PropTypes.object.isRequired,
};

export default EditBlog;
