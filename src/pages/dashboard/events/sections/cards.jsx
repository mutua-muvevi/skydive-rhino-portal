import PropTypes from "prop-types";
import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Stack,
	Typography,
	useTheme,
} from "@mui/material";
import { sentenceCase } from "change-case";
import Iconify from "../../../../components/iconify";
import { useState } from "react";
import { useDispatch } from "../../../../redux/store";
import { setEvent } from "../../../../redux/slices/events";
import ModalComponent from "../../../../components/modal/modal";
import Event from "../event/event";
import EditEvent from "../edit/edit";
import DeleteEvent from "../delete/delete";
import { truncateStr } from "../../../../utils/format-string";

const EventsCards = ({ event }) => {
	const [openEvent, setOpenEvent] = useState(false);
	const [openEditEvent, setOpenEditEvent] = useState(false);
	const [openDeleteEvent, setOpenDeleteEvent] = useState(false);

	// const { name, type, file } = event;
	const name = event ? event.name : "";
	const date = event ? event.date : "";
	const venue = event ? event.venue : "";
	const description = event ? event.description : "";
	const thumbnail = event ? event.thumbnail : "";

	const theme = useTheme();

	const dispatch = useDispatch();

	const handleSetEvent = () => {
		dispatch(setEvent(event));

		setOpenEvent(true);
	};

	//edit Event
	const handleEditEvent = () => {
		dispatch(setEvent(event));

		setOpenEditEvent(true);
	};

	//delete Event
	const handleDeleteEvent = () => {
		dispatch(setEvent(event));

		setOpenDeleteEvent(true);
	};

	const modalActions = [
		{
			label: "Edit",
			icon: "uiw:edit",
			onClick: handleEditEvent,
		},
		{
			label: "Delete",
			icon: "ic:baseline-delete",
			onClick: handleDeleteEvent,
			color: "error",
		},
	];

	return (
		<>
			<Card>
				<CardActionArea onClick={handleSetEvent}>
					{thumbnail ? (
						<CardMedia
							component="img"
							height="200"
							image={thumbnail}
							alt={name}
						/>
					) : (
						<Box
							sx={{
								position: "absolute",
								right: 0,
								top: "10%",
								opacity: 0.2,
								zIndex: -1,
							}}
						>
							<Iconify
								icon="iconoir:book-solid"
								width={100}
								sx={{
									color: theme.palette.primary.main,
									height: "200",
								}}
							/>
						</Box>
					)}
					<CardContent>
						<Stack direction="column" spacing={2.4}>
							<Typography variant="subtitle1" color="primary">
								{name ? sentenceCase(name) : "no name provided"}
							</Typography>
							<Typography variant="body2" textAlign="justify">
								{description
									? truncateStr(
											sentenceCase(description),
											200
									)
									: "no description provided"}
							</Typography>

							<Stack direction="row" spacing={3}>
								<Typography variant="subtitle2" color="primary">
									Venue:
								</Typography>
								<Typography variant="body2">
									{venue
										? sentenceCase(venue)
										: "no venue provided"}
								</Typography>
							</Stack>

							<Stack direction="row" spacing={3}>
								<Typography variant="subtitle2" color="primary">
									Date:
								</Typography>
								<Typography variant="body2">
									{date
										? sentenceCase(date)
										: "no date provided"}
								</Typography>
							</Stack>
						</Stack>
					</CardContent>
				</CardActionArea>
			</Card>

			{/* Event Modal */}
			<ModalComponent
				open={openEvent}
				onClose={() => setOpenEvent(false)}
				title={`Event : ${event ? event.name : ""}`}
				fullWidth
				maxWidth="lg"
				actions={modalActions}
				backgroundIcon="fa-solid:funnel-dollar"
				height={500}
			>
				<Event onClose={() => setOpenEvent(false)} />
			</ModalComponent>

			{/* Edit Modal */}
			<ModalComponent
				open={openEditEvent}
				onClose={() => setOpenEditEvent(false)}
				title={`Edit Event: ${event ? event.name : ""}`}
				fullWidth
				maxWidth="lg"
				height={650}
			>
				<EditEvent onClose={() => setOpenEditEvent(false)} />
			</ModalComponent>

			{/* Delete Modal */}
			<ModalComponent
				open={openDeleteEvent}
				onClose={() => setOpenDeleteEvent(false)}
				title={`Delete Event: ${event ? event.name : ""}?`}
				maxWidth="sm"
				height={250}
			>
				<DeleteEvent onClose={() => setOpenDeleteEvent(false)} />
			</ModalComponent>
		</>
	);
};

EventsCards.propTypes = {
	event: PropTypes.object.isRequired,
};

export default EventsCards;
