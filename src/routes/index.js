import { Navigate, useRoutes } from "react-router-dom";
// auth
import AuthGuard from "../auth/auth-guard";
import GuestGuard from "../auth/guest-guard";
import OTPGuard from "../auth/otp-guard";

// layouts
import DashboardLayout from "../layout/dashboard/layout";

//elements
import {
	LoginPage,
	RegisterPage,
	CheckEmailPage,
	NewPasswordPage,
	ResetPasswordPage,
	Page500,
	Page403,
	Page404,
	ComingSoonPage,
	MaintenancePage,

	//playground
	PlaygroundForms,
	DatagridPlayground,
	CalendarPlayground,
	ChartPlayground,
	AdvancedChartPlayGround,
	ChatPlayGround,
	KanbanPlayGround,
	OrgPlayGround,
	OTPPage,
	ScrollPlaybround,

	Storage,
	Tools,
	Announcements,

	//-----------account----------------
	AccountOverview,
	AccountSettings,
	AccountProfile,

	//-----------home-------------------
	DashboardMain,

	//-----------social----------------
	FaceBook,
	Instagram,
	TikTok,

	//-----------content----------------
	Bookings,
	WebsiteHomepage,
	WebsiteAbout,
	WebsitePricing,
	Leads,
	Clients,
	Services,
	WebsiteServices,
	LandingOverview,
	Competition,
	Weather,
	SEO,
	Jumps,
	Events,
	Gears,
	Blogs,
	Terms,
	Manuals,
	Curriculums,
	Voicemails,
	EventsMain,
	WebsitePages,
} from "./elements";

import CompactLayout from "../layout/compact/compact-layout";
import TimelinePlayground from "../pages/playground/timeline";
import WebsiteOverview from "../pages/dashboard/website/overview/overview";
import LandingPage from "../pages/dashboard/landing/page/landing";

// ----------------------------------------------------------------------
export default function Router() {
	return useRoutes([
		// auth ---------------------------
		{
			path: "auth",
			children: [
				{
					path: "login",
					element: (
						<GuestGuard>
							<LoginPage />
						</GuestGuard>
					),
				},
				{
					path: "register",
					element: (
						<OTPGuard>
							<RegisterPage />
						</OTPGuard>
					),
				},
				{
					element: <CompactLayout />,
					children: [
						{
							path: "reset-password",
							element: <ResetPasswordPage />,
						},
						{
							path: "new-password/:resetToken",
							element: <NewPasswordPage />,
						},
						{ path: "verify", element: <CheckEmailPage /> },
						{
							path: "otp",
							element: (
								<GuestGuard>
									<OTPPage />
								</GuestGuard>
							),
						},
					],
				},
			],
		},

		// dashboard -------------------------
		{
			path: "admin",
			element: (
				<AuthGuard>
					<DashboardLayout />
				</AuthGuard>
			),
			children: [
				{ path: "home", element: <DashboardMain/> },
				{
					path: "account",
					children: [
						{
							element: (
								<Navigate
									to="/admin/account/overview"
									replace
								/>
							),
							index: true,
						},
						{ path: "overview", element: <AccountOverview /> },
						{ path: "settings", element: <AccountSettings /> },
						{ path: "profile", element: <AccountProfile /> },
					],
				},

				{ path: "storage", element: <Storage /> },

				{ path: "bookings", element: <Bookings /> },

				{ path: "services", element: <Services /> },

				{ path: "clients", element: <Clients /> },

				{ path: "leads", element: <Leads /> },

				{ path: "tools", element: <Tools /> },

				{ path: "terms", element: <Terms /> },

				{ path: "manuals", element: <Manuals /> },

				{ path: "curriculums", element: <Curriculums /> },

				{ path: "voicemails", element: <Voicemails /> },

				{ path: "events", element: <EventsMain /> },

				//the tools
				{ path: "competition", element: <Competition/> },
				{ path: "weather", element: <Weather/> },
				{ path: "seo", element: <SEO/> },
				{ path: "jumps", element: <Jumps/> },
				{ path: "events", element: <Events/> },
				{ path: "gears", element: <Gears/> },

				{ path: "announcements", element: <Announcements/> },


				{
					path: "social",
					children: [
						{
							element: (
								<Navigate to="/admin/social/facebook" replace/>
							),
							index: true
						},
						{ path: "facebook", element: <FaceBook /> },
						{ path: "instagram", element: <Instagram /> },
						{ path: "tiktok", element: <TikTok /> },
					]
				},

				{
					path: "website",
					children: [
						{
							element: (
								<Navigate to="/admin/website/overview" replace/>
							),
							index: true
						},
						{ path: "overview", element: <WebsiteOverview /> },
						{ path: "homepage", element: <WebsiteHomepage /> },
						{ path: "about", element: <WebsiteAbout /> },
						{ path: "pricing", element: <WebsitePricing /> },
						{ path: "services", element: <WebsiteServices /> },
						{ path: "pages", element: <WebsitePages /> },
					]
				},

				{
					path: "landing",
					children: [
						{
							element: (
								<Navigate to="/admin/landing/overview" replace/>
							),
							index: true
						},
						{ path: "overview", element: <LandingOverview /> },
						{ path: "landing", element: <LandingPage /> },
					]
				},

				{ path: "blogs", element: <Blogs/> },
				{ path: "services", element: <Services/> },

			],
		},

		//other ----------------------------------
		{
			element: <CompactLayout />,
			children: [
				{ path: "coming-soon", element: <ComingSoonPage /> },
				{ path: "maintenance", element: <MaintenancePage /> },
				{ path: "500", element: <Page500 /> },
				{ path: "404", element: <Page404 /> },
				{ path: "403", element: <Page403 /> },
			],
		},
		{ path: "*", element: <Navigate to="/404" replace /> },

		//playground -----------------------------
		{ path: "form-playground", element: <PlaygroundForms /> },
		{ path: "datagrid-playground", element: <DatagridPlayground /> },
		{ path: "timeline-playground", element: <TimelinePlayground /> },
		{ path: "calendar-playground", element: <CalendarPlayground /> },
		{
			path: "chart-playground",
			element: <ChartPlayground />,
		},
		{
			path: "advanced-chart-playground",
			element: <AdvancedChartPlayGround />,
		},
		{
			path: "chat-playground",
			element: <ChatPlayGround />,
			children: [
				{ element: <ChartPlayground />, index: true },
				{ path: "new", element: <ChartPlayground /> },
				{ path: ":conversationKey", element: <ChartPlayground /> },
			],
		},
		{ path: "kanban-playground", element: <KanbanPlayGround /> },
		{ path: "org-chart-playground", element: <OrgPlayGround /> },
		{ path: "scrollbar-playground", element: <ScrollPlaybround /> },
	]);
}
