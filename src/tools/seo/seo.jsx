import CustomBreadcrumbs from "../../components/custom-breadcrumbs"
import { Page } from "../../components/page"
import { PATH_DASHBOARD } from "../../routes/path"

const SEO = () => {
	return (
		<Page title="SEO Management">
			<CustomBreadcrumbs
				heading="Tools"
				links={[
					{
						name: "Dashboard",
						href: PATH_DASHBOARD.general.home,
					},
					{
						name: "Tools",
						href: PATH_DASHBOARD.general.tools,
					},
					{ name: "SEO Tool" },
				]}
			/>
		</Page>
	)
}

export default SEO