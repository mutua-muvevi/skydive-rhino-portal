// utils/pie.js

/**
 * Processes reservation data to get the count of data per service.
 * @param {Array} data Array of reservation objects.
 * @returns {Object} Object containing series and labels for the pie chart.
 */
// Function to process data for Pie Chart
export const processPieChartData = (data) => {
	// The 'countPerService' object will hold the count of reservations per service
	const countPerService = data.reduce((acc, reservation) => {
		// Extract the service name from each reservation
		const serviceName = reservation.service
			? reservation.service.name
				? reservation.service.fullname
				: "No Service"
			: "No Service";

		// If 'serviceName' exists in accumulator 'acc', increment its count by 1
		// Otherwise, initialize it with 1
		acc[serviceName] = (acc[serviceName] || 0) + 1;

		// Return the updated accumulator for the next iteration
		return acc;
	}, {}); // Initialize the accumulator as an empty object

	// Extract the labels for the pie chart from the keys of 'countPerService'
	// These are the names of the services
	const labels = Object.keys(countPerService);

	// Map the labels to their corresponding counts to create the series data for the pie chart
	// 'series' will be an array of numbers representing the count of reservations for each service
	const series = labels.map((label) => countPerService[label]);

	// Return the processed data in an object containing 'labels' and 'series'
	// This format is compatible with most charting libraries
	return { labels, series };
};
