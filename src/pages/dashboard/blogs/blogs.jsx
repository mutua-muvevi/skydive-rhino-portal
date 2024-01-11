import CustomBreadcrumbs from "../../../components/custom-breadcrumbs";
import { Page } from "../../../components/page";
import { PATH_DASHBOARD } from "../../../routes/path";
import BlogsMain from "./sections/main";

const Blogs = () => {
	return (
		<Page title="Blogs">
			<CustomBreadcrumbs
				heading="Blogs"
				links={[
					{
						name: "Dashboard",
						href: PATH_DASHBOARD.general.home,
					},
					{ name: "Blogs" },
				]}
			/>
			<BlogsMain/>
		</Page>
	);
};

export default Blogs;
