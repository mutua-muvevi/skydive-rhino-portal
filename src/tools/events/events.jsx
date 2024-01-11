import CustomBreadcrumbs from "../../components/custom-breadcrumbs"
import { Page } from "../../components/page"
import { PATH_DASHBOARD } from "../../routes/path"

const Events = () => {
	return (
		<Page title="Events Management">
			<CustomBreadcrumbs
				heading="Events"
				links={[
					{
						name: "Dashboard",
						href: PATH_DASHBOARD.general.home,
					},
					{ name: "Tools", href: PATH_DASHBOARD.general.tools, },
					{ name: "Events" },
				]}
			/>
		</Page>
	)
}

export default Events