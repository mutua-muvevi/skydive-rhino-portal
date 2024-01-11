import { Page } from "../../../../components/page";

import CustomBreadcrumbs from "../../../../components/custom-breadcrumbs";
import { PATH_DASHBOARD } from "../../../../routes/path";

const Homepage = () => {
	return (
		<Page title="Web Homepage">
			
			<CustomBreadcrumbs
				heading="Web Homepage"
				links={[
					{
						name: "Dashboard",
						href: PATH_DASHBOARD.general.home,
					},
					{ name: "Homepage" },
				]}
			/>
			<div>Homepage</div>
		</Page>
	);
};

export default Homepage;