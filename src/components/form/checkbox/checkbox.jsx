import { PropTypes } from "prop-types";

import {
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	Typography,
} from "@mui/material";
import { useField, useFormikContext } from "formik";

const CheckBoxField = ({ name, label, legend }) => {
	const { setFieldValue } = useFormikContext();
	const [field, meta] = useField(name);

	const handleChange = (evt) => {
		const { checked } = evt.target;
		setFieldValue(name, checked);
	};

	const configCheckbox = {
		...field,
		onChange: handleChange,
	};

	const configFormControl = {};
	if (meta && meta.touched && meta.error) {
		configFormControl.error = true;
	}

	return (
		<FormControl {...configFormControl}>
			<FormLabel component="legend">{legend}</FormLabel>
			<FormGroup>
				<FormControlLabel
					control={<Checkbox {...configCheckbox} />}
					label={label}
				/>
			</FormGroup>
			{meta.touched && meta.error ? (
				<Typography variant="caption" color="error">
					{meta.error}
				</Typography>
			) : null}
		</FormControl>
	);
};

CheckBoxField.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	legend: PropTypes.string,
};

export default CheckBoxField;
