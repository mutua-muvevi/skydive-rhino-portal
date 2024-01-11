import PropTypes from "prop-types";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useField } from "formik";
import { format, parse } from "date-fns";
import { Typography } from "@mui/material";

const DateField = ({
	name,
	label,
	variant,
	minDate,
	maxDate,
	...otherProps
}) => {
	const [field, meta, helpers] = useField(name);

	const handleChange = (value) => {
		helpers.setValue(format(value, "yyyy-MM-dd"));
		helpers.setTouched(true);
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<DatePicker
				label={label}
				value={
					field.value
						? parse(field.value, "yyyy-MM-dd", new Date())
						: null
				}
				onChange={handleChange}
				minDate={
					minDate
						? parse(minDate, "yyyy-MM-dd", new Date())
						: undefined
				}
				maxDate={
					maxDate
						? parse(maxDate, "yyyy-MM-dd", new Date())
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

DateField.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	variant: PropTypes.string,
	minDate: PropTypes.string,
	maxDate: PropTypes.string,
};

export default DateField;
