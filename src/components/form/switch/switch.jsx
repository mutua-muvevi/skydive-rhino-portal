import PropTypes from "prop-types";

import { useField } from "formik";
import { Stack, Switch, Typography } from "@mui/material";

const SwitchField = ({ name, label, defaultChecked, ...otherProps }) => {
	const [field, meta] = useField(name);

	const configTextField = {
		...field,
		...otherProps,
		fullWidth: true,
		InputLabelProps: {
			shrink: true,
		},
		defaultChecked: defaultChecked ? true : null,
	};

	if (meta && meta.touched && meta.error) {
		configTextField.error = true;
		configTextField.helperText = meta.error;
	}

	return (
		<>
			<Stack direction="column">
				<Typography variant="body1" color="text.secondary">
					{label}
				</Typography>
				<Switch {...configTextField} />
			</Stack>
		</>
	);
};

SwitchField.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	defaultChecked: PropTypes.bool,
};

export default SwitchField;
