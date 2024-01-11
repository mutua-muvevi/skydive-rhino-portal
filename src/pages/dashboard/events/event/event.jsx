import { CardMedia, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { fDate } from "../../../../utils/format-time";

const Manual = () => {
	const { setEvent: event } = useSelector((state) => state.events);

	const eventData = [
		{
			name: "Name",
			value: event.name ? event.name : "No event selected",
		},
		{
			name: "Date",
			value: event.date ? event.date : "No date",
		},
		{
			name: "Venue",
			value: event.venue ? event.venue : "No venue",
		},
		{
			name: "Description",
			value: event.description ? event.description : "No description",
		},
		{
			name: "Created At",
			value: event.createdAt ? fDate(event.createdAt) : "No date",
		},
	];

	return (
		<Stack direction="column" spacing={3}>
			{eventData.map((data) => (
				<Stack direction="column" key={data.value}>
					<Typography variant="subtitle1" color="primary">
						{data.name}
					</Typography>
					<Typography variant="body2">{data.value}</Typography>
				</Stack>
			))}

			{
				//check if thumbnail exists if so display it
				event.thumbnail ? (
					<CardMedia
						component="image"
						src={event.thumbnail}
						title={event.name}
						style={{ height: "80vh" }}
						onError={(e) => console.log(e)}
					/>
				) : null
			}
		</Stack>
	);
};

export default Manual;
