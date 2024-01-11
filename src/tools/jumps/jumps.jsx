import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
import { Page } from "../../components/page";
import { PATH_DASHBOARD } from "../../routes/path";

const Jumps = () => {
	return (
		<Page title="Jumps">
			<CustomBreadcrumbs
				heading="Jumps"
				links={[
					{
						name: "Dashboard",
						href: PATH_DASHBOARD.general.home,
					},
					{ name: "Tools", href: PATH_DASHBOARD.general.tools },
					{ name: "Jumps" },
				]}
			/>
		</Page>
	);
};

export default Jumps;
