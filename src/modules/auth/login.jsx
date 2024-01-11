import { Link as RouterLink } from "react-router-dom";
// @mui
import { Stack, Typography, Link, Container } from "@mui/material";
// auth
// import { useAuthContext } from "../../auth/use-auth-context";
// routes
import { PATH_AUTH } from "../../routes/path";
//
import AuthLoginForm from "./login-form";
import Logo from "../../components/logo";

// ----------------------------------------------------------------------

export default function Login() {
	return (
		<Stack
			direction="column"
			justifyContent="center"
			sx={{ height: "100%" }}
		>
			<Container maxWidth="md">
				<Stack
					direction="column"
					alignItems="start"
					spacing={2}
					sx={{ width: "100%" }}
				>
					<Stack direction="row" justifyContent="left" sx={{width: "100%"}}>
						<Logo width={180} height={120} />
					</Stack>

					<Stack direction="column" sx={{ width: "100%" }}>
						<Typography variant="h3">Login</Typography>
						<Stack direction="row" spacing={0.5}>
							<Typography variant="body1">
								Don’t have an account? &nbsp;
							</Typography>

							<Link
								component={RouterLink}
								to={PATH_AUTH.register}
								variant="subtitle1"
							>
								Create Account
							</Link>
						</Stack>
					</Stack>

					<AuthLoginForm />

					<Typography variant="body2">
						Forgot your password? &nbsp;{" "}
						<span>
							<Link
								component={RouterLink}
								to={PATH_AUTH.resetPassword}
								variant="subtitle2"
							>
								Reset Password
							</Link>
						</span>
					</Typography>
				</Stack>
			</Container>
		</Stack>
	);
}
