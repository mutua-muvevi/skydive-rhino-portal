import PropTypes from "prop-types";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useField } from "formik";
import { format, parse } from "date-fns";
import { Typography } from "@mui/material";
import { MobileDateTimePicker } from "@mui/x-date-pickers";

const MobileDateTimeField = ({
	name,
	label,
	variant,
	minDateTime,
	maxDateTime,
	...otherProps
}) => {
	const [field, meta, helpers] = useField(name);

	const handleChange = (value) => {
		helpers.setValue(format(value, "yyyy-MM-dd'T'HH:mm"));
		helpers.setTouched(true);
	};

	const configDateTimePicker = {
		...field,
		...otherProps,
		fullWidth: true,
		variant: variant ? variant : "outlined",
		size: "small",
		label: label,
		value: field.value
			? parse(field.value, "yyyy-MM-dd'T'HH:mm", new Date())
			: null,
		minDateTime: minDateTime
			? parse(minDateTime, "yyyy-MM-dd'T'HH:mm", new Date())
			: undefined,
		maxDateTime: maxDateTime
			? parse(maxDateTime, "yyyy-MM-dd'T'HH:mm", new Date())
			: undefined,

		onChange: handleChange,
		InputLabelProps: { shrink: true },
		error: meta.touched && Boolean(meta.error === true),
		helperText: meta.touched && meta.error,
		sx: { width: "100%" },
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<MobileDateTimePicker {...configDateTimePicker} />
			{meta.error && meta.touched ? (
				<Typography variant="caption" color="error">
					{meta.error}
				</Typography>
			) : null}
		</LocalizationProvider>
	);
};

MobileDateTimeField.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	variant: PropTypes.string,
	minDateTime: PropTypes.string,
	maxDateTime: PropTypes.string,
};

export default MobileDateTimeField;
