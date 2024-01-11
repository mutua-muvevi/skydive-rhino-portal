import CustomBreadcrumbs from "../../components/custom-breadcrumbs"
import { Page } from "../../components/page"
import { PATH_DASHBOARD } from "../../routes/path"

const Weather = () => {
	return (
		<Page title="Weather Management">
			<CustomBreadcrumbs
				heading="Weather"
				links={[
					{
						name: "Dashboard",
						href: PATH_DASHBOARD.general.home,
					},
					{
						name: "Tools",
						href: PATH_DASHBOARD.general.tools,
					},
					{ name: "Weather" },
				]}
			/>
		</Page>
	)
}

export default Weather