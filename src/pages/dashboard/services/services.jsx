import CustomBreadcrumbs from "../../../components/custom-breadcrumbs";
import { Page } from "../../../components/page";
import { PATH_DASHBOARD } from "../../../routes/path";


import ServiceMain from "./sections/main";


const Services = () => {

	
	return (
		<Page title="Services">
			<CustomBreadcrumbs
				heading="Services"
				links={[
					{
						name: "Dashboard",
						href: PATH_DASHBOARD.general.home,
					},
					{ name: "Services" },
				]}
			/>
			
			<ServiceMain/>
		</Page>
	);
};

export default Services;
