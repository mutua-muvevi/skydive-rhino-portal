// utils/graph.js
import { format, subMonths } from "date-fns";

/**
 * Processes data data to get the count of data per month for the last 12 months.
 * @param {Array} data Array of data objects.
 * @returns {Object} Object containing series and labels for the bar chart.
 */
export const processAnualCollumnData = (data, name) => {
	const currentDate = new Date();
	const months = {};

	// Initialize months
	for (let i = 11; i >= 0; i--) {
		const monthDate = subMonths(currentDate, i);
		const formattedMonth = format(monthDate, "MMM yyyy");
		months[formattedMonth] = 0;
	}

	data.forEach((data) => {
		if (data.date) {
			const date = new Date(data.date);
			const dataMonth = format(date, "MMM yyyy");

			if (dataMonth in months) {
				months[dataMonth]++;
			}
		}
		const createdAt = new Date(data.createdAt);
		const dataMonth = format(createdAt, "MMM yyyy");

		if (dataMonth in months) {
			months[dataMonth]++;
		}
		
	});

	const labels = Object.keys(months);
	const series = labels.map((label) => months[label]);

	return {
		series: [
			{
				name: name,
				data: series,
			},
		],
		categories: labels,
	};
};
