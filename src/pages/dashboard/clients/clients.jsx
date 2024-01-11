import { Page } from "../../../components/page";
import { PATH_DASHBOARD } from "../../../routes/path";

import CustomBreadcrumbs from "../../../components/custom-breadcrumbs";
import ClientMain from "./sections/main";

const Clients = () => {
	return (
		<Page title="Clients">
			<CustomBreadcrumbs
				heading="Clients"
				links={[
					{
						name: "Dashboard",
						href: PATH_DASHBOARD.general.home,
					},
					{ name: "Clients" },
				]}
			/>
			<ClientMain/>
		</Page>
	);
};

export default Clients;
