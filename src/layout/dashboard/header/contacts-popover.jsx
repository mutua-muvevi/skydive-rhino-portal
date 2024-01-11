import { useState } from "react";
// @mui
import { alpha } from "@mui/material/styles";
import {
	Typography,
	ListItemText,
	ListItemAvatar,
	MenuItem,
} from "@mui/material";
// utils
import { fToNow } from "../../../utils/format-time";
// components
import { CustomAvatar } from "../../../components/custom-avatar";
import Iconify from "../../../components/iconify";
import Scrollbar from "../../../components/scrollbar";
import MenuPopover from "../../../components/menu-popover";
import BadgeStatus from "../../../components/badge-status";
import { IconButtonAnimate } from "../../../components/animate";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "../../../redux/store";
import { setLead } from "../../../redux/slices/leads";
import ModalComponent from "../../../components/modal/modal";
import Lead from "../../../pages/dashboard/leads/lead/lead";

// ----------------------------------------------------------------------

const ITEM_HEIGHT = 64;

export default function ContactsPopover() {
	const theme = useTheme();

	const {
		leads: { data: allLeads },
	} = useSelector((state) => state.leads);
	const { setLead : lead } = useSelector((state) => state.leads);

	const dispatch = useDispatch();

	const [openPopover, setOpenPopover] = useState(null);
	const [openLead, setOpenLead] = useState(null);
	const [openEditLead, setOpenEditLead] = useState(false);
	const [openDeleteLead, setOpenDeleteLead] = useState(false);
	const [openConvertLeadToClient, setOpenConvertLeadToClient] =useState(false);

	const handleOpenPopover = (event) => {
		setOpenPopover(event.currentTarget);
	};

	const handleClosePopover = () => {
		setOpenPopover(null);
	};

	//filter all leads to get the ones that have leadSource as "Conrtact Form"
	const contacts = allLeads.filter(
		(lead) => lead.leadSource === "Contact Form"
	);

	const handleSetLead = (lead) => {
		dispatch(setLead(lead));

		setOpenLead(true);
	};

	//edit Lead
	const handleEditLead = (lead) => {
		dispatch(setLead(lead));

		setOpenEditLead(true);
	};

	//delete Lead
	const handleDeleteLead = (lead) => {
		dispatch(setLead(lead));

		setOpenDeleteLead(true);
	};

	//convert to client
	const handleConvertToClient = (lead) => {
		dispatch(setLead(lead));

		setOpenConvertLeadToClient(true);
	};

	const modalActions = [
		{
			label: "Edit",
			icon: "uiw:edit",
			onClick: handleEditLead,
		},
		{
			label: "Convert to Client",
			icon: "mdi:user-convert",
			onClick: handleConvertToClient,
			color: "success",
		},
		{
			label: "Delete",
			icon: "ic:baseline-delete",
			onClick: handleDeleteLead,
			color: "error",
		},
	];

	return (
		<>
			<IconButtonAnimate
				color={openPopover ? "primary" : "default"}
				onClick={handleOpenPopover}
				sx={{
					width: 40,
					height: 40,
					...(openPopover && {
						bgcolor: (theme) =>
							alpha(
								theme.palette.primary.main,
								theme.palette.action.focusOpacity
							),
					}),
				}}
			>
				<Iconify
					icon="eva:people-fill"
					sx={{
						color:
							theme.palette.mode === "light"
								? theme.palette.grey[900]
								: theme.palette.text.secondary,
					}}
				/>
			</IconButtonAnimate>

			<MenuPopover
				open={openPopover}
				onClose={handleClosePopover}
				sx={{ width: 320 }}
			>
				<Typography variant="h6" sx={{ p: 1.5 }}>
					Contacts{" "}
					<Typography component="span">
						({contacts.length})
					</Typography>
				</Typography>

				<Scrollbar sx={{ height: ITEM_HEIGHT * 6 }}>
					{contacts.map((contact) => (
						<MenuItem
							key={contact._id}
							sx={{ height: ITEM_HEIGHT }}
							onClick={() => handleSetLead(contact)}
						>
							<ListItemAvatar>
								<CustomAvatar
									alt={contact?.fullname}
									name={contact?.fullname}
									//if createdAt is less than 1 day ago, then indicate that the contact is new in badgeprops
									BadgeProps={{
										badgeContent: (
											<BadgeStatus
												status={
													contact.createdAt >
													Date.now() - 86400000
														? "new"
														: ""
												}
											/>
										),
									}}
								/>
							</ListItemAvatar>

							<ListItemText
								primary={contact.fullname}
								secondary={
									contact.status === "offline"
										? fToNow(contact.lastActivity)
										: ""
								}
								primaryTypographyProps={{
									typography: "subtitle2",
									sx: { mb: 0.25 },
								}}
								secondaryTypographyProps={{
									typography: "caption",
								}}
							/>
						</MenuItem>
					))}
				</Scrollbar>
			</MenuPopover>

			<ModalComponent
				open={openLead}
				onClose={() => setOpenLead(false)}
				title={`Lead `}
				fullWidth
				maxWidth="xl"
				backgroundIcon="fa-solid:funnel-dollar"
				height={600}
			>
				<Lead onClose={() => setOpenLead(false)}/>
			</ModalComponent>
		</>
	);
}
