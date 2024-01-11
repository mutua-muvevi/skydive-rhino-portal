import { Card, CardContent, CardHeader, useTheme } from "@mui/material";
import ChartArea from "../../../../../components/chart/types/chart-area"; 

import { useSelector } from "../../../../../redux/store";

const StorageBannerGraph = () => {
	const { me : { storage } } = useSelector((state) => state.user);
	const theme = useTheme();
	console.log("Storage", storage);

	const chartAreaData = {
		type: "area",
		height: 450,
		series: [
			{ name: "code", data: [31, 40, 28, 51, 42, 109, 100] },
			{ name: "website", data: [11, 32, 45, 32, 34, 52, 41] },
			{ name: "spreadsheet", data: [12, 37, 70, 44, 64, 42, 30] },
			{ name: "design", data: [25, 48, 35, 60, 45, 70, 55] },
			{ name: "videos", data: [30, 55, 45, 35, 60, 75, 65] },
			{ name: "presentations", data: [20, 40, 50, 45, 55, 65, 60] },
			{ name: "documents", data: [15, 35, 40, 50, 45, 55, 50] },
			{ name: "images", data: [22, 47, 55, 40, 65, 60, 70] },
		],
		options: {
			xaxis: {
				type: "datetime",
				categories: [
					"2018-09-19",
					"2018-09-20",
					"2018-09-21",
					"2018-09-22",
					"2018-09-23",
					"2018-09-24",
					"2018-09-25",
				],
			},
			colors: [
				theme.palette.primary.main,
				theme.palette.warning.main,
				theme.palette.error.main,
				theme.palette.chart.blue[1],
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
				<ChartArea data={chartAreaData} />
			</CardContent>
		</Card>
	);
};

export default StorageBannerGraph;
