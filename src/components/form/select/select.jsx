import PropTypes from "prop-types";

import {
	MenuItem,
	FormControl,
	InputLabel,
	Select,
	OutlinedInput,
	Typography,
} from "@mui/material";
import { useField, useFormikContext } from "formik";

const SelectField = ({
	name,
	size,
	label,
	height,
	options,
	variant,
	defaultValue,
	shrink,
	...otherProps
}) => {
	const ITEM_HEIGHT = height ? height : 50;
	const ITEM_PADDING_TOP = 8;
	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			},
		},
	};
	const { setFieldValue } = useFormikContext();
	const [field, meta] = useField(name);

	const handleChange = (evt) => {
		const { value } = evt.target;
		setFieldValue(name, value);
	};

	const configSelect = {
		...field,
		...otherProps,
		select: true,
		fullWidth: true,
		variant: variant ? variant : "outlined",
		onChange: handleChange,
		MenuProps: { MenuProps },
	};

	const stylesProps = {
		fullWidth: true,
		variant: variant ? variant : "outlined",
		size: size ? size : "small",
		InputLabelProps: {
			shrink: shrink ? null : true,
		},
	};

	if (meta && meta.touched && meta.error) {
		configSelect.error = true;
		configSelect.helperText = meta.error;
	}

	return (
		<FormControl {...stylesProps}>
			<InputLabel>{label}</InputLabel>
			<Select
				{...configSelect}
				MenuProps={MenuProps}
				defaultValue={defaultValue ? defaultValue : ""}
				input={<OutlinedInput label={label} />}
			>
				{options.map((item, pos) => {
					return (
						<MenuItem key={pos} value={item.name}>
							{item.label ? item.label : item.name}
						</MenuItem>
					);
				})}
			</Select>
			{meta.touched && meta.error ? (
				<Typography variant="caption" color="error" sx={{mt:1}}>
					{meta.error}
				</Typography>
			) : null}
		</FormControl>
	);
};

SelectField.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	size: PropTypes.string,
	height: PropTypes.number,
	options: PropTypes.array.isRequired,
	variant: PropTypes.string,
	defaultValue: PropTypes.string,
	shrink: PropTypes.boolean,
};

export default SelectField;
