// @mui
import { useTheme } from "@mui/material/styles";
import { Container, Stack, Typography } from "@mui/material";
//components
import OrganizationalChart from "../../components/organizational-chart/organizational-chart";
import { Block } from "../../components/block/block";
// _mock
import _mock from '../../_mock';

const OrgChartPlayground = () => {
	const theme = useTheme();

	return (
		<Container maxWidth="xl" sx={{my: 10}}>
			<Stack direction="column" spacing={3}>
				<Typography variant="h4">Organization Chart</Typography>

				<Block title="Simple">
					<OrganizationalChart
						data={SIMPLE_DATA}
						lineColor={theme.palette.primary.light}
					/>
				</Block>

				<Block title="Standard" sx={{ overflow: "auto" }}>
					<OrganizationalChart
						data={SIMPLE_DATA}
						variant="standard"
						lineHeight="40px"
					/>
				</Block>

				<Block title="By Group" sx={{ overflow: "auto" }}>
					<OrganizationalChart
						data={DATA}
						variant="group"
						lineHeight="64px"
					/>
				</Block>
			</Stack>
		</Container>
	);
};

export default OrgChartPlayground;

// ----------------------------------------------------------------------

const createData = (name, group, role, avatar) => ({
	name,
	group,
	role,
	avatar,
});

const SIMPLE_DATA = {
	...createData(
		"tasha mcneill",
		"root",
		"ceo, co-founder",
		_mock.image.avatar(1)
	),
	children: [
		{
			...createData(
				"john stone",
				"product design",
				"lead",
				_mock.image.avatar(2)
			),
			children: [
				{
					...createData(
						"rimsha wynn",
						"product design",
						"senior",
						_mock.image.avatar(3)
					),
					children: null,
				},
			],
		},
		{
			...createData(
				"ponnappa priya",
				"development",
				"lead",
				_mock.image.avatar(4)
			),
			children: [
				{
					...createData(
						"tyra elliott",
						"development",
						"senior",
						_mock.image.avatar(5)
					),
					children: [
						{
							...createData(
								"sheridan mckee",
								"development",
								"back end developer",
								_mock.image.avatar(6)
							),
							children: [
								{
									...createData(
										"ang li",
										"development",
										"back end developer",
										_mock.image.avatar(7)
									),
									children: null,
								},
							],
						},
						{
							...createData(
								"hope ahmad",
								"development",
								"front end",
								_mock.image.avatar(8)
							),
							children: null,
						},
					],
				},
			],
		},
		{
			...createData(
				"peter stanbridge",
				"marketing",
				"lead",
				_mock.image.avatar(9)
			),
			children: [
				{
					...createData(
						"madeline harding",
						"marketing",
						"support",
						_mock.image.avatar(10)
					),
					children: null,
				},
				{
					...createData(
						"eoin medrano",
						"marketing",
						"content writer",
						_mock.image.avatar(11)
					),
					children: null,
				},
			],
		},
	],
};

const DATA = {
	...createData(
		"tasha mcneill",
		"root",
		"ceo, co-founder",
		_mock.image.avatar(1)
	),
	children: [
		{
			...createData("product design", "product design", null, null),
			children: [
				{
					...createData(
						"john stone",
						"product design",
						"lead",
						_mock.image.avatar(2)
					),
					children: [
						{
							...createData(
								"rimsha wynn",
								"product design",
								"senior",
								_mock.image.avatar(3)
							),
							children: null,
						},
					],
				},
			],
		},
		{
			...createData("development", "development", null, null),
			children: [
				{
					...createData(
						"ponnappa priya",
						"development",
						"lead",
						_mock.image.avatar(4)
					),
					children: [
						{
							...createData(
								"tyra elliott",
								"development",
								"senior",
								_mock.image.avatar(5)
							),
							children: [
								{
									...createData(
										"sheridan mckee",
										"development",
										"back end developer",
										_mock.image.avatar(6)
									),
									children: [
										{
											...createData(
												"ang li",
												"development",
												"back end developer",
												_mock.image.avatar(7)
											),
											children: null,
										},
									],
								},
								{
									...createData(
										"hope ahmad",
										"development",
										"front end",
										_mock.image.avatar(8)
									),
									children: null,
								},
							],
						},
					],
				},
			],
		},
		{
			...createData("marketing", "marketing", null, null),
			children: [
				{
					...createData(
						"peter stanbridge",
						"marketing",
						"lead",
						_mock.image.avatar(9)
					),
					children: [
						{
							...createData(
								"madeline harding",
								"marketing",
								"support",
								_mock.image.avatar(10)
							),
							children: null,
						},
						{
							...createData(
								"eoin medrano",
								"marketing",
								"content writer",
								_mock.image.avatar(11)
							),
							children: null,
						},
					],
				},
			],
		},
	],
};
