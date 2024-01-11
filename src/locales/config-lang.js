// @mui
import { enUS, frFR, zhCN, viVN, hiIN, esES, deDE } from "@mui/material/locale";

// PLEASE REMOVE `LOCAL STORAGE` WHEN YOU CHANGE SETTINGS.
// ----------------------------------------------------------------------

export const allLangs = [
	{
		label: "English",
		value: "en",
		systemValue: enUS,
		icon: "https://res.cloudinary.com/dqweh6zte/image/upload/v1690299631/flags/united-kingdom_rp3tr4.png",
	},
	{
		label: "French",
		value: "fr",
		systemValue: frFR,
		icon: "https://res.cloudinary.com/dqweh6zte/image/upload/v1690299631/flags/france_nl48fb.png",
	},
	{
		label: "Spanish",
		value: "es",
		systemValue: esES,
		icon: "https://res.cloudinary.com/dqweh6zte/image/upload/v1690299631/flags/spain_aohxgq.png",
	},
	{
		label: "German",
		value: "de",
		systemValue: deDE,
		icon: "https://res.cloudinary.com/dqweh6zte/image/upload/v1690299630/flags/german_g8pgyy.png",
	},
	{
		label: "Chinese",
		value: "cn",
		systemValue: zhCN,
		icon: "https://res.cloudinary.com/dqweh6zte/image/upload/v1690299631/flags/china_my1wcu.png",
	},
	{
		label: "Hindi",
		value: "hi",
		systemValue: hiIN,
		icon: "https://res.cloudinary.com/dqweh6zte/image/upload/v1690299631/flags/indian_lzdhur.png",
	},
	{
		label: "Vietnamese",
		value: "vi",
		systemValue: viVN,
		icon: "https://res.cloudinary.com/dqweh6zte/image/upload/v1690299631/flags/vietnam_efcfdw.png",
	},
];

export const defaultLang = allLangs[0]; // English