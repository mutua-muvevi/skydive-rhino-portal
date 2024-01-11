import { Page } from "../../../../components/page";

import CustomBreadcrumbs from "../../../../components/custom-breadcrumbs";
import { PATH_DASHBOARD } from "../../../../routes/path";

const LandingOverview = () => {
	return (
		<Page title="Landing Overview">
			<CustomBreadcrumbs
				heading="Landing Overview"
				links={[
					{
						name: "Dashboard",
						href: PATH_DASHBOARD.general.home,
					},
					{ name: "Overview" },
				]}
			/>
			<div>LandingOverview</div>
		</Page>
	);
};

export default LandingOverview;
