import { Page } from "../../../../components/page";
import { PATH_DASHBOARD } from "../../../../routes/path";

import CustomBreadcrumbs from "../../../../components/custom-breadcrumbs";

const Settings = () => {
	return (
		<Page title="Settings">
			<CustomBreadcrumbs
				heading="My Settings"
				links={[
					{
						name: "Dashboard",
						href: PATH_DASHBOARD.general.home,
					},
					{
						name: "Account",
						href: PATH_DASHBOARD.general.account.root,
					},
					{ name: "Settings" },
				]}
			/>
			<div>Settings</div>
		</Page>
	);
};

export default Settings;
