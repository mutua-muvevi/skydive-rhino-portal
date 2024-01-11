import PropTypes from "prop-types";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// @mui
import { Box, Stack, Drawer, useTheme } from "@mui/material";
// hooks
import useResponsive from "../../../hooks/use-responsive";
// config
import { NAV } from "../../../config/global";
// components
import Logo from "../../../components/logo";
import Scrollbar from "../../../components/scrollbar";
import { NavSectionVertical } from "../../../components/nav-section";
//
import navConfig from "./config-navigation";
import NavAccount from "./nav-account";
import NavToggleButton from "./nav-toggle-button";

// ----------------------------------------------------------------------

NavVertical.propTypes = {
	openNav: PropTypes.bool,
	onCloseNav: PropTypes.func,
};

export default function NavVertical({ openNav, onCloseNav }) {
	const { pathname } = useLocation();
	const theme = useTheme();

	const isDesktop = useResponsive("up", "lg");

	useEffect(() => {
		if (openNav) {
			onCloseNav();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	const renderContent = (
		<Scrollbar>
			<Stack
				spacing={3}
				sx={{
					pt: 3,
					pb: 2,
					px: 2.5,
					flexShrink: 0,
				}}
			>
				<Logo />

				<NavAccount />
			</Stack>

			<NavSectionVertical data={navConfig} />
		</Scrollbar>
	);

	return (
		<Box
			component="nav"
			sx={{
				flexShrink: { lg: 0 },
				width: { lg: NAV.W_DASHBOARD },
			}}
		>
			<NavToggleButton />

			{isDesktop ? (
				<Drawer
					open
					variant="permanent"
					PaperProps={{
						sx: {
							zIndex: 0,
							width: NAV.W_DASHBOARD,
							bgcolor:
								theme.palette.mode === "dark"
									? theme.palette.background.neutral
									: theme.palette.primary.lighter,
						},
					}}
				>
					{renderContent}
				</Drawer>
			) : (
				<Drawer
					open={openNav}
					onClose={onCloseNav}
					ModalProps={{
						keepMounted: true,
					}}
					PaperProps={{
						sx: {
							width: NAV.W_DASHBOARD,
							bgcolor:
								theme.palette.mode === "dark"
									? theme.palette.background.neutral
									: theme.palette.primary.lighter,
						},
					}}
				>
					{renderContent}
				</Drawer>
			)}
		</Box>
	);
}
