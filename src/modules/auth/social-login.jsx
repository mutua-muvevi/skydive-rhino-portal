// @mui
import {
	Button,
	Divider,
	Stack,
	Typography,
} from "@mui/material";
// auth
import { useAuthContext } from "../../auth/use-auth-context";
// components
import Iconify from "../../components/iconify";

// ----------------------------------------------------------------------

export default function AuthWithSocial() {
	const { loginWithGoogle } = useAuthContext();

	const handleGoogleLogin = async () => {
		try {
			if (loginWithGoogle) {
				loginWithGoogle();
			}
			console.log("GOOGLE LOGIN");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div style={{ width: "100%" }}>
			<Divider
				sx={{
					my: 2.5,
					typography: "overline",
					color: "text.disabled",
					"&::before, ::after": {
						borderTopStyle: "dashed",
					},
				}}
			>
				OR
			</Divider>

			<Stack direction="row" justifyContent="center" spacing={2}>
				<Button
					variant="outlined"
					onClick={handleGoogleLogin}
					type="submit"
					sx={{ px: 3, py: 1, width: "100%" }}
				>
					<Stack direction="row" spacing={3}>
						<Iconify icon="devicon:google" />

						<Typography variant="body1" sx={{ fontWeight: "700" }}>
							Register with Google
						</Typography>
					</Stack>
				</Button>
			</Stack>
		</div>
	);
}
