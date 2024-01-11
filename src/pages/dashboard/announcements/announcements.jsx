import CustomBreadcrumbs from "../../../components/custom-breadcrumbs";
import { Page } from "../../../components/page";
import { PATH_DASHBOARD } from "../../../routes/path";
import AnnouncementMain from "./sections/main";

const Announcement = () => {
	return (
		<Page title="Announcement">
			<CustomBreadcrumbs
				heading="Announcement"
				links={[
					{
						name: "Dashboard",
						href: PATH_DASHBOARD.general.home,
					},
					{ name: "Announcement" },
				]}
			/>

			<AnnouncementMain/>
		</Page>
	);
};

export default Announcement;
