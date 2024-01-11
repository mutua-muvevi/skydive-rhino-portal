import { Page } from "../../../components/page";
import { PATH_DASHBOARD } from "../../../routes/path";

import CustomBreadcrumbs from "../../../components/custom-breadcrumbs";
import EventMain from "./sections/main";

const Events = () => {
	return (
		<Page title="Events">
			<CustomBreadcrumbs
				heading="Events"
				links={[
					{
						name: "Dashboard",
						href: PATH_DASHBOARD.general.home,
					},
					{ name: "Events" },
				]}
			/>
			<EventMain/>
		</Page>
	);
}

export default Events