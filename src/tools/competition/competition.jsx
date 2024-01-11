import CustomBreadcrumbs from "../../components/custom-breadcrumbs"
import { Page } from "../../components/page"
import { PATH_DASHBOARD } from "../../routes/path"

const Competition = () => {
	return (
		<Page title="Competition Analysis">
			<CustomBreadcrumbs
				heading="Tools"
				links={[
					{
						name: "Dashboard",
						href: PATH_DASHBOARD.general.home,
					},
					{ name: "Tools", href: PATH_DASHBOARD.general.tools, },
					{ name: "Competition Analysis" },
				]}
			/>
		</Page>
	)
}

export default Competition