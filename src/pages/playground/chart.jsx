import {
	Card,
	CardContent,
	CardHeader,
	Container,
	Grid,
	Stack,
	Typography,
} from "@mui/material";
import {
	ChartArea,
	ChartBar,
	ChartColumnMultiple,
	ChartColumnNegative,
	ChartColumnSingle,
	ChartColumnStacked,
	ChartDonut,
	ChartLine,
	ChartMixed,
	ChartPie,
	ChartRadialBar,
} from "../../components/chart/types";
import { useTheme } from "@emotion/react";
import { fNumber } from "../../utils/format-number";

const chartAreaData = {
	type: "area",
	height: 350,
	series: [
		{ name: "series1", data: [31, 40, 28, 51, 42, 109, 100] },
		{ name: "series2", data: [11, 32, 45, 32, 34, 52, 41] },
	],
	options: {
		xaxis: {
			type: "datetime",
			categories: [
				"2018-09-19T00:00:00.000Z",
				"2018-09-19T01:30:00.000Z",
				"2018-09-19T02:30:00.000Z",
				"2018-09-19T03:30:00.000Z",
				"2018-09-19T04:30:00.000Z",
				"2018-09-19T05:30:00.000Z",
				"2018-09-19T06:30:00.000Z",
			],
		},
		tooltip: {
			x: {
				format: "dd/MM/yy HH:mm",
			},
		},
	},
};

const chartBarData = {
	type: "bar",
	height: 350,
	series: [{ data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380] }],
	options: {
		stroke: { show: false },
		plotOptions: {
			bar: { horizontal: true, barHeight: "50%" },
		},
		xaxis: {
			categories: [
				"Italy",
				"Japan",
				"China",
				"Canada",
				"France",
				"Germany",
				"South Korea",
				"Netherlands",
				"United States",
				"United Kingdom",
			],
		},
	},
};

const chartLineData = {
	type: "line",
	height: 350,
	series: [
		{
			name: "Desktops",
			data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
		},
	],
	options: {
		xaxis: {
			categories: [
				"Jan",
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Aug",
				"Sep",
			],
		},
		tooltip: {
			x: {
				show: false,
			},
			marker: { show: false },
		},
	},
};

const chartColumnSingleData = {
	type: "bar",
	height: 350,
	series: [
		{
			name: "Net Profit",
			data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
		},
	],
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
			categories: [
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Aug",
				"Sep",
				"Oct",
			],
		},
		tooltip: {
			y: {
				formatter: (value) => `$ ${value} thousands`,
			},
		},
	},
};

const chartColumnMultipleData = {
	type: "bar",
	height: 350,
	series: [
		{
			name: "Net Profit",
			data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
		},
		{ name: "Revenue", data: [76, 85, 101, 98, 87, 105, 91, 114, 94] },
	],
	options: {
		plotOptions: {
			bar: {
				columnWidth: "30%",
			},
		},
		stroke: {
			show: false,
		},
		xaxis: {
			categories: [
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Aug",
				"Sep",
				"Oct",
			],
		},
		tooltip: {
			y: {
				formatter: (value) => `$ ${value} thousands`,
			},
		},
	},
};

const chartStackedData = {
	type: "bar",
	height: 350,
	series: [
		{ name: "Product A", data: [44, 55, 41, 67, 22, 43] },
		{ name: "Product B", data: [13, 23, 20, 8, 13, 27] },
		{ name: "Product C", data: [11, 17, 15, 15, 21, 14] },
		{ name: "Product D", data: [21, 7, 25, 13, 22, 8] },
	],
	options: {
		chart: {
			stacked: true,
			zoom: {
				enabled: true,
			},
		},
		legend: {
			itemMargin: {
				vertical: 8,
			},
			position: "right",
			offsetY: 20,
		},
		plotOptions: {
			bar: {
				columnWidth: "25%",
			},
		},
		stroke: {
			show: false,
		},
		xaxis: {
			type: "datetime",
			categories: [
				"01/01/2011 GMT",
				"01/02/2011 GMT",
				"01/03/2011 GMT",
				"01/04/2011 GMT",
				"01/05/2011 GMT",
				"01/06/2011 GMT",
			],
		},
	},
};

const ChartPlayGround = () => {
	const theme = useTheme();

	const chartRadialBarData = {
		type: "radialBar",
		height: 350,
		series: [44, 55, 67, 83],
		options: {
			labels: ["Apples", "Oranges", "Bananas", "Berries"],
			fill: {
				type: "gradient",
				gradient: {
					colorStops: [
						[
							{ offset: 0, color: theme.palette.primary.light },
							{ offset: 100, color: theme.palette.primary.main },
						],
						[
							{ offset: 0, color: theme.palette.info.light },
							{ offset: 100, color: theme.palette.info.main },
						],
						[
							{ offset: 0, color: theme.palette.success.light },
							{ offset: 100, color: theme.palette.success.main },
						],
						[
							{ offset: 0, color: theme.palette.error.light },
							{ offset: 100, color: theme.palette.error.main },
						],
					],
				},
			},
			legend: {
				horizontalAlign: "center",
			},
			plotOptions: {
				radialBar: {
					hollow: {
						size: "68%",
					},
					dataLabels: {
						value: {
							offsetY: 16,
						},
						total: {
							formatter: () => fNumber(2324),
						},
					},
				},
			},
		},
	};

	const chartPieData = {
		type: "pie",
		series: [44, 55, 13, 43, 22],
		options: {
			labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
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

	const chartDonutData = {
		type: "donut",
		series: [44, 55, 13, 43, 22],
		options: {
			labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
			legend: {
				show: true,
				position: "bottom",
				horizontalAlign: "center",
			},
			stroke: {
				show: false,
			},
			plotOptions: {
				pie: {
					donut: {
						size: "90%",
					},
				},
			},
		},
	};

	const chartColumnNegative = {
		type: "bar",
		height: 350,
		series: [
			{
				name: "Cash Flow",
				data: [
					1.45, 5.42, 5.9, -0.42, -12.6, -18.1, -18.2, -14.16, -11.1,
					-6.09, 0.34, 3.88, 13.07, 5.8, 2, 7.37, 8.1, 13.57, 15.75,
					17.1, 19.8, -27.03, -54.4, -47.2, -43.3, -18.6, -48.6,
					-41.1, -39.6, -37.6, -29.4, -21.4, -2.4,
				],
			},
		],
		options: {
			stroke: { show: false },
			yaxis: {
				labels: {
					formatter: (value) => `${value.toFixed(0)}%`,
				},
			},
			xaxis: {
				type: "datetime",
				categories: [
					"2011-01-01",
					"2011-02-01",
					"2011-03-01",
					"2011-04-01",
					"2011-05-01",
					"2011-06-01",
					"2011-07-01",
					"2011-08-01",
					"2011-09-01",
					"2011-10-01",
					"2011-11-01",
					"2011-12-01",
					"2012-01-01",
					"2012-02-01",
					"2012-03-01",
					"2012-04-01",
					"2012-05-01",
					"2012-06-01",
					"2012-07-01",
					"2012-08-01",
					"2012-09-01",
					"2012-10-01",
					"2012-11-01",
					"2012-12-01",
					"2013-01-01",
					"2013-02-01",
					"2013-03-01",
					"2013-04-01",
					"2013-05-01",
					"2013-06-01",
					"2013-07-01",
					"2013-08-01",
					"2013-09-01",
				],
			},
			plotOptions: {
				bar: {
					columnWidth: "58%",
					colors: {
						ranges: [
							{
								from: -100,
								to: -46,
								color: theme.palette.warning.main,
							},
							{
								from: -45,
								to: 0,
								color: theme.palette.info.main,
							},
						],
					},
				},
			},
		},
	};

	const mixedChartData = {
		type: "line",
		height: 600,
		series: [
			{
				name: "Team A",
				type: "column",
				data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
			},
			{
				name: "Team B",
				type: "area",
				data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
			},
			{
				name: "Team C",
				type: "line",
				data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
			},
		],
		options: {
			stroke: {
				width: [0, 2, 3],
			},
			plotOptions: {
				bar: { columnWidth: "20%" },
			},
			fill: {
				type: ["solid", "gradient", "solid"],
			},
			labels: [
				"01/01/2003",
				"02/01/2003",
				"03/01/2003",
				"04/01/2003",
				"05/01/2003",
				"06/01/2003",
				"07/01/2003",
				"08/01/2003",
				"09/01/2003",
				"10/01/2003",
				"11/01/2003",
			],
			xaxis: {
				type: "datetime",
			},
			yaxis: {
				title: { text: "Points" },
				min: 0,
			},
			tooltip: {
				shared: true,
				intersect: false,
				y: {
					formatter: (value) => {
						if (typeof value !== "undefined") {
							return `${value.toFixed(0)} points`;
						}
						return value;
					},
				},
			},
		},
	};

	return (
		<Container maxWidth="xl" sx={{ marginTop: "50px" }}>
			<Stack
				direction="column"
				spacing={5}
				justifyContent="center"
				alignItems="flex-start"
				sx={{ height: "100%", paddingBottom: "50px" }}
			>
				<Typography variant="h3" sx={{ textAlign: "center" }}>
					Form Components
				</Typography>

				<div>
					<Grid container spacing={3}>
						<Grid item xs={12} md={6}>
							<Card>
								<CardHeader title="Area Chart" />
								<CardContent>
									<ChartArea data={chartAreaData} />
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={12} md={6}>
							<Card>
								<CardHeader title="Line Chart" />
								<CardContent>
									<ChartLine data={chartLineData} />
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={12} md={6}>
							<Card>
								<CardHeader title="Single Column Chart" />
								<CardContent>
									<ChartColumnSingle
										data={chartColumnSingleData}
									/>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={12} md={6}>
							<Card>
								<CardHeader title="Multiple Columns Chart" />
								<CardContent>
									<ChartColumnMultiple
										data={chartColumnMultipleData}
									/>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={12} md={6}>
							<Card>
								<CardHeader title="Column Stacked Chart" />
								<CardContent>
									<ChartColumnStacked
										data={chartStackedData}
									/>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={12} md={6}>
							<Card>
								<CardHeader title="Bar Chart" />
								<CardContent>
									<ChartBar data={chartBarData} />
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={12} md={6}>
							<Card>
								<CardHeader title="Radial Bar Chart" />
								<CardContent>
									<ChartRadialBar data={chartRadialBarData} />
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={12} md={6}>
							<Card>
								<CardHeader title="Pie Chart" />
								<CardContent>
									<ChartPie data={chartPieData} />
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={12} md={6}>
							<Card>
								<CardHeader title="Donut Chart" />
								<CardContent>
									<ChartDonut data={chartDonutData} />
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={12} md={6}>
							<Card>
								<CardHeader title="Column Negative Chart" />
								<CardContent>
									<ChartColumnNegative
										data={chartColumnNegative}
									/>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={12} md={12}>
							<Card>
								<CardHeader title="Mixed Chart Chart" />
								<CardContent>
									<ChartMixed data={mixedChartData} />
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				</div>
			</Stack>
		</Container>
	);
};

export default ChartPlayGround;
