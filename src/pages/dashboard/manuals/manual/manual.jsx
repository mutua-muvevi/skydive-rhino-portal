import { Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { fDate } from "../../../../utils/format-time";
import Iframe from "../../../../components/iframe";

const Manual = () => {
	const { setManual: manual } = useSelector((state) => state.manuals);

	const manualData = [
		{
			name: "Name",
			value: manual.name ? manual.name : "No manual selected",
		},
		{
			name: "Type",
			value: manual.type ? manual.type : "No type",
		},
		{
			name: "Description",
			value: manual.description ? manual.description : "No description",
		},
		{
			name: "Created At",
			value: manual.createdAt ? fDate(manual.createdAt) : "No date",
		},
	];

	return (
		<Stack direction="column" spacing={3}>
			{manualData.map((data) => (
				<Stack direction="column" key={data.value}>
					<Typography variant="subtitle1" color="primary">
						{data.name}
					</Typography>
					<Typography variant="body2">{data.value}</Typography>
				</Stack>
			))}

			{
				//check if file exists if so display it
				manual.file ? (
					<Iframe
						src={manual.file}
						title={manual.name}
						style={{ height: "80vh" }}
						onError={(e) => console.log(e)}
					/>
				) : null
			}
		</Stack>
	);
};

export default Manual;
