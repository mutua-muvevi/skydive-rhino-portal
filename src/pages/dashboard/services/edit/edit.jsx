import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
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

import ServicePreview from "./preview";
import Iconify from "../../../../components/iconify";
import { useDispatch, useSelector } from "../../../../redux/store";
import { editService } from "../../../../redux/slices/services";
import AddServiceDetails from "./details";
import AddServiceContent from "./content";
import AddServicePrices from "./prices";
import AddRequirements from "./requirements";
import AddServiceFAQ from "./faq";
import AddServiceGallery from "./gallery";

const ServiceSchema = Yup.object().shape({
	name: Yup.string().required("Title is required"),
	introDescription: Yup.string().required("Intro description is required"),

	thumbnail: Yup.mixed().required("Thumbnail is required"),
	priceImage: Yup.mixed().required("Price background image is required"),
	faqImage: Yup.mixed().required("FAQ background image is required"),

	contentBlocks: Yup.array().of(
		Yup.object().shape({
			title: Yup.string().required("Block title is required"),
			details: Yup.string().required("Block details are required"),
			image: Yup.mixed().required(
				"An image is required for each content block"
			),
		})
	),

	prices: Yup.array().of(
		Yup.object().shape({
			title: Yup.string().required("Title is required"),
			listItems: Yup.array()
				.of(Yup.string())
				.required("At least one list item is required"),
			price: Yup.object().shape({
				amount: Yup.number().required("Amount is required"),
				currency: Yup.string().required("Currency is required"),
			}),
		})
	),

	requirements: Yup.array().of(
		Yup.object().shape({
			title: Yup.string().required("Title is required"),
			details: Yup.string().required("Details are required"),
		})
	),

	faqs: Yup.array().of(
		Yup.object().shape({
			question: Yup.string().required("Question is required"),
			answer: Yup.string().required("Answer is required"),
		})
	),

	gallery: Yup.array().of(Yup.mixed()),
});

const steps = [
	"Service Details",
	"Content Blocks",
	"Prices",
	"Requirements",
	"Frequent Asked Questions",
	"Gallery",
	"Preview",
];

const EditService = ({ service, onClose }) => {
	const [activeStep, setActiveStep] = useState(0);
	const [thumbnail, setThumbnail] = useState(
		service && service.thumbnail ? service.thumbnail : null
	);
	const [gallery, setGalleries] = useState(
		service && service.gallery ? service.gallery : []
	);
	const [contentBlockImages, setContentBlockImages] = useState(
		service && service.contentBlocks
			? service.contentBlocks.map((block) => ({
					file: block.image,
					preview: block.image,
			}))
			: []
	);

	const [priceImage, setPriceImage] = useState(
		service && service.priceImage ? service.priceImage : null
	);
	const [faqImage, setFaqImage] = useState(
		service && service.faqImage ? service.faqImage : null
	);

	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("info");

	const dispatch = useDispatch();
	const token = localStorage.getItem("token");
	const { me } = useSelector((state) => state.user);

	const handleNext = () =>
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	const handleBack = () =>
		setActiveStep((prevActiveStep) => prevActiveStep - 1);

	const initialValues = {
		name: service && service.name ? service.name : "",
		introDescription:
			service && service.introDescription ? service.introDescription : "",
		thumbnail: service && service.thumbnail ? service.thumbnail : null,

		contentBlocks:
			service && service.contentBlocks
				? service.contentBlocks
				: [{ title: "", details: "", image: null }],

		prices:
			service && service.prices
				? service.prices
				: [
						{
							title: "",
							listItems: [""],
							price: { amount: 0, currency: "USD" },
						},
				],

		requirements:
			service && service.requirements
				? service.requirements
				: [{ title: "", details: "" }],

		faqs:
			service && service.faqs
				? service.faqs
				: [{ question: "", answer: "" }],

		gallery: service && service.gallery ? service.gallery : [""],
		priceImage: service && service.priceImage ? service.priceImage : null,
		faqImage: service && service.faqImage ? service.faqImage : null,
	};

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

	const handlePriceImageChange = useCallback(
		(acceptedFiles, setFieldValue) => {
			const newFile = acceptedFiles[0];
			if (newFile) {
				const fileUrl = URL.createObjectURL(newFile);
				setPriceImage(fileUrl);
				setFieldValue("priceImage", newFile);
			}
		},
		[]
	);

	const handleFAQImageChange = useCallback((acceptedFiles, setFieldValue) => {
		const newFile = acceptedFiles[0];
		if (newFile) {
			const fileUrl = URL.createObjectURL(newFile);
			setFaqImage(fileUrl);
			setFieldValue("faqImage", newFile);
		}
	}, []);

	const handleDropMultiFile = useCallback(
		(acceptedFiles, setFieldValue) => {
			setGalleries([
				...gallery,
				...acceptedFiles.map((newFile) =>
					Object.assign(newFile, {
						preview: URL.createObjectURL(newFile),
					})
				),
			]);
			setFieldValue("gallery", [
				...gallery,
				...acceptedFiles.map((newFile) =>
					Object.assign(newFile, {
						preview: URL.createObjectURL(newFile),
					})
				),
			]);
		},
		[gallery]
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
			console.log("Values are", values);
			const response = await dispatch(
				editService(me._id, token, values, service._id)
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

					window.location.reload();
				}, 2000);
			}
		} catch (error) {
			setAlertMessage(error.error ? error.error : "An error occurred.");
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
					validationSchema={ServiceSchema}
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
								<Alert severity={alertSeverity} sx={{ mb: 2 }}>
									{alertMessage}
								</Alert>
							)}
							{/* service details */}
							{activeStep === 0 && (
								<AddServiceDetails
									thumbnail={thumbnail}
									handleThumbnailChange={
										handleThumbnailChange
									}
									setFieldValue={setFieldValue}
								/>
							)}

							{/* content block */}
							{activeStep === 1 && (
								<AddServiceContent
									contentBlockImages={contentBlockImages}
									handleContentBlockImageChange={
										handleContentBlockImageChange
									}
									setFieldValue={setFieldValue}
									values={values}
								/>
							)}

							{/* prices */}
							{activeStep === 2 && (
								<AddServicePrices
									priceImage={priceImage}
									values={values}
									setFieldValue={setFieldValue}
									handlePriceImageChange={
										handlePriceImageChange
									}
								/>
							)}

							{/* requirements */}
							{activeStep === 3 && (
								<AddRequirements values={values} />
							)}

							{/* faq */}
							{activeStep === 4 && (
								<AddServiceFAQ
								values={values}
								setFieldValue={setFieldValue}
								faqImage={faqImage}
								handleFAQImageChange={
									handleFAQImageChange
								}
							/>
							)}

							{/* gallery */}
							{activeStep === 5 && (
								<AddServiceGallery
									setFieldValue={setFieldValue}
									handleDropMultiFile={handleDropMultiFile}
									values={values}
								/>
							)}

							{/* preview */}
							{activeStep === 6 && (
								<ServicePreview formData={values} />
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

EditService.propTypes = {
	service: PropTypes.object.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default EditService;
