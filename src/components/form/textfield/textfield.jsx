import { TextField } from "@mui/material";
import { useField } from "formik";
import { PropTypes } from "prop-types";

const Textfield = ({name, variant, multiline, size, ...otherProps}) => {

	const [field, meta] = useField(name)

	const configTextField = {
		...field,
		...otherProps,
		fullWidth: true,
		variant: variant ? variant : "outlined",
		size: size ? size : "small",
		multiline : multiline === true ? multiline : false,
	}

	if (meta && meta.touched && meta.error){
		configTextField.error = true
		configTextField.helperText = meta.error
	}

	return (
		<TextField  
			{...configTextField}
		/>
	)
}

Textfield.propTypes = {
	name: PropTypes.string.isRequired,
	variant: PropTypes.string,
	multiline: PropTypes.bool,
	size: PropTypes.string,
	shrink: PropTypes.bool
}

export default Textfield