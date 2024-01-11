import { Page } from "../../../../components/page";
import { PATH_DASHBOARD } from "../../../../routes/path";

import CustomBreadcrumbs from "../../../../components/custom-breadcrumbs";

const Instagram = () => {
	return (
		<Page title="Instagram">
			<CustomBreadcrumbs
				heading="Instagram"
				links={[
					{
						name: "Dashboard",
						href: PATH_DASHBOARD.general.home,
					},
					{ name: "Instagram" },
				]}
			/>
			<div>Instagram</div>
		</Page>
	);
};

export default Instagram;
