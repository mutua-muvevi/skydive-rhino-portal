// @mui
import { alpha, styled } from "@mui/material/styles";
import { ListItemIcon, ListSubheader, ListItemButton } from "@mui/material";
// config
import { ICON, NAV } from "../../../config/global";

// ----------------------------------------------------------------------

export const StyledItem = styled(ListItemButton, {
	shouldForwardProp: (prop) => prop !== "active" && prop !== "caption",
})(({ active, disabled, depth, caption, theme }) => {
	const isLight = theme.palette.mode === "light";

	const subItem = depth !== 1;

	const activeStyle = {
		color:
			theme.palette.mode === "light"
				? theme.palette.primary.contrastText
				: theme.palette.primary.main,
		backgroundColor:
			theme.palette.mode === "light"
				? alpha(theme.palette.primary.main, 0.5)
				: theme.palette.primary.main,
		...(!isLight && {
			color: theme.palette.primary.contrastText,
		}),
	};

	const activeSubStyle = {
		color:
			theme.palette.mode === "light"
				? theme.palette.primary.contrastText
				: theme.palette.primary.main,
		backgroundColor: "transparent",
	};

	return {
		position: "relative",
		textTransform: "capitalize",
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1.5),
		marginBottom: theme.spacing(0.5),
		color:
			theme.palette.mode === "light"
				? theme.palette.grey[900]
				: theme.palette.text.secondary,
		borderRadius: theme.shape.borderRadius,
		height: NAV.H_DASHBOARD_ITEM,
		// Sub item
		...(subItem && {
			height: NAV.H_DASHBOARD_ITEM_SUB,
			...(depth > 2 && {
				paddingLeft: theme.spacing(depth),
			}),
			...(caption && {
				height: NAV.H_DASHBOARD_ITEM,
			}),
		}),
		// Active item
		...(active && {
			...activeStyle,
			"&:hover": {
				...activeStyle,
			},
		}),
		// Active sub item
		...(subItem &&
			active && {
				...activeSubStyle,
				"&:hover": {
					...activeSubStyle,
				},
			}),
		// Disabled
		...(disabled && {
			"&.Mui-disabled": {
				opacity: 0.64,
			},
		}),
	};
});

// ----------------------------------------------------------------------

export const StyledIcon = styled(ListItemIcon)({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: ICON.NAV_ITEM,
	height: ICON.NAV_ITEM,
});

// ----------------------------------------------------------------------

export const StyledDotIcon = styled("span", {
	shouldForwardProp: (prop) => prop !== "active",
})(({ active, theme }) => ({
	width: 4,
	height: 4,
	borderRadius: "50%",
	backgroundColor: theme.palette.grey[900],
	transition: theme.transitions.create("transform", {
		duration: theme.transitions.duration.shorter,
	}),
	...(active && {
		transform: "scale(2)",
		backgroundColor: theme.palette.primary.main,
	}),
}));

// ----------------------------------------------------------------------

export const StyledSubheader = styled(ListSubheader)(({ theme }) => ({
	...theme.typography.overline,
	fontSize: 11,
	paddingTop: theme.spacing(3),
	paddingBottom: theme.spacing(1),
}));
