import { Page } from "../../../../components/page";
import { PATH_DASHBOARD } from "../../../../routes/path";

import CustomBreadcrumbs from "../../../../components/custom-breadcrumbs";

const Profile = () => {
	return (
		<Page title="My Profile">
			<CustomBreadcrumbs
				heading="My Profile"
				links={[
					{
						name: "Dashboard",
						href: PATH_DASHBOARD.general.home,
					},
					{
						name: "Account",
						href: PATH_DASHBOARD.general.account.root,
					},
					{ name: "Profile" },
				]}
			/>
			<div>Profile</div>
		</Page>
	);
};

export default Profile;
