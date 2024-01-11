import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";

// slices
import UserReducer from "./slices/user";
import StorageReducer from "./slices/storage";
import ReservationsReducer from "./slices/reservations";
import ServicesReducer from "./slices/services";
import BlogReducer from "./slices/blogs";
import AnnouncementReducer from "./slices/announcements";
import LeadsReducer from "./slices/leads";
import ClientsReducer from "./slices/clients";
import TermReducer from "./slices/terms";
import ManualReducer from "./slices/manuals";
import CurriculumReducer from "./slices/curriculums";
import VoicemailReducer from "./slices/voicemails";
import EventReducer from "./slices/events";

import calendarReducer from "./slices/calendar";
import chatReducer from "./slices/chat";
import kanbanReducer from "./slices/kanban";

// ----------------------------------------------------------------------

const config = {
	key: "root",
	storage,
	whitelist: [
		"user",
		"storage",
		"reservation",
		"blogs",
		"announcements",
		"leads",
		"clients",
		"terms",
		"manuals",
		"curriculums",
		"voicemails",
		"services",
		"events",
	],
	blacklist: [],
};

export const rootReducer = combineReducers({
	user: UserReducer,

	storage: StorageReducer,
	reservations: ReservationsReducer,
	services: ServicesReducer,
	blog: BlogReducer,
	announcements: AnnouncementReducer,
	leads: LeadsReducer,
	clients: ClientsReducer,
	terms: TermReducer,
	manuals: ManualReducer,
	curriculum: CurriculumReducer,
	voicemails: VoicemailReducer,
	events: EventReducer,


	calendar: calendarReducer,
	chat: chatReducer,
	kanban: kanbanReducer,
});

const persistedReducer = persistReducer(config, rootReducer);

export default persistedReducer;
