import { Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { fDate } from "../../../../utils/format-time";
import Iframe from "../../../../components/iframe";

const Term = () => {
	const { setTerm: term } = useSelector((state) => state.terms);

	const termData = [
		{
			name: "Name",
			value: term.name ? term.name : "No term selected",
		},
		{
			name: "Type",
			value: term.type ? term.type : "No type",
		},
		{
			name: "Description",
			value: term.description ? term.description : "No description",
		},
		{
			name: "Created At",
			value: term.createdAt ? fDate(term.createdAt) : "No date",
		},
	];

	return (
		<Stack direction="column" spacing={3}>
			{termData.map((data) => (
				<Stack direction="column" key={data.value}>
					<Typography variant="subtitle1" color="primary">
						{data.name}
					</Typography>
					<Typography variant="body2">{data.value}</Typography>
				</Stack>
			))}

			{
				//check if file exists if so display it
				term.file ? (
					<Iframe
						src={term.file}
						title={term.name}
						style={{ height: "80vh" }}
						onError={(e) => console.log(e)}
					/>
				) : null
			}
		</Stack>
	);
};

export default Term;
