import PropTypes from "prop-types";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useField } from "formik";
import { format, parse } from "date-fns";
import { Typography } from "@mui/material";

const DateTimeField = ({
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

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<DateTimePicker
				label={label}
				value={
					field.value
						? parse(field.value, "yyyy-MM-dd'T'HH:mm", new Date())
						: null
				}
				onChange={handleChange}
				minDateTime={
					minDateTime
						? parse(minDateTime, "yyyy-MM-dd'T'HH:mm", new Date())
						: undefined
				}
				maxDateTime={
					maxDateTime
						? parse(maxDateTime, "yyyy-MM-dd'T'HH:mm", new Date())
						: undefined
				}
				variant={variant || "outlined"}
				InputLabelProps={{ shrink: true }}
				error={meta.touched && Boolean(meta.error)}
				helperText={meta.touched && meta.error}
				sx={{ width: "100%" }}
				{...otherProps}
			/>
			{meta.error && meta.touched ? (
				<Typography variant="caption" color="error">
					{meta.error}
				</Typography>
			) : null}
		</LocalizationProvider>
	);
};

DateTimeField.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	variant: PropTypes.string,
	minDateTime: PropTypes.string,
	maxDateTime: PropTypes.string,
};

export default DateTimeField;
