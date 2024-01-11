// ----------------------------------------------------------------------

// Define more types here
const FORMAT_PDF = ["pdf"];
const FORMAT_TEXT = ["txt"];
const FORMAT_PHOTOSHOP = ["psd"];
const FORMAT_WORD = ["doc", "docx"];
const FORMAT_EXCEL = ["xls", "xlsx"];
const FORMAT_ZIP = ["zip", "rar", "iso"];
const FORMAT_ILLUSTRATOR = ["ai", "esp"];
const FORMAT_POWERPOINT = ["ppt", "pptx"];
const FORMAT_AUDIO = ["wav", "aif", "mp3", "aac"];
const FORMAT_IMG = ["jpg", "jpeg", "gif", "bmp", "png", "svg"];
const FORMAT_VIDEO = ["m4v", "avi", "mpg", "mp4", "webm"];
const FORMAT_CODE = [
	"js",
	"jsx",
	"html",
	"css",
	"scss",
	"json",
	"md",
	"go",
	"php",
	"java",
	"py",
	"rb",
	"vue",
	"ts",
	"tsx",
	"c",
	"cpp",
	"h",
	"cs",
	"sql",
	"sh",
	"ps1",
	"bat",
	"xml",
	"yml",
	"yaml",
	"toml",
	"ini",
	"dockerfile",
	"properties",
	"gradle",
	"cmd",
	"vbs",
	"dart",
	"swift",
	"kt",
	"kts",
	"groovy",
	"scala",
	"clj",
	"cljs",
	"cljc",
	"edn",
	"lua",
	"jl",
	"r",
	"cshtml",
	"vb",
	"fs",
	"fs",
	"fsx",
	"fsi",
	"hs",
	"elm",
	"purs",
	"thy",
	"blade",
	"php",
	"php4",
	"php5",
	"phtml",
	"ctp",
	"module",
	"theme",
	"tpl",
	"twig",
	"erb",
	"ejs",
	"jsp",
	"asp",
	"aspx",
	"ascx",
	"master",
	"cshtml",
	"vbhtml",
	"razor",
	"ad",
	"adoc",
	"asciidoc",
	"doc",
	"docx",
	"ebook",
	"ibooks",
	"kf8",
	"azw",
	"azw3",
	"azw4",
	"mobi",
	"prc",
	"tpz",
	"pdf",
	"md",
	"markdown",
	"rst",
	"adoc",
	"ad",
	"asciidoc",
	"org",
	"pod",
	"tex",
	"latex",
	"txt",
	"text",
	"r",
	"rmd",
	"csv",
	"tsv",
	"ics",
	"rtf",
	"json",
	"jsonld",
	"yaml",
	"yml",
	"xml",
	"toml",
	"rss",
	"rdf",
	"atom",
	"jb",
	"jtd",
	"raml",
	"xaml",
	"xaml",
	"wasm",
	"asm",
	"a51",
	"inc",
	"nasm",
	"s",
	"ms",
	"agc",
	"ags",
	"aea",
	"argus",
	"mitigus",
	"binsource",
	"vue",
	"svelte",
	"mdx",
	"csv",
	"tsv",
	"ics",
	"rtf",
	"json",
	"jsonld",
	"yaml",
	"yml",
	"xml",
	"toml",
	"rss",
	"rdf",
	"atom",
	"jb",
	"jtd",
	"raml",
	"xaml",
	"xaml",
	"wasm",
	"asm",
	"a51",
	"inc",
	"nasm",
	"s",
	"ms",
	"agc",
	"ags",
	"aea",
	"argus",
	"mitigus",
	"binsource",
	"vue",
	"svelte",
	"mdx",
	"csv",
	"tsv",
	"ics",
	"rtf",
	"json",
	"jsonld",
	"yaml",
	"yml",
	"xml",
	"toml",
	"rss",
	"rdf",
	"atom",
	"jb",
	"jtd",
	"raml",
	"xaml",
	"xaml",
];

const iconUrl = (icon) => `/assets/icons/files/${icon}.png`;

// ----------------------------------------------------------------------

export function fileFormat(fileUrl) {
	let format;

	switch (fileUrl?.includes(fileTypeByUrl(fileUrl))) {
		case FORMAT_TEXT.includes(fileTypeByUrl(fileUrl)):
			format = "txt";
			break;
		case FORMAT_ZIP.includes(fileTypeByUrl(fileUrl)):
			format = "zip";
			break;
		case FORMAT_AUDIO.includes(fileTypeByUrl(fileUrl)):
			format = "audio";
			break;
		case FORMAT_IMG.includes(fileTypeByUrl(fileUrl)):
			format = "image";
			break;
		case FORMAT_VIDEO.includes(fileTypeByUrl(fileUrl)):
			format = "video";
			break;
		case FORMAT_WORD.includes(fileTypeByUrl(fileUrl)):
			format = "word";
			break;
		case FORMAT_EXCEL.includes(fileTypeByUrl(fileUrl)):
			format = "excel";
			break;
		case FORMAT_POWERPOINT.includes(fileTypeByUrl(fileUrl)):
			format = "powerpoint";
			break;
		case FORMAT_PDF.includes(fileTypeByUrl(fileUrl)):
			format = "pdf";
			break;
		case FORMAT_PHOTOSHOP.includes(fileTypeByUrl(fileUrl)):
			format = "photoshop";
			break;
		case FORMAT_ILLUSTRATOR.includes(fileTypeByUrl(fileUrl)):
			format = "illustrator";
			break;
		case FORMAT_CODE.includes(fileTypeByUrl(fileUrl)):
			format = "code";
			break;
		default:
			format = fileTypeByUrl(fileUrl);
	}

	return format;
}

// ----------------------------------------------------------------------

export function fileThumb(fileUrl) {
	let thumb;

	switch (fileFormat(fileUrl)) {
		case "folder":
			thumb = iconUrl("ic_folder");
			break;
		case "txt":
			thumb = iconUrl("ic_txt");
			break;
		case "zip":
			thumb = iconUrl("ic_zip");
			break;
		case "audio":
			thumb = iconUrl("ic_audio");
			break;
		case "video":
			thumb = iconUrl("ic_video");
			break;
		case "word":
			thumb = iconUrl("ic_word");
			break;
		case "excel":
			thumb = iconUrl("ic_excel");
			break;
		case "powerpoint":
			thumb = iconUrl("ic_power_point");
			break;
		case "pdf":
			thumb = iconUrl("ic_pdf");
			break;
		case "photoshop":
			thumb = iconUrl("ic_pts");
			break;
		case "illustrator":
			thumb = iconUrl("ic_ai");
			break;
		case "image":
			thumb = iconUrl("ic_img");
			break;
		case "code":
			thumb = iconUrl("ic_code");
			break;
		default:
			thumb = iconUrl("ic_file");
	}
	return thumb;
}

// ----------------------------------------------------------------------

export function fileTypeByUrl(fileUrl = "") {
	return (fileUrl && fileUrl.split(".").pop()) || "";
}

// ----------------------------------------------------------------------

export function fileNameByUrl(fileUrl) {
	return fileUrl.split("/").pop();
}

// ----------------------------------------------------------------------

export function fileData(file) {
	// Url
	if (typeof file === "string") {
		return {
			key: file,
			preview: file,
			name: fileNameByUrl(file),
			type: fileTypeByUrl(file),
		};
	}

	// File
	return {
		key: file.preview,
		name: file.name,
		size: file.size,
		path: file.path,
		type: file.type,
		preview: file.preview,
		lastModified: file.lastModified,
		lastModifiedDate: file.lastModifiedDate,
	};
}
