import {
	Card,
	CardContent,
	CardHeader,
	Stack,
	Typography,
	useTheme,
} from "@mui/material";
import Chart from "../../../../components/chart";

import { useSelector } from "../../../../redux/store";
import { formatBytes } from "../../../../utils/format-bytes";

const totalAllocatedStorage = 4200000000;

const StorageOverviewSpeedometerGraph = () => {
	const {
		me: { totalStorage },
	} = useSelector((state) => state.user);
	const theme = useTheme();

	const storage = 7;
	const storagePercentage = parseInt((storage / totalAllocatedStorage) * 100);

	const chatOptions = {
		series: [storagePercentage],
		plotOptions: {
			radialBar: {
				startAngle: -135,
				endAngle: 225,
				hollow: {
					margin: 0,
					size: "70%",
					background: theme.palette.background.default,
					image: undefined,
					imageOffsetX: 0,
					imageOffsetY: 0,
					position: "front",
					dropShadow: {
						enabled: true,
						top: 3,
						left: 0,
						blur: 4,
						opacity: 0.24,
					},
				},
				track: {
					background: theme.palette.background.neutral,
					margin: 5, // margin is in pixels
					dropShadow: {
						enabled: true,
						top: -3,
						left: 0,
						blur: 4,
						opacity: 0.35,
					},
				},

				dataLabels: {
					show: true,
					name: {
						offsetY: -10,
						show: true,
						color: theme.palette.primary.main,
						fontSize: "17px",
					},
					value: {
						formatter: function (val) {
							return parseInt(val);
						},
						color: theme.palette.primary.main,
						fontSize: "36px",
						show: true,
					},
				},
			},
		},
		fill: {
			type: "gradient",
			gradient: {
				shade: "dark",
				type: "horizontal",
				shadeIntensity: 0.5,
				gradientToColors: [
					theme.palette.primary.main,
					theme.palette.secondary.main,
				],
				inverseColors: true,
				opacityFrom: 1,
				opacityTo: 1,
				stops: [0, 100],
			},
		},
		stroke: {
			lineCap: "round",
		},
		labels: ["Percent"],
	};

	return (
		<Card>
			<CardHeader title="Storage Used" />

			<CardContent>
				<div id="chart">
					<Chart
						options={chatOptions}
						series={chatOptions.series}
						type="radialBar"
						height={400}
					/>
				</div>
				{}
				<Stack direction="row" spacing={3} justifyContent="center">
					<Typography variant="h5" textAlign="center">
						Total Storage:
					</Typography>
					<Typography variant="h5" textAlign="center" color="primary">
						{formatBytes(totalStorage)}
					</Typography>
				</Stack>
				<Stack direction="row" spacing={3} justifyContent="center">
					<Typography variant="h5" textAlign="center">
						Available Storage:
					</Typography>
					<Typography
						variant="h5"
						textAlign="center"
						color={storagePercentage < 90 ? "primary" : "error"}
					>
						{formatBytes(totalAllocatedStorage - totalStorage)}
					</Typography>
				</Stack>
			</CardContent>
		</Card>
	);
};

export default StorageOverviewSpeedometerGraph;
