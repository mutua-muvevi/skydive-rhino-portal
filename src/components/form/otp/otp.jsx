import { MuiOtpInput } from "mui-one-time-password-input";
import { useField } from "formik";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";

const OTPField = ({ name, ...otherprops }) => {
	const [field, meta, helpers] = useField(name);

	const handleChange = (value) => {
		helpers.setValue(value);
		helpers.setTouched(true)
	};

	const configOTPField = {
		...field,
		...otherprops,
		length: 6,
		onChange: handleChange,
	};

	if (meta && meta.touched && meta.error) {
		configOTPField.error = true;
		configOTPField.helperText = meta.error;
	}

	return (
		<>
			<MuiOtpInput {...configOTPField} />
			{meta.error && meta.touched ? (
				<Typography variant="caption" color="error">
					{meta.error}
				</Typography>
			) : null}
		</>
	);
};

OTPField.propTypes = {
	name: PropTypes.string.isRequired,
};

export default OTPField;
