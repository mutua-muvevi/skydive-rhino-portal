import { Card, CardContent, CardHeader } from "@mui/material";
import { ChartColumnSingle } from "../../../../components/chart/types";

import { useSelector } from "../../../../redux/store";
import { processAnualCollumnData } from "../../../../utils/chart/column";

const BookingGraph = () => {
	const name = "Reservations";

	//fetching reservations
	const {
		reservations: { data: reservationsData },
	} = useSelector((state) => state.reservations);


	// Process the reservations data for the graph
	const { series, categories } = processAnualCollumnData(reservationsData, name);

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
				categories
			},
			tooltip: {
				y: {
					formatter: (value) => `${value} reservations`,
				},
			},
		},
	};

	return (
		<Card>
			<CardHeader title="Reservations for the last 12 months" />
			<CardContent>
				<ChartColumnSingle data={chartColumnSingleData} />
			</CardContent>
		</Card>
	);
};

export default BookingGraph;
