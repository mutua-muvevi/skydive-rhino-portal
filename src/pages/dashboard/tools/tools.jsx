import { Page } from "../../../components/page";
import { PATH_DASHBOARD } from "../../../routes/path";

import CustomBreadcrumbs from "../../../components/custom-breadcrumbs";
import { Card, CardActionArea, CardContent, CardHeader, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import Iconify from "../../../components/iconify";
import { useNavigate } from "react-router-dom";

const Tools = () => {
	const navigate = useNavigate();

	const tools = [
		{
			name: "Weather Forecast",
			icon: "fluent:weather-hail-day-48-filled",
			onClick: () => {
				navigate(PATH_DASHBOARD.general.weather)
			},
		},
		{
			name: "SEO Tool",
			icon: "tabler:seo",
			onClick: () => {
				navigate(PATH_DASHBOARD.general.seo)
			},
		},
		{
			name: "Jump Logs",
			icon: "fluent-emoji-high-contrast:parachute",
			onClick: () => {
				navigate(PATH_DASHBOARD.general.jumps)
			},
		},
		{
			name: "Events Calendar",
			icon: "ion:calendar",
			onClick: () => {
				navigate(PATH_DASHBOARD.general.events)
			},
		},
		{
			name: "Competition Analysis",
			icon: "mdi:google-my-business",
			onClick: () => {
				navigate(PATH_DASHBOARD.general.competition)
			},
		},
		{
			name: "My Skydive Gears",
			icon: "game-icons:parachute",
			onClick: () => {
				navigate(PATH_DASHBOARD.general.gears)
			},
		},
	]

	return (
		<Page title="Tools">
			<CustomBreadcrumbs
				heading="Tools"
				links={[
					{
						name: "Dashboard",
						href: PATH_DASHBOARD.general.home,
					},
					{ name: "Tools" },
				]}
			/>

			<Grid container spacing={3}>
				{
					tools.map((tool, index) => (
						<Grid item xs={12} sm={6} md={4} lg={3} key={index}>
							<Card>
								<CardActionArea onClick={tool.onClick}>
									<CardHeader title={tool.name}/>
									<CardContent>
										<Stack justifyContent="left" spacing={2}>
											<Iconify icon={tool.icon} width={48} height={48}/> 
										</Stack>
									</CardContent>
								</CardActionArea>
							</Card>
						</Grid>
					))
				}
			</Grid>
		</Page>
	);
};

export default Tools;
