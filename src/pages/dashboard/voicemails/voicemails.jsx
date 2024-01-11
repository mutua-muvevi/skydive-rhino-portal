import CustomBreadcrumbs from "../../../components/custom-breadcrumbs";
import { Page } from "../../../components/page";
import { PATH_DASHBOARD } from "../../../routes/path";
import VoicemailsMain from "./sections/main";

const Voicemails = () => {
	return (
		<Page title="Voicemails">
			<CustomBreadcrumbs
				heading="Voicemails"
				links={[
					{
						name: "Dashboard",
						href: PATH_DASHBOARD.general.home,
					},
					{ name: "Voicemails" },
				]}
			/>
			<VoicemailsMain/>
		</Page>
	);
};

export default Voicemails;
