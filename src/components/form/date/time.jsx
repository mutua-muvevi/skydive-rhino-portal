import PropTypes from "prop-types";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useField } from "formik";
import { format, parse } from "date-fns";
import { Typography } from "@mui/material";

const TimeField = ({
	name,
	label,
	variant,
	minTime,
	maxTime,
	...otherProps
}) => {
	const [field, meta, helpers] = useField(name);

	const handleChange = (value) => {
		helpers.setValue(format(value, "HH:mm"));
		helpers.setTouched(true);
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<TimePicker
				label={label}
				value={
					field.value ? parse(field.value, "HH:mm", new Date()) : null
				}
				onChange={handleChange}
				minTime={
					minTime ? parse(minTime, "HH:mm", new Date()) : undefined
				}
				maxTime={
					maxTime ? parse(maxTime, "HH:mm", new Date()) : undefined
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

TimeField.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	variant: PropTypes.string,
	minTime: PropTypes.string,
	maxTime: PropTypes.string,
};

export default TimeField;
