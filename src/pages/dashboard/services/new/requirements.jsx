import PropTypes from "prop-types";
import Textfield from "../../../../components/form/textfield/textfield";
import { FieldArray } from "formik";
import { Button, Stack } from "@mui/material";

const AddRequirements = ({ values }) => {
	return (
		<FieldArray name="requirements">
			{({ push, remove }) => (
				<Stack>
					{values.requirements.map((requirement, index) => (
						<Stack
							key={index}
							direction="column"
							spacing={3}
							sx={{ pb: 3 }}
						>
							<Textfield
								name={`requirements[${index}].title`}
								label={`Requirement ${index + 1} Title`}
							/>
							<Textfield
								name={`requirements[${index}].details`}
								label={`Requirement ${index + 1} Details`}
								multiline
								rows={5}
							/>
							{values.requirements.length > 1 && (
								<Button
									type="button"
									variant="outlined"
									onClick={() => remove(index)}
								>
									Remove the above requirement
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
							})
						}
					>
						Add Another Requirement
					</Button>
				</Stack>
			)}
		</FieldArray>
	);
};

AddRequirements.propTypes = {
	values: PropTypes.object.isRequired,
};

export default AddRequirements;
