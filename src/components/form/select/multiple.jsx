import PropTypes from "prop-types";

import {
	Checkbox,
	FormControl,
	ListItemText,
	MenuItem,
	InputLabel,
	OutlinedInput,
	Select,
	Typography,
	useTheme,
} from "@mui/material";
import { useField, useFormikContext } from "formik";

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
		},
	},
};

const MultipleSelect = ({
	name,
	size,
	label,
	options,
	variant,
	shrink,
	...otherProps
}) => {
	const { setFieldValue } = useFormikContext();
	const [field, meta] = useField(name);

	const handleChange = (evt) => {
		const { value } = evt.target;
		setFieldValue(name, Array.isArray(value) ? value : [value]);

	};

	const configSelect = {
		...field,
		...otherProps,
		select: true,
		onChange: handleChange,
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
	const theme = useTheme();

	return (
		<div>
			<FormControl {...stylesProps}>
				<InputLabel>{label}</InputLabel>
				<Select
					multiple
					value={field.value || []}
					onChange={handleChange}
					input={<OutlinedInput label={label} />}
					renderValue={(selected) =>
						selected
							.map((value) => {
								const selectedOption = options.find(
									(option) => option.value === value
								);
								return selectedOption
									? selectedOption.label
									: "";
							})
							.join(", ")
					}
					MenuProps={{
						...MenuProps,
						PaperProps: {
							...MenuProps.PaperProps,
							style: {
								...MenuProps.PaperProps.style,
								maxHeight: 250,
							},
							sx: {
								borderBottomLeftRadius:
									theme.shape.inputBorderRadius,
								borderBottomRightRadius:
									theme.shape.inputBorderRadius,
								borderTopLeftRadius: 0,
							},
							//TODO: use simplebar react here
						},
					}}
				>
					{options.map((item) => (
						<MenuItem key={item.value} value={item.value}>
							<Checkbox
								checked={field.value?.indexOf(item.value) > -1}
								size="small"
							/>
							<ListItemText primary={item.label} />
						</MenuItem>
					))}
				</Select>
				{meta.touched && meta.error ? (
					<Typography variant="caption" color="error" sx={{ mt: 1 }}>
						{meta.error}
					</Typography>
				) : null}
			</FormControl>
		</div>
	);
};

MultipleSelect.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	options: PropTypes.array.isRequired,
	variant: PropTypes.string,
	shrink: PropTypes.bool,
	size: PropTypes.string,
};

export default MultipleSelect;
