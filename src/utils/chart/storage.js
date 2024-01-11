// utils/graph.js

import { format, parseISO } from "date-fns";

/**
 * Processes storage data to get the count of files per category for the graph.
 * @param {Object} data Object containing storage data.
 * @returns {Object} Object containing series and labels for the line chart.
 */
export const processStorageDataForLineGraph = (data) => {
	const categoriesMap = {};

	// Loop through each category in the data
	for (const [category, info] of Object.entries(data)) {
		info.files.forEach((file) => {
			const date = format(parseISO(file.uploaded), "yyyy-MM-dd");
			if (!categoriesMap[date]) {
				categoriesMap[date] = {};
			}
			categoriesMap[date][category] =
				(categoriesMap[date][category] || 0) + 1;
		});
	}

	const categories = Object.keys(categoriesMap).sort();
	const series = Object.keys(data).map((category) => {
		return {
			name: category,
			data: categories.map((date) => categoriesMap[date][category] || 0),
		};
	});

	return { series, categories };
};
