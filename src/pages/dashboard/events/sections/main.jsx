import { Button, Grid, Typography } from "@mui/material";
import EventsCards from "./cards";
import Iconify from "../../../../components/iconify";
import { useState } from "react";
import ModalComponent from "../../../../components/modal/modal";
import NewEvent from "../new/new";
import { useSelector } from "../../../../redux/store";

const EventsMain = () => {
	const [ openEvent, setOpenEvent ] = useState(false);

	const { events: { data: allEvents } } = useSelector((state) => state.events);

	const handleOpenEvent = () => {
		setOpenEvent(true);
	}

	return (
		<>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Button
						variant="contained"
						color="primary"
						endIcon={<Iconify icon="ic:baseline-plus" />}
						onClick={handleOpenEvent}
					>
						Add a new event
					</Button>
				</Grid>
				{allEvents ? allEvents.map((event) => (
					<Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={event._id}>
						<EventsCards event={event}/>
					</Grid>
				)): (
					<Typography variant="body1" color="primary">
						No events found
					</Typography>
				) }
			</Grid>

			<ModalComponent
				open={openEvent}
				onClose={() => setOpenEvent(false)}
				title="Add a new event"
				maxWidth="lg"
				height={620}
			>
				<NewEvent />
			</ModalComponent>
		</>
	);
};

export default EventsMain;
