export const getFilenameFromUrl = (url) => {
	try {
		const pathname = new URL(url).pathname;
		const filename = pathname.split("/").pop(); // Extracts the last segment of the URL path

		// Regular expression to remove leading numbers, hyphens, and encoded characters
		const sanitizedFilename = filename
			.replace(/^[\d%-]+/, "")
			.replace(/%20/g, " ");

		return sanitizedFilename;
	} catch (error) {
		console.error("Invalid URL:", error);
		return null;
	}
};
