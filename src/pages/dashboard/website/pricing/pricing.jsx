import { Page } from "../../../../components/page";

import CustomBreadcrumbs from "../../../../components/custom-breadcrumbs";
import { PATH_DASHBOARD } from "../../../../routes/path";

const Pricing = () => {
	return (
		<Page title="Web Pricing">
			<CustomBreadcrumbs
				heading="Web Pricing"
				links={[
					{
						name: "Dashboard",
						href: PATH_DASHBOARD.general.home,
					},
					{ name: "Pricing" },
				]}
			/>
			<div>Pricing</div>
		</Page>
	);
};

export default Pricing;