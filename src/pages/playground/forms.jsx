import {
	Button,
	Card,
	CardContent,
	CardHeader,
	Container,
	FormControlLabel,
	Grid,
	InputAdornment,
	Radio,
	Stack,
	Switch,
	Typography,
} from "@mui/material";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import Textfield from "../../components/form/textfield/textfield";
import SelectField from "../../components/form/select/select";
import MultipleSelect from "../../components/form/select/multiple";
import RadioField from "../../components/form/radio/radio";
import CheckBoxField from "../../components/form/checkbox/checkbox";
import SwitchField from "../../components/form/switch/switch";
import { Upload, UploadAvatar } from "../../components/upload";
import { useCallback, useState } from "react";
import { fData } from "../../utils/format-number";
import DateField from "../../components/form/date/date";
import TimeField from "../../components/form/date/time";
import DateTimeField from "../../components/form/date/datetime";
import OTPField from "../../components/form/otp/otp";
import Editor from "../../components/editor/editor";
import Iconify from "../../components/iconify";

const FILE_SIZE = 160 * 1024; // e.g., 160 KB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const selectOptions = [
	{
		name: "option1",
		label: "Option 1",
	},
	{
		name: "option2",
		label: "Option 2",
	},
	{
		name: "option3",
		label: "Option 3",
	},
	{
		name: "option4",
		label: "Option 4",
	},
	{
		name: "option5",
		label: "Option 5",
	},
	{
		name: "option6",
		label: "Option 6",
	},
];

const multipleSelectOptions = [
	{
		value: "option1",
		label: "Option 1",
	},
	{
		value: "option2",
		label: "Option 2",
	},
	{
		value: "option3",
		label: "Option 3",
	},
	{
		value: "option4",
		label: "Option 4",
	},
	{
		value: "option5",
		label: "Option 5",
	},
	{
		value: "option6",
		label: "Option 6",
	},
];

const radioItems = [
	<FormControlLabel
		key="shared"
		value="shared"
		control={<Radio />}
		label="Value 1"
	/>,
	<FormControlLabel
		key="beneficiary"
		value="beneficiary"
		control={<Radio />}
		label="Value 2"
	/>,
	<FormControlLabel
		key="ours"
		value="ours"
		control={<Radio />}
		label="Value 3"
	/>,
];

const initialValues = {
	textfield: "",
	radio: "",
	checkbox: false,
	switch: false,
	selectfield: "option1",
	multiple: [],
	code: "",
	date: "",
	time: "",
	datetime: "",
	editor: "",
	upload: "",
};

const validation = Yup.object().shape({
	textfield: Yup.string().min(2).required("Textfield is required"),
	code: Yup.string().min(6).required("code is required"),
	radio: Yup.string().required("Radio is required"),
	checkbox: Yup.bool().oneOf([true], "Checkbox is required"),
	switch: Yup.bool().oneOf([true], "Switch is required"),
	selectfield: Yup.string().required("Selectfield is required"),
	multiple: Yup.array()
		.required("Multiple is required")
		.required("Multiple select is required"),
	date: Yup.date().required("Date is required"),
	time: Yup.string().required("Time is required"),
	datetime: Yup.string().required("Datetime is required"),
	editor: Yup.string().required("Editor is required"),
	upload: Yup.mixed()
		.required("A file is required")
		.test(
			"fileSize",
			"File too large",
			(value) => value && value[0] && value[0].size <= FILE_SIZE
		)
		.test(
			"fileFormat",
			"Unsupported Format",
			(value) =>
				value && value[0] && SUPPORTED_FORMATS.includes(value[0].type)
		),
});

const PlaygroundForms = () => {
	const [preview, setPreview] = useState(false);

	const [files, setFiles] = useState([]);

	const [file, setFile] = useState(null);
	const [quillFull, setQuillFull] = useState("");

	const [avatarUrl, setAvatarUrl] = useState(null);

	const handleDropSingleFile = useCallback((acceptedFiles) => {
		const newFile = acceptedFiles[0];
		if (newFile) {
			setFile(
				Object.assign(newFile, {
					preview: URL.createObjectURL(newFile),
				})
			);
		}
	}, []);

	const handleDropAvatar = useCallback((acceptedFiles) => {
		const newFile = acceptedFiles[0];
		if (newFile) {
			setAvatarUrl(
				Object.assign(newFile, {
					preview: URL.createObjectURL(newFile),
				})
			);
		}
	}, []);

	const handleDropMultiFile = useCallback(
		(acceptedFiles) => {
			setFiles([
				...files,
				...acceptedFiles.map((newFile) =>
					Object.assign(newFile, {
						preview: URL.createObjectURL(newFile),
					})
				),
			]);
		},
		[files]
	);

	const handleRemoveFile = (inputFile) => {
		const filesFiltered = files.filter(
			(fileFiltered) => fileFiltered !== inputFile
		);
		setFiles(filesFiltered);
	};

	const handleRemoveAllFiles = () => {
		setFiles([]);
	};

	const onSubmit = (values, actions) => {
		console.log("Submit Values ++++++++++", values);
	};

	return (
		<Container maxWidth="xl" sx={{ marginTop: "50px" }}>
			<Stack
				direction="column"
				spacing={5}
				justifyContent="center"
				alignItems="flex-start"
				sx={{ height: "100%", paddingBottom: "50px" }}
			>
				<Typography variant="h3" sx={{ textAlign: "center" }}>
					Form Components
				</Typography>
				<Formik
					initialValues={initialValues}
					validationSchema={validation}
					onSubmit={onSubmit}
				>
					{({ isSubmitting, setFieldValue, values }) => (
						<Form>
							<Grid container spacing={3}>{console.log("VAL", values)}
								<Grid item xs={12} md={6}>
									<Textfield
										name="textfield"
										label="Textfield"
										variant="outlined"
										size="small"
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<SelectField
										name="selectfield"
										label="Select"
										variant="outlined"
										size="small"
										options={selectOptions}
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<Iconify icon="carbon:location-filled" />
												</InputAdornment>
											),
										}}
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<MultipleSelect
										name="multiple"
										label="Multiple Select"
										variant="outlined"
										size="small"
										options={multipleSelectOptions}
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<RadioField
										name="radio"
										label="Radio Field"
										variant="outlined"
										size="small"
										radioItems={radioItems}
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<CheckBoxField
										name="checkbox"
										label="Checkbox Field label"
										variant="outlined"
										size="small"
										legend="Checkbox Field Legend"
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<SwitchField
										name="switch"
										label="Switch Field label"
										variant="outlined"
										legend="switch Field Legend"
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<DateField
										name="date"
										label="Date"
										variant="outlined"
										size="small"
										minDate="2023-10-10"
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<TimeField
										name="time"
										label="Time"
										minTime="09:00"
										maxTime="17:00"
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<DateTimeField
										name="datetime"
										label="Date and Time"
										variant="outlined"
										minDateTime="2022-10-01T00:00"
										maxDateTime="2023-12-31T23:59"
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<OTPField name="code" label="OTP Field" />
								</Grid>
								<Grid item xs={12}>
									<Editor name="editor" id="full-editor" />
								</Grid>
								<Grid item xs={12}>
									<Card>
										<CardHeader
											title="Upload Multi File"
											action={
												<FormControlLabel
													control={
														<Switch
															checked={preview}
															onChange={(event) =>
																setPreview(
																	event.target
																		.checked
																)
															}
														/>
													}
													label="Show Thumbnail"
												/>
											}
										/>
										<CardContent>
											<Upload
												multiple
												thumbnail={preview}
												files={files}
												onDrop={handleDropMultiFile}
												onRemove={handleRemoveFile}
												onRemoveAll={handleRemoveAllFiles}
												onUpload={() =>
													console.log("ON UPLOAD")
												}
											/>
										</CardContent>
									</Card>
								</Grid>
								<Grid item xs={12} md={6}>
									<Card>
										<CardHeader title="Upload Avatar" />
										<CardContent>
											<UploadAvatar
												file={avatarUrl}
												onDrop={handleDropAvatar}
												helperText={
													<Typography
														variant="caption"
														sx={{
															mt: 2,
															mx: "auto",
															display: "block",
															textAlign: "center",
															color: "text.secondary",
														}}
													>
														Allowed *.jpeg, *.jpg,
														*.png, *.gif
														<br /> max size of{" "}
														{fData(3145728)}
													</Typography>
												}
											/>
										</CardContent>
									</Card>
								</Grid>
								<Grid item xs={12} md={6}>
									<Card>
										<CardHeader title="Upload Single File" />
										<CardContent>
											<Upload
												file={file}
												onDrop={handleDropSingleFile}
												onDelete={() => setFile(null)}
												name="upload"
												setFieldValue={setFieldValue}
											/>
										</CardContent>
									</Card>
								</Grid>

								<Grid item xs={12}>
									<Button
										type="submit"
										color="primary"
										variant="contained"
									>
										Submit Form
									</Button>
								</Grid>
							</Grid>
						</Form>
					)}
				</Formik>
			</Stack>
		</Container>
	);
};

export default PlaygroundForms;
