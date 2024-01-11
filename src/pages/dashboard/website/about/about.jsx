import { Page } from "../../../../components/page";

import CustomBreadcrumbs from "../../../../components/custom-breadcrumbs";
import { PATH_DASHBOARD } from "../../../../routes/path";

const About = () => {
	return (
		<Page title="Overview">
			<CustomBreadcrumbs
				heading="Web About"
				links={[
					{
						name: "Dashboard",
						href: PATH_DASHBOARD.general.home,
					},
					{ name: "About" },
				]}
			/>
			<div>About</div>
		</Page>
	);
};

export default About;