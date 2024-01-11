import { alpha } from "@mui/material/styles";

// ----------------------------------------------------------------------

function createGradient(color1, color2) {
	return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

// SETUP COLORS
const GREY = {
	0: "#fafafa",
	100: "#f5f5f5", // Lightest blue undertone
	200: "#f0f0f0",
	300: "#d9d9d9",
	400: "#bfbfbf",
	500: "#8c8c8c", // Middle grey
	600: "#595959",
	700: "#262626",
	800: "#141414", // Darkest blue undertone
	900: "#010102",
	500_8: alpha("#919EAB", 0.08),
	500_12: alpha("#919EAB", 0.12),
	500_16: alpha("#919EAB", 0.16),
	500_24: alpha("#919EAB", 0.24),
	500_32: alpha("#919EAB", 0.32),
	500_48: alpha("#919EAB", 0.48),
	500_56: alpha("#919EAB", 0.56),
	500_80: alpha("#919EAB", 0.8),
};

export const PRIMARY = {
	lighter: "#6eb986",
	light: "#3ea25e",
	main: "#0e8b36",
	dark: "#0b6f2b",
	darker: "#085320",
	contrastText: "#fff",
};

export const SECONDARY = {
	lighter: "#e58d80",
	light: "#dc6756",
	main: "#d3412c",
	dark: "#a93423",
	darker: "#a93423",
	contrastText: "#fff",
};

export const INFO = {
	lighter: "#D0F2FF",
	light: "#74CAFF",
	main: "#1890FF",
	dark: "#0C53B7",
	darker: "#04297A",
	contrastText: "#fff",
};

export const SUCCESS = {
	lighter: "#f6ffed",
	light: "#95de64",
	main: "#52c41a",
	dark: "#237804",
	darker: "#092b00",
	contrastText: "#FFFFFF",
};

export const WARNING = {
	lighter: "#fffbe6",
	light: "#ffd666",
	main: "#faad14",
	dark: "#ad6800",
	darker: "#613400",
	contrastText: GREY[800],
};

export const ERROR = {
	lighter: "#fff1f0",
	light: "#ff7875",
	main: "#f5222d",
	dark: "#a8071a",
	darker: "#5c0011",
	contrastText: "#000000",
};

const GRADIENTS = {
	primary: createGradient(PRIMARY.light, PRIMARY.main),
	info: createGradient(INFO.light, INFO.main),
	success: createGradient(SUCCESS.light, SUCCESS.main),
	warning: createGradient(WARNING.light, WARNING.main),
	error: createGradient(ERROR.light, ERROR.main),
};

const CHART_COLORS = {
	violet: ["#826AF9", "#9E86FF", "#D0AEFF", "#F7D2FF"],
	blue: ["#2D99FF", "#83CFFF", "#A5F3FF", "#CCFAFF"],
	green: ["#2CD9C5", "#60F1C8", "#A4F7CC", "#C0F2DC"],
	yellow: ["#FFE700", "#FFEF5A", "#FFF7AE", "#FFF3D6"],
	red: ["#FF6C40", "#FF8F6D", "#FFBD98", "#FFF2D4"],
};

const COMMON = {
	common: { black: "#000000", white: "#FFFFFF" },
	primary: PRIMARY,
	secondary: SECONDARY,
	info: INFO,
	success: SUCCESS,
	warning: WARNING,
	error: ERROR,
	grey: GREY,
	gradients: GRADIENTS,
	chart: CHART_COLORS,
	divider: alpha(GREY[500], 0.24),
	action: {
		active: GREY[600],
		hover: GREY[500_8],
		selected: GREY[500_16],
		disabled: GREY[500_80],
		disabledBackground: GREY[500_24],
		focus: GREY[500_24],
		hoverOpacity: 0.08,
		disabledOpacity: 0.48,
	},
};

const palette = (themeMode) => {
	const light = {
		...COMMON,
		mode: "light",
		text: {
			primary: GREY[800],
			secondary: GREY[600],
			disabled: GREY[500],
		},
		background: {
			paper: "#fff",
			default: "#cfe8d7",
			neutral: GREY[200],
		},
		action: {
			...COMMON.action,
			active: GREY[600],
		},
	};

	const dark = {
		...COMMON,
		mode: "dark",
		text: {
			primary: "#E4F1FF",
			secondary: "#93A9C2",
			disabled: GREY[600],
		},
		background: {
			paper: "#1E2125",
			default: "#1f1f1f",
			neutral: "#14161f",
		},
		action: {
			...COMMON.action,
			active: GREY[500],
		},
	};

	return themeMode === "light" ? light : dark;
};

export default palette;
