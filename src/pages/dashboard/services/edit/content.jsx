import { Stack } from "@mui/system";
import Textfield from "../../../../components/form/textfield/textfield";
import { Upload } from "../../../../components/upload";
import PropTypes from "prop-types";
import { FieldArray } from "formik";
import { Box, Button } from "@mui/material";

const AddServiceContent = ({
	values,
	contentBlockImages,
	handleContentBlockImageChange,
	setFieldValue,
}) => {
	return (
		<FieldArray name="contentBlocks">
			{({ push, remove }) => (
				<Box>
					{values.contentBlocks.map((block, index) => (
						<Stack
							key={index}
							direction="column"
							spacing={3}
							sx={{ pb: 3 }}
						>
							<Upload
								name={`contentBlocks[${index}].image`}
								file={
									contentBlockImages[index]?.preview || null
								}
								onDrop={(acceptedFiles) =>
									handleContentBlockImageChange(
										index,
										acceptedFiles[0],
										setFieldValue
									)
								}
							/>

							<Textfield
								name={`contentBlocks[${index}].title`}
								label={`Content Block ${index + 1} Title`}
							/>
							<Textfield
								name={`contentBlocks[${index}].details`}
								label={`Content Block ${index + 1} Details`}
								multiline
								rows={5}
							/>
							{values.contentBlocks.length > 1 && (
								<Button
									type="button"
									variant="outlined"
									onClick={() => remove(index)}
								>
									Remove the above content block
								</Button>
							)}
						</Stack>
					))}
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
	);
};

AddServiceContent.propTypes = {
	values: PropTypes.object.isRequired,
	contentBlockImages: PropTypes.array.isRequired,
	handleContentBlockImageChange: PropTypes.func.isRequired,
	setFieldValue: PropTypes.func.isRequired,
};

export default AddServiceContent;
