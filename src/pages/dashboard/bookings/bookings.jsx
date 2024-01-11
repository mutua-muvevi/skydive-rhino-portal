import { Page } from "../../../components/page";
import { PATH_DASHBOARD } from "../../../routes/path";

import CustomBreadcrumbs from "../../../components/custom-breadcrumbs";
import { Grid } from "@mui/material";

import BookingGraph from "./sections/graph";
import BookingPie from "./sections/pie";
import BookingMain from "./sections/main";

const Bookings = () => {
	return (
		<Page title="Reservations">
			<CustomBreadcrumbs
				heading="Reservations"
				links={[
					{
						name: "Dashboard",
						href: PATH_DASHBOARD.general.home,
					},
					{
						name: "Reservations",
					},
				]}
			/>
			<Grid container spacing={3}>
				<Grid item xs={12} md={12} lg={8} xl={9}>
					<BookingGraph />
				</Grid>
				<Grid item xs={12} md={12} lg={4} xl={3}>
					<BookingPie />
				</Grid>
				<Grid item xs={12} md={12} lg={12} xl={12}>
					<BookingMain/>
				</Grid>
			</Grid>
		</Page>
	);
};

export default Bookings;
