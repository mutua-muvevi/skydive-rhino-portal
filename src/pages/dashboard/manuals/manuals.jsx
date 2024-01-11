import { Page } from "../../../components/page";
import { PATH_DASHBOARD } from "../../../routes/path";

import CustomBreadcrumbs from "../../../components/custom-breadcrumbs";
import ManualMain from "./sections/main";

const Manuals = () => {
	return (
		<Page title="Manuals">
			<CustomBreadcrumbs
				heading="Manuals"
				links={[
					{
						name: "Dashboard",
						href: PATH_DASHBOARD.general.home,
					},
					{ name: "Manuals" },
				]}
			/>
			<ManualMain/>
		</Page>
	);
}

export default Manuals