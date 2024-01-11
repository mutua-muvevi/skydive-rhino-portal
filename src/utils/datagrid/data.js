// utils/datagrid.js

import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { fDateAlt } from "../format-time";

/**
 * Processes data and generates rows and columns for DataGrid.
 * @param {Array} data Array of data objects.
 * @param {Function} nestedDataRenderer Function to render nested data.
 * @returns {Object} Object containing rows and columns.
 */

// utils/datagrid/data.js

export const renderNestedTable = (nestedArray) => {
	// Define columns for the nested table based on the keys of the first object in the array
	const nestedColumns = Object.keys(nestedArray[0] || {}).map((key) => ({
		field: key,
		headerName: key.charAt(0).toUpperCase() + key.slice(1),
		flex: 1,
	}));

	// Return a component that renders the nested table
	return (
		<Box sx={{ mt: 2, mb: 2 }}>
			<DataGrid
				rows={nestedArray.map((item, index) => ({
					...item,
					id: index,
				}))}
				columns={nestedColumns}
				pageSize={5}
				rowsPerPageOptions={[5]}
				autoHeight
				hideFooter
				disableSelectionOnClick
			/>
		</Box>
	);
};

export const processDataForGrid = (data, nestedDataRenderer) => {
	const columns = [];
	const rows = [];

	// Define a function to pluralize the column name if needed
	const pluralize = (count, singular) => {
		return count === 1 ? singular : singular + "s";
	};

	// Process each data item
	data.forEach((item, index) => {
		const processedItem = {
			...Object.keys(item).reduce((acc, key) => {
				if (
					key.toLowerCase().includes(`date`) ||
					key.includes(`createdAt`)
				) {
					// Format date fields
					acc[key] = fDateAlt(item[key]);
				} else {
					// Include other fields as they are
					acc[key] = item[key];
				}
				return acc;
			}, {}),
			id: index,
		};

		// Iterate through each key in the item to define columns and process nested objects/arrays.
		Object.keys(item).forEach((key) => {
			if (key !== "_id" && key !== "__v") {
				// Add column if not already present
				if (!columns.some((col) => col.field === key)) {
					let headerName = key.charAt(0).toUpperCase() + key.slice(1);

					let column = {
						field: key,
						headerName: headerName,
						flex: 1,
						// Add more properties to the column if needed
					};

					if (Array.isArray(item[key])) {
						// Use a custom renderCell function for arrays to show the count
						column.renderCell = (params) => {
							const count = params.value.length;
							return `${count} ${pluralize(count, key)}`; // e.g., "3 Participants"
						};
					} else if (
						typeof item[key] === "object" &&
						item[key] !== null
					) {
						// Custom rendering for objects if necessary
						column.renderCell = (params) =>
							nestedDataRenderer(key, params.value);
					}

					columns.push(column);
				}

				// Process nested objects and arrays
				if (Array.isArray(item[key])) {
					processedItem[key] = item[key]; // Assign the array directly
				} else if (
					typeof item[key] === "object" &&
					item[key] !== null
				) {
					// For objects, extract the desired property based on availability
					const objectValue = item[key];
					processedItem[key] =
						objectValue.fullname ||
						objectValue.email ||
						objectValue.title ||
						Object.values(objectValue)[0];
				}
			}
		});

		rows.push(processedItem);
	});

	return { rows, columns };
};
