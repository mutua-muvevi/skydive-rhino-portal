import { Page } from "../../../../components/page";
import { PATH_DASHBOARD } from "../../../../routes/path";

import CustomBreadcrumbs from "../../../../components/custom-breadcrumbs";

const Facebook = () => {
	return (
		<Page title="Facebook">
			<CustomBreadcrumbs
				heading="Facebook"
				links={[
					{
						name: "Dashboard",
						href: PATH_DASHBOARD.general.home,
					},
					{ name: "Facebook" },
				]}
			/>
			<div>Facebook</div>
		</Page>
	);
};

export default Facebook;
