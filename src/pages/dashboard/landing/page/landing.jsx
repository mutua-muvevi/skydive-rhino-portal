import { Page } from "../../../../components/page";

import CustomBreadcrumbs from "../../../../components/custom-breadcrumbs";
import { PATH_DASHBOARD } from "../../../../routes/path";

const LandingPage = () => {
	return (
		<Page title="Landing Page">
			<CustomBreadcrumbs
				heading="Landing Page"
				links={[
					{
						name: "Dashboard",
						href: PATH_DASHBOARD.general.home,
					},
					{ name: "Landing Page" },
				]}
			/>
			<div>Landing Page</div>
		</Page>
	);
};

export default LandingPage;
