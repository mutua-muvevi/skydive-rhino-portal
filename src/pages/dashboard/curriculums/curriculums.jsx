import CustomBreadcrumbs from "../../../components/custom-breadcrumbs";
import { Page } from "../../../components/page";
import { PATH_DASHBOARD } from "../../../routes/path";
import CurriculumsMain from "./sections/main";

const Curriculums = () => {
	return (
		<Page title="Curriculums">
			<CustomBreadcrumbs
				heading="Curriculums"
				links={[
					{
						name: "Dashboard",
						href: PATH_DASHBOARD.general.home,
					},
					{ name: "Curriculums" },
				]}
			/>
			<CurriculumsMain/>
		</Page>
	);
};

export default Curriculums;
