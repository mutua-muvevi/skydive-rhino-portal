import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	Stack,
	Typography,
	useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import Iconify from "../../../../components/iconify";
import { useState } from "react";
import { useDispatch } from "../../../../redux/store";
import { setLead } from "../../../../redux/slices/leads";
import ModalComponent from "../../../../components/modal/modal";
import Lead from "../lead/lead";
import EditLead from "../edit/edit";
import DeleteLead from "../delete/delete";
import ConvertLead from "../convert/convert";

const LeadCard = ({ lead }) => {
	const theme = useTheme();

	const [openLead, setOpenLead] = useState(false);
	const [openEditLead, setOpenEditLead] = useState(false);
	const [openDeleteLead, setOpenDeleteLead] = useState(false);
	const [openConvertLeadToClient, setOpenConvertLeadToClient] =useState(false);

	const dispatch = useDispatch();

	const handleSetLead = () => {
		dispatch(setLead(lead));

		setOpenLead(true);
	};

	//edit Lead
	const handleEditLead = () => {
		dispatch(setLead(lead));

		setOpenEditLead(true);
	};

	//delete Lead
	const handleDeleteLead = () => {
		dispatch(setLead(lead));

		setOpenDeleteLead(true);
	};

	//convert to client
	const handleConvertToClient = () => {
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
			<Card>
				<CardActionArea sx={{ minHeight: 180 }} onClick={handleSetLead}>
					<CardContent>
						<Stack direction="row" spacing={3}>
							<Box
								sx={{
									position: "absolute",
									right: 0,
									top: 0,
									opacity: 0.2,
								}}
							>
								<Iconify
									icon="fa-solid:funnel-dollar"
									width={150}
									sx={{ color: theme.palette.primary.main }}
								/>
							</Box>

							<Stack direction="column" spacing={1}>
								<Stack direction="row" spacing={3}>
									<Typography
										variant="subtitle2"
										color="primary"
									>
										Name :
									</Typography>
									<Typography variant="body2">
										{lead.fullname}
									</Typography>
								</Stack>
								<Stack direction="row" spacing={3}>
									<Typography
										variant="subtitle2"
										color="primary"
									>
										Email :
									</Typography>
									<Typography
										variant="body2"
										color="text.secondary"
									>
										{lead.email}
									</Typography>
								</Stack>
								<Stack direction="row" spacing={3}>
									<Typography
										variant="subtitle2"
										color="primary"
									>
										Service:
									</Typography>
									<Typography variant="body2">
										{lead.service ? lead.service.name: "No service"}
									</Typography>
								</Stack>
							</Stack>
						</Stack>
					</CardContent>
				</CardActionArea>
			</Card>

			<ModalComponent
				open={openLead}
				onClose={() => setOpenLead(false)}
				title={`Lead : ${lead.fullname}`}
				fullWidth
				maxWidth="xl"
				actions={modalActions}
				backgroundIcon="fa-solid:funnel-dollar"
				height={600}
			>
				<Lead onClose={() => setOpenLead(false)}/>
			</ModalComponent>

			{/* Edit Modal */}
			<ModalComponent
				open={openEditLead}
				onClose={() => setOpenEditLead(false)}
				title={`Edit : ${lead.fullname}`}
				fullWidth
				maxWidth="lg"
				height={650}
			>
				<EditLead  onClose={() => setOpenEditLead(false)} />
			</ModalComponent>

			{/* Delete Modal */}
			<ModalComponent
				open={openDeleteLead}
				onClose={() => setOpenDeleteLead(false)}
				title={`Delete : ${lead.fullname}?`}
				maxWidth="sm"
				height={200}
			>
				<DeleteLead onClose={() => setOpenDeleteLead(false)}/>
			</ModalComponent>

			{/* Convert to Client Modal */}
			<ModalComponent
				open={openConvertLeadToClient}
				onClose={() => setOpenConvertLeadToClient(false)}
				title="Convert a Lead to Client"
				fullWidth
				maxWidth="sm"
				height={200}
			>
				<ConvertLead onClose={() => setOpenConvertLeadToClient(false)}/>
			</ModalComponent>
		</>
	);
};

LeadCard.propTypes = {
	lead: PropTypes.object.isRequired,
};

export default LeadCard;
