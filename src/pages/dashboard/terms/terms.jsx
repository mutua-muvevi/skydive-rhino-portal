import CustomBreadcrumbs from "../../../components/custom-breadcrumbs";
import { Page } from "../../../components/page";
import { PATH_DASHBOARD } from "../../../routes/path";
import TermsMain from "./sections/main";

const Terms = () => {
	return (
		<Page title="Terms, Policies, Waivers">
			<CustomBreadcrumbs
				heading="Terms, Policies and Waivers"
				links={[
					{
						name: "Dashboard",
						href: PATH_DASHBOARD.general.home,
					},
					{
						name: "Terms",
					},
				]}
			/>
			
			<TermsMain />
		</Page>
	);
};

export default Terms;
