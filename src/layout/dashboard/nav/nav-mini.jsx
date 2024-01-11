// @mui
import { Stack, Box } from "@mui/material";
// config
import { NAV } from "../../../config/global";
// utils
import { hideScrollbarX } from "../../../utils/css-styles";
// components
import Logo from "../../../components/logo";
import { NavSectionMini } from "../../../components/nav-section";
//
import navConfig from "./config-navigation";
import NavToggleButton from "./nav-toggle-button";
import { useTheme } from "@mui/styles";

// ----------------------------------------------------------------------

export default function NavMini() {
	const theme = useTheme();

	return (
		<Box
			component="nav"
			sx={{
				flexShrink: { lg: 0 },
				width: { lg: NAV.W_DASHBOARD_MINI },
			}}
		>
			<NavToggleButton
				sx={{
					top: 22,
					left: NAV.W_DASHBOARD_MINI - 12,
				}}
			/>

			<Stack
				sx={{
					pb: 2,
					height: 1,
					position: "fixed",
					width: NAV.W_DASHBOARD_MINI,
					// bgcolor: theme.palette.background.neutral,

					bgcolor:
						theme.palette.mode === "dark"
							? theme.palette.background.neutral
							: theme.palette.primary.lighter,
					...hideScrollbarX,
				}}
			>
				<Logo sx={{ mx: "auto", my: 2 }} />

				<NavSectionMini data={navConfig} />
			</Stack>
		</Box>
	);
}
