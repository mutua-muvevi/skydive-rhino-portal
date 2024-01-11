import PropTypes from "prop-types";
import { forwardRef } from "react";
// @mui
import { Radio, RadioGroup } from "@mui/material";
//formik
import { useField } from "formik";
//
import Icon from "./icon";

// ----------------------------------------------------------------------

const ColorSinglePicker = forwardRef(({ colors, ...other }, ref) => {
	const [field, meta] = useField(name);

	const configFormControl = {};

	const configCheckbox = {
		...field,
		...other,
	};

	if (meta && meta.touched && meta.error) {
		configFormControl.error = true;
		configFormControl.helperText = meta.error;
	}

	return (
		<RadioGroup row ref={ref} {...configCheckbox}>
			{colors.map((color) => {
				const whiteColor = color === "#FFFFFF" || color === "white";

				return (
					<Radio
						key={color}
						value={color}
						color="default"
						icon={<Icon whiteColor={whiteColor} />}
						checkedIcon={<Icon checked whiteColor={whiteColor} />}
						sx={{
							color,
							"&:hover": { opacity: 0.72 },
							"& svg": { width: 12, height: 12 },
						}}
					/>
				);
			})}
		</RadioGroup>
	);
});

ColorSinglePicker.propTypes = {
	colors: PropTypes.arrayOf(PropTypes.string),
};

ColorSinglePicker.displayName = "ColorSinglePicker";

export default ColorSinglePicker;
