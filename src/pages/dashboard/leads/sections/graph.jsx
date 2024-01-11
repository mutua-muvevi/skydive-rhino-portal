import { Card, CardContent, CardHeader } from "@mui/material";
import { ChartColumnSingle } from "../../../../components/chart/types";

import { useSelector } from "../../../../redux/store";
import { processAnualCollumnData } from "../../../../utils/chart/column";

const LeadGraph = () => {
	const name = "Leads";

	//fetching leads
	const {
		leads : { data: leadsData },
	} = useSelector((state) => state.leads);

	// Process the leads data for the graph
	const { series, categories } = processAnualCollumnData(leadsData, name);

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
					formatter: (value) => `${value} leads`,
				},
			},
		},
	};

	return (
		<Card>
			<CardHeader title="Our Leads for the past 12 Months" />
			<CardContent>
				<ChartColumnSingle data={chartColumnSingleData} />
			</CardContent>
		</Card>
	);
};

export default LeadGraph;
