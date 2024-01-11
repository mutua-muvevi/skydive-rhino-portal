import PropTypes from "prop-types";
// @mui
import { InputBase } from "@mui/material";

// ----------------------------------------------------------------------

KanbanInputName.propTypes = {
	color: PropTypes.string,
	sx: PropTypes.object,
};

export default function KanbanInputName({ sx, color, ...other }) {
	return (
		<InputBase
			typography="subtitle1"
			sx={{
				flexGrow: 1,
				"& .MuiInputBase-input": {
					p: 1,
					borderRadius: 1,
					typography: "subtitle1",
					border: `solid 1px transparent`,
					transition: (theme) =>
						theme.transitions.create([
							"padding-left",
							"border-color",
						]),
					"&:hover, &:focus": {
						pl: 1,
						border: (theme) =>
							`solid 1px ${theme.palette.text.primary}`,
					},
				},
				color: color,
				...sx,
			}}
			{...other}
		/>
	);
}
