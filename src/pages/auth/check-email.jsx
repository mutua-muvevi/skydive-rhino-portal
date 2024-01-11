import { Helmet } from "react-helmet-async";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { Link, Typography } from "@mui/material";
// routes
import { PATH_AUTH } from "../../routes/path";
// components
import Iconify from "../../components/iconify";
// sections
import AuthVerifyCodeForm from "../../modules/auth/verify-code-form";
// assets
import { EmailInboxIcon } from "../../assets/icons";

// ----------------------------------------------------------------------

export default function CheckEmail() {
	return (
		<>
			<Helmet>
				<title> Verify Code | Skydive Rhino Kenya </title>
			</Helmet>

			<EmailInboxIcon sx={{ mb: 5, height: 96 }} />

			<Typography variant="h3" paragraph>
				Please check your email!
			</Typography>

			<Typography variant="body1" sx={{ color: "text.secondary", mb: 5 }}>
				We have emailed a 6-digit confirmation code to acb@domain,
				please enter the code in below box to verify your email.
			</Typography>

			<AuthVerifyCodeForm />

			<Typography variant="body2" sx={{ my: 3 }}>
				Don’t have a code? &nbsp;
				<Link variant="subtitle1">Resend code</Link>
			</Typography>

			<Link
				component={RouterLink}
				to={PATH_AUTH.login}
				color="inherit"
				variant="subtitle1"
				sx={{
					mx: "auto",
					alignItems: "center",
					display: "inline-flex",
				}}
			>
				<Iconify icon="eva:chevron-left-fill" width={16} />
				Return to sign in
			</Link>
		</>
	);
}
