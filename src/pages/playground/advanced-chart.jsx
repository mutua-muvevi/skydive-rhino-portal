import {
	Card,
	Container,
	Grid,
	Stack,
	Typography,
	useTheme,
} from "@mui/material";
import Mapchart from "../../components/advanced-chart/mapchart";
import Ganttchart from "../../components/advanced-chart/ganttchart";
import TreeViewComponent from "../../components/tree-view/tree-view";

const AdvancedChartPlayGround = () => {
	const theme = useTheme();

	const mapChartData = {
		height: "500px",
		series: [
			["Country", "Popularity"],
			["Germany", 200],
			["United States", 300],
			["Brazil", 400],
			["Canada", 500],
			["France", 600],
			["RU", 700],
			["India", 800],
			["United Kingdom", 900],
			["Kenya", 1500],
		],
		options: {
			colorAxis: { colors: [theme.palette.primary.main] },
			backgroundColor: "#81d4fa",
			datalessRegionColor: "#f8bbd0",
			defaultColor: "#f5f5f5",
		},
	};

	const ganttChartData = {
		columns: [
			{ type: "string", label: "Task ID" },
			{ type: "string", label: "Task Name" },
			{ type: "string", label: "Resource" },
			{ type: "date", label: "Start Date" },
			{ type: "date", label: "End Date" },
			{ type: "number", label: "Duration" },
			{ type: "number", label: "Percent Complete" },
			{ type: "string", label: "Dependencies" },
		],
		rows: [
			[
				"Research",
				"Find sources",
				null,
				new Date(2023, 2, 1),
				new Date(2023, 2, 5),
				null,
				100,
				null,
			],
			[
				"Write",
				"Write paper",
				"write",
				null,
				new Date(2023, 2, 9),
				3 * 24 * 60 * 60 * 1000,
				75,
				"Research,Outline",
			],
			[
				"Cite",
				"Create bibliography",
				"write",
				null,
				new Date(2023, 2, 7),
				1 * 24 * 60 * 60 * 1000,
				20,
				"Research",
			],
			[
				"Complete",
				"Hand in paper",
				"complete",
				null,
				new Date(2023, 2, 10),
				1 * 24 * 60 * 60 * 1000,
				0,
				"Cite,Write",
			],
			[
				"Outline",
				"Outline paper",
				"write",
				null,
				new Date(2023, 2, 6),
				1 * 24 * 60 * 60 * 1000,
				50,
				"Research",
			],
			[
				"Push to prod",
				"Push to production",
				"write",
				null,
				new Date(2023, 2, 6),
				1 * 24 * 60 * 60 * 1000,
				2,
				"Research",
			],
		],
		options: {
			gantt: {
				criticalPathEnabled: false, // Critical path arrows will be the same as other arrows.
				arrow: {
					angle: 45,
					width: 5,
					color: theme.palette.primary.main,
					radius: 10,
				},
				barHeight: 30,
				innerGridTrack: { fill: theme.palette.grey[200] },
				innerGridDarkTrack: { fill: theme.palette.grey[300] },
				defaultStartDate: new Date(2023, 2, 1),
				labelStyle: {
					fontName: "Roboto",
					fontSize: 16,
					color: theme.palette.text.primary,
					bold: true,
				},
			},
			backgroundColor: {
				fill: theme.palette.grey[100],
			},
		},
	};

	const treeviewData = [
		{
			nodeId: "1",
			label: "react-project",
			children: [
				{
					nodeId: "2",
					label: "public",
					children: [
						{ nodeId: "3", label: "index.html" },
						{ nodeId: "4", label: "favicon.ico" },
						{ nodeId: "5", label: "manifest.json" },
					],
				},
				{
					nodeId: "6",
					label: "src",
					children: [
						{ nodeId: "7", label: "index.js" },
						{ nodeId: "8", label: "App.js" },
						{ nodeId: "9", label: "App.css" },
						{ nodeId: "10", label: "App.test.js" },
						{
							nodeId: "11",
							label: "components",
							children: [
								{
									nodeId: "12",
									label: "Header",
									children: [
										{ nodeId: "13", label: "Header.js" },
										{ nodeId: "14", label: "Header.css" },
									],
								},
								{
									nodeId: "15",
									label: "Footer",
									children: [
										{ nodeId: "16", label: "Footer.js" },
										{ nodeId: "17", label: "Footer.css" },
									],
								},
								{
									nodeId: "18",
									label: "UI",
									children: [
										{
											nodeId: "19",
											label: "Buttons",
											children: [
												{
													nodeId: "20",
													label: "Button.js",
												},
												{
													nodeId: "21",
													label: "Button.css",
												},
											],
										},
										{
											nodeId: "22",
											label: "Cards",
											children: [
												{
													nodeId: "23",
													label: "Card.js",
												},
												{
													nodeId: "24",
													label: "Card.css",
												},
												{
													nodeId: "25",
													label: "SpecialCard",
													children: [
														{
															nodeId: "26",
															label: "SpecialCard.js",
														},
														{
															nodeId: "27",
															label: "SpecialCard.css",
														},
														{
															nodeId: "28",
															label: "Details",
															children: [
																{
																	nodeId: "29",
																	label: "Details.js",
																},
																{
																	nodeId: "30",
																	label: "Details.css",
																},
																{
																	nodeId: "31",
																	label: "SubDetails",
																	children: [
																		{
																			nodeId: "32",
																			label: "SubDetails.js",
																		},
																		{
																			nodeId: "33",
																			label: "SubDetails.css",
																		},
																	],
																},
															],
														},
													],
												},
											],
										},
									],
								},
							],
						},
						{
							nodeId: "34",
							label: "helpers",
							children: [
								{ nodeId: "35", label: "util.js" },
								{ nodeId: "36", label: "dataFormatter.js" },
							],
						},
						{
							nodeId: "37",
							label: "assets",
							children: [
								{
									nodeId: "38",
									label: "images",
									children: [
										{ nodeId: "39", label: "logo.svg" },
										{ nodeId: "40", label: "banner.jpg" },
									],
								},
								{
									nodeId: "41",
									label: "styles",
									children: [
										{ nodeId: "42", label: "main.css" },
										{ nodeId: "43", label: "helpers.css" },
									],
								},
							],
						},
					],
				},
				{
					nodeId: "44",
					label: "package.json",
				},
				{
					nodeId: "45",
					label: "README.md",
				},
			],
		},
	];

	return (
		<Container maxWidth="xl" sx={{ mt: "50px", marginBottom: "100px" }}>
			<Stack spacing={3} sx={{ mb: "50px" }}>
				<Typography variant="h3" textAlign="left">
					Datagrid Playground
				</Typography>

				<div style={{ marginBottom: "100px" }}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Card>
								<Mapchart data={mapChartData} />
							</Card>
						</Grid>
						<Grid item xs={12}>
							<Card>
								<Ganttchart data={ganttChartData} />
							</Card>
						</Grid>

						<Grid item xs={12}>
							<TreeViewComponent data={treeviewData} multiSelect />
						</Grid>
					</Grid>
				</div>
			</Stack>
		</Container>
	);
};

export default AdvancedChartPlayGround;
