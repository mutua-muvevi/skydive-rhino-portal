import { Link as RouterLink } from "react-router-dom";
// @mui
import { styled, alpha } from "@mui/material/styles";
import { Box, Link, Typography } from "@mui/material";
// routes
import { PATH_DASHBOARD } from "../../../routes/path";
// components
import { CustomAvatar } from "../../../components/custom-avatar";
//redux
import { useSelector } from "../../../redux/store";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(2, 2.5),
	borderRadius: Number(theme.shape.borderRadius) * 1.5,
	// backgroundColor: alpha(theme.palette.grey[500], 0.12),
	backgroundColor:
		theme.palette.mode === "light"
			? alpha(theme.palette.primary.main, 0.5)
			: theme.palette.grey[800],
}));

// ----------------------------------------------------------------------

export default function NavAccount() {
	const { me } = useSelector((state) => state.user);

	return (
		<Link
			component={RouterLink}
			to={PATH_DASHBOARD.general.account}
			underline="none"
			color="inherit"
		>
			<StyledRoot>
				<CustomAvatar
					src={me?.image}
					alt={me?.fullname}
					name={me?.fullname}
				/>

				<Box sx={{ ml: 2, minWidth: 0 }}>
					<Typography variant="subtitle2" noWrap>
						{me?.fullname}
					</Typography>

					<Typography
						variant="body2"
						noWrap
						sx={{ color: "text.secondary" }}
					>
						{me?.role}
					</Typography>
				</Box>
			</StyledRoot>
		</Link>
	);
}
