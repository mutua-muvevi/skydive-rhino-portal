import PropTypes from "prop-types";
import Textfield from "../../../../components/form/textfield/textfield";
import { FieldArray } from "formik";
import { Button, Stack, Typography } from "@mui/material";
import { Upload } from "../../../../components/upload";

const AddServiceFAQ = ({
	values,
	faqImage,
	setFieldValue,
	handleFAQImageChange,
}) => {
	return (
		<Stack direction="column" spacing={3}>
			<Stack direction="column" spacing={1}>
				<Typography variant="body1">FAQ Thumbnail</Typography>
				<Upload
					name={`faqImage`}
					file={faqImage}
					onDrop={(acceptedFiles) =>
						handleFAQImageChange(acceptedFiles, setFieldValue)
					}
				/>
			</Stack>

			<FieldArray name="faqs">
				{({ push, remove }) => (
					<Stack spacing={3}>
						{values.faqs.map((faq, index) => (
							<Stack key={index} direction="column" spacing={2}>
								<Textfield
									name={`faqs[${index}].question`}
									label={`FAQ ${index + 1} Question`}
								/>
								<Textfield
									name={`faqs[${index}].answer`}
									label={`FAQ ${index + 1} Answer`}
									multiline
									rows={5}
								/>
								{values.faqs.length > 1 && (
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

AddServiceFAQ.propTypes = {
	values: PropTypes.object.isRequired,
	faqImage: PropTypes.object,
	setFieldValue: PropTypes.func.isRequired,
	handleFAQImageChange: PropTypes.func.isRequired,
};

export default AddServiceFAQ;
