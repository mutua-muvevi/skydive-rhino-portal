import { Page } from "../../../../components/page";

import CustomBreadcrumbs from "../../../../components/custom-breadcrumbs";
import { PATH_DASHBOARD } from "../../../../routes/path";

const WebsiteOverview = () => {
	return (
		<Page title="Website Overview">
			<CustomBreadcrumbs
				heading="Web Overview"
				links={[
					{
						name: "Dashboard",
						href: PATH_DASHBOARD.general.home,
					},
					{ name: "Overview" },
				]}
			/>
			<div>WebsiteOverview</div>
		</Page>
	);
};

export default WebsiteOverview;
