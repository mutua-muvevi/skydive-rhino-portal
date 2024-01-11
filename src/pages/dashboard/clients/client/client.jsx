import { Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { fDate } from "../../../../utils/format-time";

const Client = () => {
	const { setClient: client } = useSelector((state) => state.clients);

	const clientData = [
		{
			name: "Name",
			value: client.fullname ? client.fullname : "No client selected",
		},
		{
			name: "Email",
			value: client.email ? client.email : "No email",
		},
		{
			name: "Source",
			value: client.clientSource ? client.clientSource : "No source",
		},
		{
			name: "Service",
			value: client.service ? client.service.name : "No source",
		},
		{
			name: "Country",
			value: client.country ? client.country : "No country",
		},
		{
			name: "Created At",
			value: client.createdAt ? fDate(client.createdAt) : "No date",
		},
		{
			name: "Message",
			value: client.message ? client.message : "No message",
		},
	];

	return (
		<Stack direction="column" spacing={3}>
			{clientData.map((data) => (
				<Stack direction="column" key={data.value}>
					<Typography variant="subtitle1" color="primary">
						{data.name}
					</Typography>
					<Typography variant="body2">{data.value}</Typography>
				</Stack>
			))}
		</Stack>
	);
};

export default Client;
