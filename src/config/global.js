
// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = "/admin"; // as '/dashboard/app'
export const publicUrlEnv = import.meta.env.VITE_PUBLIC_URL;

//API
export const HOST_API_KEY = import.meta.env.VITE_API_URL || '';
// export const HOST_API_KEY = import.meta.env.VITE_APP_HOST_API_KEY || '';

// LAYOUT
// ----------------------------------------------------------------------

export const HEADER = {
	H_MOBILE: 50,
	H_MAIN_DESKTOP: 60,
	H_DASHBOARD_DESKTOP: 60,
	H_DASHBOARD_DESKTOP_OFFSET: 92 - 32,
};

export const NAV = {
	W_BASE: 260,
	W_DASHBOARD: 250,
	W_DASHBOARD_MINI: 88,
	//
	H_DASHBOARD_ITEM: 48,
	H_DASHBOARD_ITEM_SUB: 36,
	//
	H_DASHBOARD_ITEM_HORIZONTAL: 32,
};

export const ICON = {
	NAV_ITEM: 24,
	NAV_ITEM_HORIZONTAL: 22,
	NAV_ITEM_MINI: 22,
};
