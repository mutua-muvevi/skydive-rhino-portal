import { Card, CardContent, CardHeader } from "@mui/material";
import { ChartColumnSingle } from "../../../../components/chart/types";

import { useSelector } from "../../../../redux/store";
import { processAnualCollumnData } from "../../../../utils/chart/column";

const LeadGraph = () => {
	const name = "Leads";

	//fetching clients
	const {
		clients : { data: clientsData },
	} = useSelector((state) => state.clients);

	// Process the clients data for the graph
	const { series, categories } = processAnualCollumnData(clientsData, name);

	const chartColumnSingleData = {
		type: "bar",
		height: 350,
		series,
		options: {
			plotOptions: {
				bar: {
					columnWidth: "25%",
				},
			},
			stroke: {
				show: false,
			},
			xaxis: {
				categories,
			},
			tooltip: {
				y: {
					formatter: (value) => `${value} clients`,
				},
			},
		},
	};

	return (
		<Card>
			<CardHeader title="Our Clients for the past 12 Months" />
			<CardContent>
				<ChartColumnSingle data={chartColumnSingleData} />
			</CardContent>
		</Card>
	);
};

export default LeadGraph;
