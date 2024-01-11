import Textfield from "../../../../../../components/form/textfield/textfield";
import { Upload } from "../../../../../../components/upload";
import PropTypes from "prop-types";
import { FieldArray } from "formik";
import { Button, Stack, Typography } from "@mui/material";

const CreateIntro = ({
	introImage,
	handleIntroImageChange,
	setFieldValue,
	values,
}) => {
	return (
		<Stack direction="column" spacing={3}>
			<Stack direction="column" spacing={1}>
				<Typography variant="body1">Intro Image</Typography>
				<Upload
					name={`introImage`}
					file={introImage}
					onDrop={(acceptedFiles) =>
						handleIntroImageChange(acceptedFiles, setFieldValue)
					}
				/>
			</Stack>
			<Textfield name="introTitle" label="Intro Title" />
			<Textfield
				name="introSubtitle"
				label="Intro Subtitle"
				multiline
				rows={5}
			/>

			<FieldArray name="introContent">
				{({ push, remove }) => (
					<Stack spacing={3}>
						{values.introContent.map((faq, index) => (
							<Stack key={index} direction="column" spacing={2}>
								<Textfield
									name={`introContent[${index}].answer`}
									label={`FAQ ${index + 1} Answer`}
									multiline
									rows={5}
								/>
								{values.introContent.length > 1 && (
									<Button
										type="button"
										variant="outlined"
										onClick={() => remove(index)}
									>
										Remove the above FAQ
									</Button>
								)}
							</Stack>
						))}
						<Button
							type="button"
							variant="contained"
							onClick={() =>
								push({
									question: "",
									answer: "",
								})
							}
						>
							Add Another FAQ
						</Button>
					</Stack>
				)}
			</FieldArray>
		</Stack>
	);
};

CreateIntro.propTypes = {
	introImage: PropTypes.object,
	handleIntroImageChange: PropTypes.func.isRequired,
	setFieldValue: PropTypes.func.isRequired,
	values: PropTypes.object.isRequired,
};

export default CreateIntro;
