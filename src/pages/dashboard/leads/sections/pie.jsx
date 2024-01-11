import { Card, CardContent, CardHeader } from "@mui/material";
import { ChartPie } from "../../../../components/chart/types";

import { useSelector } from "../../../../redux/store";
import { processPieChartData } from "../../../../utils/chart/pie";

const LeadPie = () => {

	//fetching reservations
	const {
		leads: { data: allLeads },
	} = useSelector((state) => state.leads);

	// Process the reservations data for the pie chart
	const { labels, series } = processPieChartData(allLeads);

	const chartPieData = {
		type: "pie",
		series,
		options: {
			labels,
			legend: {
				show: true,
				position: "bottom",
				horizontalAlign: "center",
			},
			responsive: [
				{
					breakpoint: 480,
					options: {
						chart: {
							width: 200,
						},
						legend: {
							position: "bottom",
						},
					},
				},
			],
		},
	};

	return (
		<Card>
			<CardHeader title="Leads as per Services" />
			<CardContent>
				<ChartPie data={chartPieData} />
			</CardContent>
		</Card>
	);
};

export default LeadPie;
