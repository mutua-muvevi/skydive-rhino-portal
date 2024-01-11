import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
// @mui
import { List } from "@mui/material";
// routes
import { PATH_DASHBOARD } from "../../../routes/path";
// hooks
import useResponsive from "../../../hooks/use-responsive";
// components
import { SkeletonConversationItem } from "../../../components/skeleton";
//
import ChatNavItem from "./chat-nav-item";

// ----------------------------------------------------------------------

const CURRENT_USER_ID = "8864c717-587d-472a-929a-8e5f298024da-0";


const ChatNavList = ({
	conversations,
	openNav,
	onCloseNav,
	selected,
	sx,
	...other
}) => {
	const navigate = useNavigate();

	const isDesktop = useResponsive("up", "md");

	const handleSelectConversation = (conversationId) => {
		let conversationKey = "";

		const conversation = conversations.byId[conversationId];

		if (conversation.type === "GROUP") {
			conversationKey = conversation.id;
		} else {
			const otherParticipant = conversation.participants.find(
				(participant) => participant.id !== CURRENT_USER_ID
			);

			if (otherParticipant?.username) {
				conversationKey = otherParticipant?.username;
			}
		}
		console.log(PATH_DASHBOARD.chat.view(conversationKey));
		navigate(`/chat-playground/${(conversationKey)}`);
		console.log(`/chat-playground/${(conversationKey)}`);
	};

	const loading = !conversations.allIds.length;

	return (
		<List disablePadding sx={sx} {...other}>
			{(loading ? [...Array(12)] : conversations.allIds).map(
				(conversationId, index) =>
					conversationId ? (
						<ChatNavItem
							key={conversationId}
							openNav={openNav}
							conversation={conversations.byId[conversationId]}
							isSelected={selected(conversationId)}
							onSelect={() => {
								if (!isDesktop) {
									onCloseNav();
								}
								handleSelectConversation(conversationId);
							}}
						/>
					) : (
						<SkeletonConversationItem key={index} />
					)
			)}
		</List>
	);
}

// ----------------------------------------------------------------------

ChatNavList.propTypes = {
	conversations: PropTypes.object.isRequired,
	openNav: PropTypes.bool,
	onCloseNav: PropTypes.func,
	selected: PropTypes.func,
	sx: PropTypes.object,
};

export default ChatNavList;