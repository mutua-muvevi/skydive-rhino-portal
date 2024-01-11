import { useState, useCallback } from "react";
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

import Iconify from "../../../../../../components/iconify";
import { useDispatch, useSelector } from "../../../../../../redux/store";
import { createHomepage } from "../../../../../../redux/slices/homepage";

import HomepageReview from "./preview";
import CreateBanner from "./banner";
import CreateIntro from "./intro";
import CreateTandem from "./tandem";
import CreateQuote from "./quote";
import CreateAff from "./aff";

const initialValues = {
	bannerVideo: null,
	bannerTitle: "",
	bannerSubtitle: "",

	introTitle: "",
	introSubtitle: "",
	introImage: null,
	introContent: [],

	tandemTitle: "",
	tandemSubtitle: "",
	tandemImage: null,
	tandemContent: [],
	tandemGallery: [],

	quote: "",

	affTitle: "",
	affSubtitle: "",
	affImage: null,
	affContent: [],
	affGallery: [],
};

const HomepageSchema = Yup.object().shape({
	bannerVideo: Yup.mixed().required("Banner video is required"),
	bannerTitle: Yup.string().required("Banner title is required"),
	bannerSubtitle: Yup.string().required("Banner subtitle is required"),

	introTitle: Yup.string().required("Intro title is required"),
	introSubtitle: Yup.string().required("Intro subtitle is required"),
	introImage: Yup.mixed().required("Intro image is required"),
	introContent: Yup.array(),

	tandemTitle: Yup.string().required("Tandem title is required"),
	tandemSubtitle: Yup.string().required("Tandem subtitle is required"),
	tandemImage: Yup.mixed().required("Tandem image is required"),
	tandemContent: Yup.array(),
	tandemGallery: Yup.array().of(
		Yup.mixed().required("Tandem gallery image is required")
	),

	quote: Yup.string().required("Quote is required"),

	affTitle: Yup.string().required("Aff title is required"),
	affSubtitle: Yup.string().required("Aff subtitle is required"),
	affImage: Yup.mixed().required("Aff image is required"),
	affContent: Yup.array().of(
		Yup.object().shape({
			title: Yup.string().required("Content title is required"),
			details: Yup.string().required("Content details are required"),
			image: Yup.mixed().required("Content image is required"),
		})
	),
	affGallery: Yup.array().of(
		Yup.mixed().required("Aff gallery image is required")
	),
});

const steps = [
	"Banner Content",
	"Intro Content",
	"Tandem Content",
	"Quote Content",
	"Aff Content",
	"Review and Submit",
];

const NewHomepage = () => {
	const [activeStep, setActiveStep] = useState(0);
	const [video, setVideo] = useState(null);
	const [introImage, setIntroImage] = useState(null);
	const [tandemImage, setTandemImage] = useState(null);
	const [affImage, setAffImage] = useState(null);
	const [tandemGallery, setTandemGallery] = useState([]);
	const [affGallery, setAffGallery] = useState([]);

	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("info");

	const dispatch = useDispatch();
	const token = localStorage.getItem("token");
	const { me } = useSelector((state) => state.user);

	const handleNext = () =>
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	const handleBack = () =>
		setActiveStep((prevActiveStep) => prevActiveStep - 1);

	const handleVideoChange = useCallback((acceptedFiles, setFieldValue) => {
		const newFile = acceptedFiles[0];
		if (newFile) {
			const fileUrl = URL.createObjectURL(newFile);
			setVideo(fileUrl);
			setFieldValue("bannerVideo", newFile);
		}
	}, []);

	const handleIntroImageChange = useCallback(
		(acceptedFiles, setFieldValue) => {
			const newFile = acceptedFiles[0];
			if (newFile) {
				const fileUrl = URL.createObjectURL(newFile);
				setIntroImage(fileUrl);
				setFieldValue("introImage", newFile);
			}
		},
		[]
	);

	const handleTandemImageChange = useCallback(
		(acceptedFiles, setFieldValue) => {
			const newFile = acceptedFiles[0];
			if (newFile) {
				const fileUrl = URL.createObjectURL(newFile);
				setTandemImage(fileUrl);
				setFieldValue("tandemImage", newFile);
			}
		},
		[]
	);

	const handleAffImageChange = useCallback((acceptedFiles, setFieldValue) => {
		const newFile = acceptedFiles[0];
		if (newFile) {
			const fileUrl = URL.createObjectURL(newFile);
			setAffImage(fileUrl);
			setFieldValue("affImage", newFile);
		}
	}, []);

	const handleDropMultiFile = useCallback(
		(acceptedFiles, setFieldValue) => {
			setTandemGallery([
				...tandemGallery,
				...acceptedFiles.map((newFile) =>
					Object.assign(newFile, {
						preview: URL.createObjectURL(newFile),
					})
				),
			]);
			setFieldValue("tandemGallery", [
				...tandemGallery,
				...acceptedFiles.map((newFile) =>
					Object.assign(newFile, {
						preview: URL.createObjectURL(newFile),
					})
				),
			]);
		},
		[tandemGallery]
	);

	const handleAffGalleryChange = useCallback(
		(acceptedFiles, setFieldValue) => {
			setAffGallery([
				...affGallery,
				...acceptedFiles.map((newFile) =>
					Object.assign(newFile, {
						preview: URL.createObjectURL(newFile),
					})
				),
			]);
			setFieldValue("affGallery", [
				...affGallery,
				...acceptedFiles.map((newFile) =>
					Object.assign(newFile, {
						preview: URL.createObjectURL(newFile),
					})
				),
			]);
		},
		[affGallery]
	);

	const handleSubmit = async (values) => {
		console.log(values);
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
					validationSchema={HomepageSchema}
					onSubmit={handleSubmit}
				>
					{({ values, setFieldValue, isSubmitting }) => (
						<Form>
							{alertMessage && (
								<Alert severity={alertSeverity} sx={{ mb: 2 }}>
									{alertMessage}
								</Alert>
							)}

							{/* banner */}
							{activeStep === 0 && (
								<CreateBanner
									video={video}
									handleVideoChange={handleVideoChange}
									setFieldValue={setFieldValue}
								/>
							)}

							{/* intro */}
							{activeStep === 1 && (
								<CreateIntro
									introImage={introImage}
									handleIntroImageChange={
										handleIntroImageChange
									}
									setFieldValue={setFieldValue}
									values={values}
								/>
							)}

							{/* tandem */}
							{activeStep === 2 && (
								<CreateTandem
									tandemImage={tandemImage}
									handleTandemImageChange={
										handleTandemImageChange
									}
									setFieldValue={setFieldValue}
									values={values}
									tandemGallery={tandemGallery}
									handleDropMultiFile={handleDropMultiFile}
								/>
							)}

							{/* quote */}
							{activeStep === 3 && (
								<CreateQuote setFieldValue={setFieldValue} />
							)}

							{/* aff */}
							{activeStep === 4 && (
								<CreateAff
									affImage={affImage}
									handleAffImageChange={handleAffImageChange}
									setFieldValue={setFieldValue}
									values={values}
									affGallery={affGallery}
									handleAffGalleryChange={
										handleAffGalleryChange
									}
								/>
							)}

							{/* review */}
							{activeStep === 5 && (
								<HomepageReview
									values={values}
									setFieldValue={setFieldValue}
								/>
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

export default NewHomepage;
