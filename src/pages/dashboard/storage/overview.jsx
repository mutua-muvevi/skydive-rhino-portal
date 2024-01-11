import CustomBreadcrumbs from "../../../components/custom-breadcrumbs";
import { Page } from "../../../components/page";
import { PATH_DASHBOARD } from "../../../routes/path";

import { Grid, Stack } from "@mui/material";

import StorageOverviewGraph from "./sections/graph";
import StorageOverviewSpeedometerGraph from "./sections/spedometer-graph";
import StorageOverviewListCard from "./sections/list-cards";

import { useDispatch , useSelector } from "../../../redux/store";
import { useEffect } from "react";
import { fetchAllFiles } from "../../../redux/slices/storage";

const StorageOverview = () => {
	const dispatch = useDispatch();
	const { me } = useSelector((state) => state.user)

	const token = localStorage.getItem("token");

	if(!token) {
		window.location.href = "/login";
	}

	const fetchStorage = async () => {
		try {
			await dispatch(fetchAllFiles(me._id, token));
		} catch (error) {
			console.log("Error", error);
		}
	};

	useEffect(() => {
		fetchStorage(me._id, token);
	}, [me._id, token]);

	return (
		<Page title="Storage">
			<CustomBreadcrumbs
				heading="Storage"
				links={[
					{
						name: "Dashboard",
						href: PATH_DASHBOARD.general.home,
					},
					{
						name: "Storage",
					},
				]}
			/>
			<Grid container spacing={3}>
				<Grid item xs={12} md={12} lg={8} xl={9}>
					<StorageOverviewGraph />
				</Grid>
				<Grid item xs={12} md={12} lg={4} xl={3}>
					<Stack spacing={3}>
						<StorageOverviewSpeedometerGraph />
					</Stack>
				</Grid>
				<Grid item xs={12} md={12} lg={12} xl={12}>
					<StorageOverviewListCard />
				</Grid>
			</Grid>
		</Page>
	);
};

export default StorageOverview;
