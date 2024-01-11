import { Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { fDate } from "../../../../utils/format-time";

const Lead = () => {
	const { setLead: lead } = useSelector((state) => state.leads);

	const leadData = [
		{
			name: "Name",
			value: lead.fullname ? lead.fullname : "No lead selected",
		},
		{
			name: "Email",
			value: lead.email ? lead.email : "No email",
		},
		{
			name: "Source",
			value: lead.leadSource ? lead.leadSource : "No source",
		},
		{
			name: "Service",
			value: lead.service ? lead.service.name : "No source",
		},
		{
			name: "Country",
			value: lead.country ? lead.country : "No country",
		},
		{
			name: "Created At",
			value: lead.createdAt ? fDate(lead.createdAt) : "No date",
		},
		{
			name: "Message",
			value: lead.message ? lead.message : "No message",
		},
	];

	return (
		<Stack direction="column" spacing={3}>
			{leadData.map((data) => (
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

export default Lead;
