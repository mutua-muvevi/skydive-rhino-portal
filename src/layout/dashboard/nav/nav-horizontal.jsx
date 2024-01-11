import PropTypes from "prop-types";
import { memo } from "react";
// @mui
import { useTheme } from "@mui/material/styles";
import { AppBar, Box, Toolbar } from "@mui/material";
// config
import { HEADER } from "../../../config/global";
// components
import { NavSectionHorizontal } from "../../../components/nav-section";
//
import navConfig from "./config-navigation";

// ----------------------------------------------------------------------

function NavHorizontalComponent() {
	const theme = useTheme();

	return (
		<AppBar
			component="nav"
			color="transparent"
			sx={{
				boxShadow: 0,
				top: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
			}}
		>
			<Toolbar
				sx={{
					backgroundColor: theme.palette.mode === "dark"
					? theme.palette.background.neutral
					: theme.palette.primary.lighter,
				}}
			>
				<NavSectionHorizontal data={navConfig} />
			</Toolbar>

			<Shadow />
		</AppBar>
	);
}

const NavHorizontal = memo(NavHorizontalComponent);

export default NavHorizontal;

// ----------------------------------------------------------------------

Shadow.propTypes = {
	sx: PropTypes.object,
};

function Shadow({ sx, ...other }) {
	return (
		<Box
			sx={{
				left: 0,
				right: 0,
				bottom: 0,
				height: 24,
				zIndex: -1,
				width: 1,
				m: "auto",
				borderRadius: "50%",
				position: "absolute",
				boxShadow: (theme) => theme.customShadows.z8,
				...sx,
			}}
			{...other}
		/>
	);
}
