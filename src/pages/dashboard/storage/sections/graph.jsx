// StorageOverviewGraph.js
import { Card, CardContent, CardHeader, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { processStorageDataForLineGraph  } from "../../../../utils/chart/storage";
import { ChartBar } from "../../../../components/chart/types";

const StorageOverviewGraph = () => {
	const theme = useTheme();

	// Fetching storage data from Redux
	const {
		me: { storage: storageData },
	} = useSelector((state) => state.user);

	// Process the storage data for the graph using the utility function
	const { series, categories } = processStorageDataForLineGraph (storageData);

	const chartColumnSingleData = {
		type: "bar",
		height: 450,
		series,
		options: {
			xaxis: {
				categories,
			},
			colors: [
				theme.palette.primary.main,
				theme.palette.chart.blue[1],
				theme.palette.warning.main,
				theme.palette.error.main,
				theme.palette.chart.green[1],
				theme.palette.secondary.main,
				theme.palette.success.main,
			],
			tooltip: {
				x: {
					format: "dd/MM/yy HH:mm",
				},
			},
		},
	};

	return (
		<Card>
			<CardHeader title="My Storage Overview" />
			<CardContent>
				<ChartBar  data={chartColumnSingleData} />
			</CardContent>
		</Card>
	);
};

export default StorageOverviewGraph;
