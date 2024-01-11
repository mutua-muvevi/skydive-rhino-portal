const path = (root, sublink) => {
	return `${root}${sublink}`;
};

const ROOTS_AUTH = "/auth";
const ROOTS_DASHBOARD = "/admin";

//auth path
export const PATH_AUTH = {
	root: ROOTS_AUTH,
	login: path(ROOTS_AUTH, "/login"),
	register: path(ROOTS_AUTH, "/register"),
	loginUnprotected: path(ROOTS_AUTH, "/login-unprotected"),
	registerUnprotected: path(ROOTS_AUTH, "/register-unprotected"),
	otp: path(ROOTS_AUTH, "/otp"),
	verify: path(ROOTS_AUTH, "/verify"),
	resetPassword: path(ROOTS_AUTH, "/reset-password"),
	newPassword: path(ROOTS_AUTH, "/new-password"),
};

export const PLAYGROUND = {
	chat: {
		root: path(ROOTS_DASHBOARD, "/chat"),
		new: path(ROOTS_DASHBOARD, "/chat/new"),
		view: (name) => path(ROOTS_DASHBOARD, `/chat/${name}`),
	},
};

//dashboard path
export const PATH_DASHBOARD = {
	root: ROOTS_DASHBOARD,
	kanban: path(ROOTS_DASHBOARD, "/kanban"),
	calendar: path(ROOTS_DASHBOARD, "/calendar"),
	fileManager: path(ROOTS_DASHBOARD, "/files-manager"),
	permissionDenied: path(ROOTS_DASHBOARD, "/permission-denied"),
	blank: path(ROOTS_DASHBOARD, "/blank"),

	//main
	general: {
		//home:
		home: path(ROOTS_DASHBOARD, "/home"),

		//account:
		account: {
			root: path(ROOTS_DASHBOARD, "/account"),
			overview: path(ROOTS_DASHBOARD, "/account/overview"),
			settings: path(ROOTS_DASHBOARD, `/account/settings`),
			profile: path(ROOTS_DASHBOARD, "/account/profile"),
		},

		//tools
		tools: path(ROOTS_DASHBOARD, "/tools"),

		//the tools
		competition: path(ROOTS_DASHBOARD, "/competition"),
		weather: path(ROOTS_DASHBOARD, "/weather"),
		seo: path(ROOTS_DASHBOARD, "/seo"),
		jumps: path(ROOTS_DASHBOARD, "/jumps"),
		// events: path(ROOTS_DASHBOARD, "/events"),
		gears: path(ROOTS_DASHBOARD, "/gears"),
		
		//storage
		storage: path(ROOTS_DASHBOARD, "/storage"),

		//bookings
		bookings: path(ROOTS_DASHBOARD, "/bookings"),

		// clients:
		clients: path(ROOTS_DASHBOARD, "/clients"),

		// leads:,
		leads: path(ROOTS_DASHBOARD, "/leads"),

		// sales:
		sales: path(ROOTS_DASHBOARD, "/sales"),
		
		//social
		social: {
			root: path(ROOTS_DASHBOARD, "/social"),
			facebook: path(ROOTS_DASHBOARD, "/social/facebook"),
			instagram: path(ROOTS_DASHBOARD, "/social/instagram"),
			linkedin: path(ROOTS_DASHBOARD, "/social/linkedin"),
			twitter: path(ROOTS_DASHBOARD, "/social/twitter"),
			youtube: path(ROOTS_DASHBOARD, "/social/youtube"),
			tiktok: path(ROOTS_DASHBOARD, "/social/tiktok"),
		},

		//website
		website: {
			root: path(ROOTS_DASHBOARD, "/website"),
			overview: path(ROOTS_DASHBOARD, "/website/overview"),
			homepage: path(ROOTS_DASHBOARD, "/website/homepage"),
			about: path(ROOTS_DASHBOARD, "/website/about"),
			pricing: path(ROOTS_DASHBOARD, "/website/pricing"),
			services: path(ROOTS_DASHBOARD, "/website/services"),
			pages: path(ROOTS_DASHBOARD, "/website/pages"),
		},

		//landing
		landing: {
			root: path(ROOTS_DASHBOARD, "/landing"),
			overview: path(ROOTS_DASHBOARD, "/landing/overview"),
			landing: path(ROOTS_DASHBOARD, "/landing/landing"),
		},

		//services
		services: path(ROOTS_DASHBOARD, "/services"),

		//blogs
		blogs: path(ROOTS_DASHBOARD, "/blogs"),

		//announcements
		announcements: path(ROOTS_DASHBOARD, "/announcements"),

		//terms
		terms: path(ROOTS_DASHBOARD, "/terms"),
		
		//manuals
		manuals: path(ROOTS_DASHBOARD, "/manuals"),

		//curriculums
		curriculums: path(ROOTS_DASHBOARD, "/curriculums"),

		//voicemails
		voicemails: path(ROOTS_DASHBOARD, "/voicemails"),

		//events
		events: path(ROOTS_DASHBOARD, "/events"),

		app: path(ROOTS_DASHBOARD, "/app"),
		ecommerce: path(ROOTS_DASHBOARD, "/ecommerce"),
		analytics: path(ROOTS_DASHBOARD, "/analytics"),
		banking: path(ROOTS_DASHBOARD, "/banking"),
		booking: path(ROOTS_DASHBOARD, "/booking"),
		file: path(ROOTS_DASHBOARD, "/file"),
	},



	mail: {
		root: path(ROOTS_DASHBOARD, "/mail"),
		all: path(ROOTS_DASHBOARD, "/mail/all"),
	},
	chat: {
		root: path(ROOTS_DASHBOARD, "/chat"),
		new: path(ROOTS_DASHBOARD, "/chat/new"),
		view: (name) => path(ROOTS_DASHBOARD, `/chat/${name}`),
	},
	eCommerce: {
		root: path(ROOTS_DASHBOARD, "/e-commerce"),
		shop: path(ROOTS_DASHBOARD, "/e-commerce/shop"),
		list: path(ROOTS_DASHBOARD, "/e-commerce/list"),
		checkout: path(ROOTS_DASHBOARD, "/e-commerce/checkout"),
		new: path(ROOTS_DASHBOARD, "/e-commerce/product/new"),
		view: (name) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}`),
		edit: (name) =>
			path(ROOTS_DASHBOARD, `/e-commerce/product/${name}/edit`),
		demoEdit: path(
			ROOTS_DASHBOARD,
			"/e-commerce/product/nike-blazer-low-77-vintage/edit"
		),
		demoView: path(
			ROOTS_DASHBOARD,
			"/e-commerce/product/nike-air-force-1-ndestrukt"
		),
	},
	invoice: {
		root: path(ROOTS_DASHBOARD, "/invoice"),
		list: path(ROOTS_DASHBOARD, "/invoice/list"),
		new: path(ROOTS_DASHBOARD, "/invoice/new"),
		view: (id) => path(ROOTS_DASHBOARD, `/invoice/${id}`),
		edit: (id) => path(ROOTS_DASHBOARD, `/invoice/${id}/edit`),
		demoEdit: path(
			ROOTS_DASHBOARD,
			"/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit"
		),
		demoView: path(
			ROOTS_DASHBOARD,
			"/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5"
		),
	},
	blog: {
		root: path(ROOTS_DASHBOARD, "/blog"),
		posts: path(ROOTS_DASHBOARD, "/blog/posts"),
		new: path(ROOTS_DASHBOARD, "/blog/new"),
		view: (title) => path(ROOTS_DASHBOARD, `/blog/post/${title}`),
		demoView: path(
			ROOTS_DASHBOARD,
			"/blog/post/apply-these-7-secret-techniques-to-improve-event"
		),
	},
};

//other paths

export const PATH_PAGE = {
	comingSoon: "/coming-soon",
	maintenance: "/maintenance",
	pricing: "/pricing",
	payment: "/payment",
	about: "/about-us",
	contact: "/contact-us",
	faqs: "/faqs",
	page403: "/403",
	page404: "/404",
	page500: "/500",
	components: "/components",
};
