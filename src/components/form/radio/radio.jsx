import React from "react";
import PropTypes from "prop-types";
import {
	FormControl,
	FormLabel,
	RadioGroup,
	Typography,
} from "@mui/material";
import { useField } from "formik";

const RadioField = ({
	name,
	label,
	radioItems,
	defaultValue,
}) => {
	const [field, meta] = useField(name);

	const configFormControl = {};

	const configCheckbox = {
		...field,
	};

	if (meta && meta.touched && meta.error) {
		configFormControl.error = true;
		configFormControl.helperText = meta.error;
	}

	return (
		<FormControl>
			<FormLabel component="legend">{label}</FormLabel>
			<RadioGroup
				name={name}
				{...configCheckbox}
				row
				defaultValue={defaultValue}
			>
				{radioItems.map((el, i) => (
					<React.Fragment key={i}>{el}</React.Fragment>
				))}
			</RadioGroup>
			{meta.touched && meta.error ? (
				<Typography variant="caption" color="error">
					{meta.error}
				</Typography>
			) : null}
		</FormControl>
	);
};

RadioField.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	legend: PropTypes.string,
	radioItems: PropTypes.array.isRequired,
	defaultValue: PropTypes.string,
	icon: PropTypes.element,
	checkedIcon: PropTypes.element,
};

export default RadioField;
