import PropTypes from "prop-types";
import { memo } from "react";
// @mui
import { Box } from "@mui/material";
//
import { StyledRootScrollbar, StyledScrollbar } from "./styles";

// ----------------------------------------------------------------------

ScrollbarComponent.propTypes = {
	sx: PropTypes.object,
	children: PropTypes.node,
};

	

// Give the function a name here
function ScrollbarComponent({ children, sx, ...other }) {
	const userAgent =
		typeof navigator === "undefined" ? "SSR" : navigator.userAgent;

	const isMobile =
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			userAgent
		);

	if (isMobile) {
		return (
			<Box sx={{ overflowX: "auto", ...sx }} {...other}>
				{children}
			</Box>
		);
	}

	return (
		<StyledRootScrollbar>
			<StyledScrollbar clickOnTrack={false} sx={sx} {...other}>
				{children}
			</StyledScrollbar>
		</StyledRootScrollbar>
	);
}

// Memoize the named component
const Scrollbar = memo(ScrollbarComponent);

export default Scrollbar;