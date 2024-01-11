import PropTypes from "prop-types";
// @mui
import { useTheme } from "@mui/material/styles";
import { Stack, AppBar, Toolbar, IconButton } from "@mui/material";
// utils
// import { bgBlur } from "../../../utils/css-styles";
// hooks
import useOffSetTop from "../../../hooks/use-offset-top";
import useResponsive from "../../../hooks/use-responsive";
// config
import { HEADER, NAV } from "../../../config/global";
// components
import Logo from "../../../components/logo";
import Iconify from "../../../components/iconify";
import { useSettingsContext } from "../../../components/settings";
//
import Searchbar from "./searchbar";
import AccountPopover from "./account-popover";
import LanguagePopover from "./language-popover";
import ContactsPopover from "./contacts-popover";
import NotificationsPopover from "./notifications-popover";

// ----------------------------------------------------------------------

Header.propTypes = {
	onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
	const theme = useTheme();

	const { themeLayout } = useSettingsContext();

	const isNavHorizontal = themeLayout === "horizontal";

	const isNavMini = themeLayout === "mini";

	const isDesktop = useResponsive("up", "lg");

	const isOffset =
		useOffSetTop(HEADER.H_DASHBOARD_DESKTOP) && !isNavHorizontal;

	const renderContent = (
		<>
			{isDesktop && isNavHorizontal && <Logo sx={{ mr: 5 }} />}

			{!isDesktop && (
				<IconButton
					onClick={onOpenNav}
					sx={{ mr: 1, color: "text.primary" }}
				>
					<Iconify
						icon="eva:menu-2-fill"
						sx={{
							color:
								theme.palette.mode === "light"
									? theme.palette.grey[900]
									: theme.palette.text.secondary,
						}}
					/>
				</IconButton>
			)}

			<Searchbar />

			<Stack
				flexGrow={1}
				direction="row"
				alignItems="center"
				justifyContent="flex-end"
				spacing={{ xs: 0.5, sm: 1.5 }}
			>
				<LanguagePopover />

				<NotificationsPopover />

				{/* <ContactsPopover /> */}

				<AccountPopover />
			</Stack>
		</>
	);

	return (
		<AppBar
			sx={{
				boxShadow: "none",
				height: HEADER.H_MOBILE,
				zIndex: theme.zIndex.appBar + 1,
				backgroundColor:
					theme.palette.mode === "dark"
						? theme.palette.background.neutral
						: theme.palette.primary.lighter,

				transition: theme.transitions.create(["height"], {
					duration: theme.transitions.duration.shorter,
				}),
				...(isDesktop && {
					width: `calc(100% - ${NAV.W_DASHBOARD + 1}px)`,
					height: HEADER.H_DASHBOARD_DESKTOP,
					...(isOffset && {
						height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
					}),
					...(isNavHorizontal && {
						width: 1,
						bgcolor:
							theme.palette.mode === "dark"
								? theme.palette.background.neutral
								: theme.palette.primary.main,
						height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
						borderBottom: `dashed 1px ${theme.palette.divider}`,
					}),
					...(isNavMini && {
						width: `calc(100% - ${NAV.W_DASHBOARD_MINI + 1}px)`,
					}),
				}),
			}}
		>
			<Toolbar
				sx={{
					height: 1,
					px: { lg: 5 },
				}}
			>
				{renderContent}
			</Toolbar>
		</AppBar>
	);
}
