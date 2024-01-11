const logError = (message, error) => {
	console.error(`[reportWebVitals] ${message}`, error);
};

const reportWebVitals = (onPerfEntry) => {
	if (onPerfEntry && typeof onPerfEntry === "function") {
		import("web-vitals")
			.then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
				getCLS(onPerfEntry);
				getFID(onPerfEntry);
				getFCP(onPerfEntry);
				getLCP(onPerfEntry);
				getTTFB(onPerfEntry);
			})
			.catch((error) => {
				logError("Failed to import web-vitals library", error);
			});
	}
};

export default reportWebVitals;
