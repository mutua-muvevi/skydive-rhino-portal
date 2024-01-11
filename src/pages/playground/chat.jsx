import { Container, Stack, Typography } from "@mui/material";
import { Chat } from "../../modules/chat";

const ChatModule = () => {
	return (
		<Container maxWidth="xl" sx={{ my: "50px" }}>
			<Stack spacing={3} sx={{ pb: "50px", height:"500px" }}>
				<Typography variant="h3" textAlign="left">
					Reusable Chat
				</Typography>

				<Chat/>
			</Stack>
		</Container>
	);
};

export default ChatModule;
