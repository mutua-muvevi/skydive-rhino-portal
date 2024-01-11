import { Page } from "../../../../components/page";

import CustomBreadcrumbs from "../../../../components/custom-breadcrumbs";
import { PATH_DASHBOARD } from "../../../../routes/path";
import PagesCards from "./sections/cards";

const Pages = () => {
	return (
		<Page title="Web Pages">
			<CustomBreadcrumbs
				heading="Web Pages"
				links={[
					{
						name: "Dashboard",
						href: PATH_DASHBOARD.general.home,
					},
					{ name: "Pages" },
				]}
			/>
			<PagesCards/>
		</Page>
	);
};

export default Pages;