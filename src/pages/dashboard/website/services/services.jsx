import { Page } from "../../../../components/page";

import CustomBreadcrumbs from "../../../../components/custom-breadcrumbs";
import { PATH_DASHBOARD } from "../../../../routes/path";

const WebsiteServices = () => {
	return (
		<Page title="Website Services">
			<CustomBreadcrumbs
				heading="Web Services"
				links={[
					{
						name: "Dashboard",
						href: PATH_DASHBOARD.general.home,
					},
					{ name: "Services" },
				]}
			/>
			<div>WebsiteServices</div>
		</Page>
	);
};

export default WebsiteServices;
