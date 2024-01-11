import { Suspense, lazy } from "react";
// components
import LoadingScreen from "../components/loading-screen";

// ----------------------------------------------------------------------

const Loadable = (Component) => {
	const LoadableComponent = (props) => (
		<Suspense fallback={<LoadingScreen />}>
			<Component {...props} />
		</Suspense>
	);

	// Assign a display name to the LoadableComponent
	LoadableComponent.displayName = `Loadable(${
		Component.displayName || Component.name || "Component"
	})`;

	return LoadableComponent;
};

// ----------------------------------------------------------------------

// AUTH
export const LoginPage = Loadable(lazy(() => import("../pages/auth/login")));
export const RegisterPage = Loadable(
	lazy(() => import("../pages/auth/register"))
);
export const CheckEmailPage = Loadable(
	lazy(() => import("../pages/auth/check-email"))
);
export const NewPasswordPage = Loadable(
	lazy(() => import("../pages/auth/new-password"))
);
export const ResetPasswordPage = Loadable(
	lazy(() => import("../pages/auth/reset-password"))
);
export const OTPPage = Loadable(
	lazy(() => import("../pages/auth/otp-code"))
);

// PAGES
export const Page500 = Loadable(lazy(() => import("../pages/page-500")));
export const Page404 = Loadable(lazy(() => import("../pages/page-404")));
export const Page403 = Loadable(lazy(() => import("../pages/page-403")));
export const ComingSoonPage = Loadable(
	lazy(() => import("../pages/coming-soon"))
);
export const MaintenancePage = Loadable(
	lazy(() => import("../pages/maintenance"))
);

//PLAYGROUND
export const PlaygroundForms = Loadable(lazy(() => import("../pages/playground/forms")));
export const DatagridPlayground = Loadable(lazy(() => import("../pages/playground/datagrid")));
export const TimelinePlayground = Loadable(lazy(() => import("../pages/playground/timeline")));
export const CalendarPlayground = Loadable(lazy(() => import("../pages/playground/calendar")));
export const ChartPlayground = Loadable(lazy(() => import("../pages/playground/chart")));
export const AdvancedChartPlayGround = Loadable(lazy(() => import("../pages/playground/advanced-chart")));
export const ChatPlayGround = Loadable(lazy(() => import("../pages/playground/chat")));
export const KanbanPlayGround = Loadable(lazy(() => import("../pages/playground/kanban")));
export const OrgPlayGround = Loadable(lazy(() => import("../pages/playground/organization")));
export const ScrollPlaybround = Loadable(lazy(() => import("../pages/playground/scrollbar")));


// DASHBOARD
//-----------------main-----------------
//home
export const DashboardMain = Loadable(lazy(() => import("../pages/dashboard/home/home")));

//account
export const AccountOverview = Loadable(lazy(() => import("../pages/dashboard/account/overview/overview")));
export const AccountSettings = Loadable(lazy(() => import("../pages/dashboard/account/settings/settings")));
export const AccountProfile = Loadable(lazy(() => import("../pages/dashboard/account/profile/profile")));

//bookings
export const Bookings = Loadable(lazy(() => import("../pages/dashboard/bookings/bookings")));

//clients
export const Clients = Loadable(lazy(() => import("../pages/dashboard/clients/clients")));

//leads
export const Leads = Loadable(lazy(() => import("../pages/dashboard/leads/leads")));

//storage
export const Storage = Loadable(lazy(() => import("../pages/dashboard/storage/overview")));

//services
export const Services = Loadable(lazy(() => import("../pages/dashboard/services/services")));

//tools
export const Tools = Loadable(lazy(() => import("../pages/dashboard/tools/tools")));

//manuals
export const Manuals = Loadable(lazy(() => import("../pages/dashboard/manuals/manuals")));

//events
export const EventsMain = Loadable(lazy(() => import("../pages/dashboard/events/events")));

//the tools
export const Competition = Loadable(lazy(() => import("../tools/competition/competition")));
export const Events = Loadable(lazy(() => import("../tools/events/events")));
export const Jumps = Loadable(lazy(() => import("../tools/jumps/jumps")));
export const SEO = Loadable(lazy(() => import("../tools/seo/seo")));
export const Weather = Loadable(lazy(() => import("../tools/weather/weather")));
export const Gears = Loadable(lazy(() => import("../tools/gears/gears")));

//social
export const FaceBook = Loadable(lazy(() => import("../pages/dashboard/social/facebook/facebook")));
export const Instagram = Loadable(lazy(() => import("../pages/dashboard/social/instagram/instagram")));
export const TikTok = Loadable(lazy(() => import("../pages/dashboard/social/tiktok/tiktok")));

//website
export const WebsiteOverview = Loadable(lazy(() => import("../pages/dashboard/website/overview/overview")));
export const WebsiteHomepage = Loadable(lazy(() => import("../pages/dashboard/website/homepage/homepage")));
export const WebsiteAbout = Loadable(lazy(() => import("../pages/dashboard/website/about/about")));
export const WebsitePricing = Loadable(lazy(() => import("../pages/dashboard/website/pricing/pricing")));
export const WebsiteServices = Loadable(lazy(() => import("../pages/dashboard/website/services/services")));

//landing
export const LandingOverview = Loadable(lazy(() => import("../pages/dashboard/landing/overview/overview")));

//Blogs
export const Blogs = Loadable(lazy(() => import("../pages/dashboard/blogs/blogs")));

//Announcements
export const Announcements = Loadable(lazy(() => import("../pages/dashboard/announcements/announcements")));

// Terms
export const Terms = Loadable(lazy(() => import("../pages/dashboard/terms/terms")));

//Curriculums
export const Curriculums = Loadable(lazy(() => import("../pages/dashboard/curriculums/curriculums")));

//Voicemails
export const Voicemails = Loadable(lazy(() => import("../pages/dashboard/voicemails/voicemails")));

//Pages
export const WebsitePages = Loadable(lazy(() => import("../pages/dashboard/website/pages/pages")));