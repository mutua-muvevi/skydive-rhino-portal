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
import { setClient } from "../../../../redux/slices/clients";
import ModalComponent from "../../../../components/modal/modal";
import Client from "../client/client";
import EditClient from "../edit/edit";
import DeleteClient from "../delete/delete";

const ClientCard = ({ client }) => {
	const theme = useTheme();

	const [openClient, setOpenClient] = useState(false);
	const [openEditClient, setOpenEditClient] = useState(false);
	const [openDeleteClient, setOpenDeleteClient] = useState(false);

	const dispatch = useDispatch();

	const handleSetClient = () => {
		dispatch(setClient(client));

		setOpenClient(true);
	};

	//edit Client
	const handleEditClient = () => {
		dispatch(setClient(client));

		setOpenEditClient(true);
	};

	//delete Client
	const handleDeleteClient = () => {
		dispatch(setClient(client));

		setOpenDeleteClient(true);
	};

	const modalActions = [
		{
			label: "Edit",
			icon: "uiw:edit",
			onClick: handleEditClient,
		},
		{
			label: "Delete",
			icon: "ic:baseline-delete",
			onClick: handleDeleteClient,
			color: "error",
		},
	];

	return (
		<>
			<Card>
				<CardActionArea sx={{ minHeight: 180 }} onClick={handleSetClient}>
					<CardContent>
						<Stack direction="row" spacing={3}>
							<Box
								sx={{
									position: "absolute",
									right: 0,
									top: 0,
									opacity: 0.2,
									zIndex: -1,
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
										{client.fullname}
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
										{client.email}
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
										{client.service ? client.service.name: "No service"}
									</Typography>
								</Stack>
							</Stack>
						</Stack>
					</CardContent>
				</CardActionArea>
			</Card>

			<ModalComponent
				open={openClient}
				onClose={() => setOpenClient(false)}
				title={`Client : ${client.fullname}`}
				fullWidth
				maxWidth="xl"
				actions={modalActions}
				backgroundIcon="fa-solid:funnel-dollar"
				height={600}
			>
				<Client onClose={() => setOpenClient(false)}/>
			</ModalComponent>

			{/* Edit Modal */}
			<ModalComponent
				open={openEditClient}
				onClose={() => setOpenEditClient(false)}
				title={`Edit : ${client.fullname}`}
				fullWidth
				maxWidth="lg"
				height={650}
			>
				<EditClient  onClose={() => setOpenEditClient(false)} />
			</ModalComponent>

			{/* Delete Modal */}
			<ModalComponent
				open={openDeleteClient}
				onClose={() => setOpenDeleteClient(false)}
				title={`Delete : ${client.fullname}?`}
				maxWidth="sm"
				height={200}
			>
				<DeleteClient onClose={() => setOpenDeleteClient(false)}/>
			</ModalComponent>
		</>
	);
};

ClientCard.propTypes = {
	client: PropTypes.object.isRequired,
};

export default ClientCard;
