import { Page } from "../../../components/page";
import { PATH_DASHBOARD } from "../../../routes/path";

import CustomBreadcrumbs from "../../../components/custom-breadcrumbs";
import LeadMain from "./sections/main";

const Leads = () => {
	return (
		<Page title="Leads">
			<CustomBreadcrumbs
				heading="Leads"
				links={[
					{
						name: "Dashboard",
						href: PATH_DASHBOARD.general.home,
					},
					{ name: "Leads" },
				]}
			/>
			<LeadMain/>
		</Page>
	);
}

export default Leads