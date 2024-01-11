// routes
import { PATH_DASHBOARD } from "../../../routes/path";

// ----------------------------------------------------------------------

const ICONS = {
	//main
	home: "heroicons:home-solid",
	storage: "ic:baseline-cloud-upload",
	tools: "vaadin:tools",
	bookings: "ion:calendar-sharp",

	//clients and leads
	clients: "mdi:folder-user",
	leads: "mdi:leads",

	//website and landing
	websites: "icon-park-solid:setting-web",
	landing: "icon-park-solid:web-page",

	//social media accounts
	facebook: "cib:facebook",
	instagram: "cib:instagram",
	tiktok: "cib:tiktok",

	promotions: "gridicons:speaker",
	emails: "ic:baseline-email",
	social: "icon-park-solid:connect",
	content: "bxs:bot",

	blogs: "fa-solid:quote-left",
	services: "fluent-emoji-high-contrast:parachute",

	announcements: "mdi:announcement",
	terms: "clarity:contract-solid",
	manuals: "iconoir:book-solid",
	curriculums: "material-symbols:school",
	voicemails: "fluent:voicemail-48-filled",
	events: "bi:calendar-event-fill",
	pages: "icon-park-solid:web-page",
};

const navConfig = [
	//MAIN
	//----------------------------------------------------------------------
	{
		subheader: "main",
		items: [
			//main
			{
				title: "home",
				path: PATH_DASHBOARD.general.home,
				icon: ICONS.home,
			},

			//bookings
			{
				title: "reservations",
				path: PATH_DASHBOARD.general.bookings,
				icon: ICONS.bookings,
			},

			//announcements
			{
				title: "announcements",
				path: PATH_DASHBOARD.general.announcements,
				icon: ICONS.announcements,
			},

			//voicemails
			{
				title: "voicemails",
				path: PATH_DASHBOARD.general.voicemails,
				icon: ICONS.voicemails,
			},

			//Events
			{
				title: "events",
				path: PATH_DASHBOARD.general.events,
				icon: ICONS.events,
			},
		],
	},

	//CLIENTS AND LEADS
	{
		subheader: "clients and leads",
		items: [
			//clients
			{
				title: "clients",
				path: PATH_DASHBOARD.general.clients,
				icon: ICONS.clients,
			},

			// leads
			{
				title: "leads",
				path: PATH_DASHBOARD.general.leads,
				icon: ICONS.leads,
			},
		],
	},

	//RESOURCES
	{
		subheader: "resources",
		items: [
			//tools
			{
				title: "tools",
				path: PATH_DASHBOARD.general.tools,
				icon: ICONS.tools,
			},

			//storage
			{
				title: "storage",
				path: PATH_DASHBOARD.general.storage,
				icon: ICONS.storage,
			},

			//curriculums
			{
				title: "curriculums",
				path: PATH_DASHBOARD.general.curriculums,
				icon: ICONS.curriculums,
			},

			//terms
			{
				title: "terms and policies",
				path: PATH_DASHBOARD.general.terms,
				icon: ICONS.terms,
			},

			//manuals
			{
				title: "manuals",
				path: PATH_DASHBOARD.general.manuals,
				icon: ICONS.manuals,
			},
			
		],
	},

	//WEBSITE AND LANDING
	{
		subheader: "website and landing",
		items: [
			//website
			{
				title: "website",
				path: PATH_DASHBOARD.general.website.root,
				icon: ICONS.websites,
				children: [
					{
						title: "overview",
						path: PATH_DASHBOARD.general.website.overview,
					},
					{
						title: "services",
						path: PATH_DASHBOARD.general.services,
					},
					{
						title: "primary pages",
						path: PATH_DASHBOARD.general.website.pages,
					},
					{
						title: "blogs",
						path: PATH_DASHBOARD.general.blogs,
					},
				],
			},

			// landing page
			{
				title: "landing",
				path: PATH_DASHBOARD.general.landing.root,
				icon: ICONS.landing,
				children: [
					{
						title: "overview",
						path: PATH_DASHBOARD.general.landing.overview,
					},
					{
						title: "landing page",
						path: PATH_DASHBOARD.general.landing.landing,
					},
				],
			},
		],
	},

	//SOCIAL MEDIA ACCOUNTS
	// {
	// 	subheader: "social media accounts",
	// 	items: [
	// 		{
	// 			title: "facebook",
	// 			path: PATH_DASHBOARD.general.social.facebook,
	// 			icon: ICONS.facebook,
	// 		},
	// 		{
	// 			title: "instagram",
	// 			path: PATH_DASHBOARD.general.social.instagram,
	// 			icon: ICONS.instagram,
	// 		},
	// 		{
	// 			title: "tiktok",
	// 			path: PATH_DASHBOARD.general.social.tiktok,
	// 			icon: ICONS.tiktok,
	// 		},
	// 	],
	// },
];

export default navConfig;
