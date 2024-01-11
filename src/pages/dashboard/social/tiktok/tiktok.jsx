import { Page } from "../../../../components/page";
import { PATH_DASHBOARD } from "../../../../routes/path";

import CustomBreadcrumbs from "../../../../components/custom-breadcrumbs";

const Tiktok = () => {
	return (
		<Page title="Tiktok">
			<CustomBreadcrumbs
				heading="TikTok"
				links={[
					{
						name: "Dashboard",
						href: PATH_DASHBOARD.general.home,
					},
					{ name: "TikTok" },
				]}
			/>
			<div>Tiktok</div>
		</Page>
	);
};

export default Tiktok;
