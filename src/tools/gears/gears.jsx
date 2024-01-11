import CustomBreadcrumbs from "../../components/custom-breadcrumbs"
import { Page } from "../../components/page"
import { PATH_DASHBOARD } from "../../routes/path"

const Gears = () => {
	return (
		<Page title="Gears Management">
			<CustomBreadcrumbs
				heading="Tools"
				links={[
					{
						name: "Dashboard",
						href: PATH_DASHBOARD.general.home,
					},
					{ name: "Tools", href: PATH_DASHBOARD.general.tools, },
					{ name: "Gears" },
				]}
			/>
		</Page>
	)
}

export default Gears