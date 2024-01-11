import PropTypes from "prop-types";
import { useState } from "react";
// @mui
import { useTheme } from "@mui/material/styles";
import {
	Stack,
	Typography,
	Box,
	Rating,
	LinearProgress,
	IconButton,
	Card,
	CardHeader,
} from "@mui/material";
import {
	DataGrid,
	GridToolbar,
	getGridNumericOperators,
} from "@mui/x-data-grid";
// utils
import { fPercent } from "../../utils/format-number";
// components
import Label from "../label";
import Iconify from "../iconify";
import { CustomAvatar } from "../custom-avatar";
import { styled } from "@mui/system";
import {
	processDataForGrid,
	renderNestedTable,
} from "../../utils/datagrid/data";

import ModalComponent from "./modal";
import { sentenceCase } from "change-case";

// ----------------------------------------------------------------------

DataGridCustom.propTypes = {
	data: PropTypes.array,
	checkboxSelection: PropTypes.bool,
	title: PropTypes.string,
	height: PropTypes.string,
	modalActions: PropTypes.array,
	modalTitle: PropTypes.string,
};

const StyledDataGridContainer = styled(Card)(({ theme }) => ({
	borderRadius: theme.shape.default,
}));

const StyledDataGridHeader = styled(CardHeader)(({ theme }) => ({
	backgroundColor: theme.palette.primary.main,
	color: theme.palette.primary.contrastText,
	fontFamily: "'Rubik', sans-serif",
	padding: 15,
}));

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
	border: "none",
	backgroundColor: theme.palette.background.neutral,
	width: "100%",
	borderRadius: theme.shape.default,
	"& .MuiDataGrid-columnHeaders": {
		backgroundColor: theme.palette.primary.dark,
		color: theme.palette.primary.contrastText,
		fontSize: 16,
		paddingTop: 2,
		paddingBottom: 2,
		borderRadius: 0,
	},
	"& .MuiDataGrid-virtualScrollerRenderZone": {
		"& .MuiDataGrid-row": {
			"&:nth-of-type(2n)": {
				backgroundColor: theme.palette.background.default,
			},
		},
	},
}));

export default function DataGridCustom({
	data,
	checkboxSelection,
	title,
	height,
	modalActions,
	modalTitle,
}) {
	const [selectedRow, setSelectedRow] = useState(null);

	const nestedDataRenderer = (key, value) => {
		// Implement rendering logic for nested data
		return <span>{value}</span>;
	};

	const { rows, columns } = processDataForGrid(data, nestedDataRenderer);

	// Function to handle row click
	const handleRowClick = (params) => {
		setSelectedRow(params.row); // Set the selected row data
	};

	if (columns.length > 0) {
		const ratingColumn = columns.find(
			(column) => column.field === "rating"
		);
		const ratingColIndex = columns.findIndex(
			(col) => col.field === "rating"
		);

		const ratingFilterOperators = getGridNumericOperators().map(
			(operator) => ({
				...operator,
				InputComponent: RatingInputValue,
			})
		);
		columns[ratingColIndex] = {
			...ratingColumn,
			filterOperators: ratingFilterOperators,
		};
	}

	// const selected = data.filter((row) => selectionModel.includes(row._id));

	return (
		<>
			<StyledDataGridContainer>
				<StyledDataGridHeader
					title={title ? sentenceCase(title) : "Data table"}
				/>

				<Box style={{ height: height ? height : "600px" }}>
					<StyledDataGrid
						checkboxSelection={checkboxSelection ? true : false}
						disableSelectionOnClick
						rows={rows}
						columns={columns}
						pagination
						getRowId={(row) => row._id}
						components={{
							Toolbar: GridToolbar,
						}}
						onRowClick={handleRowClick}
						// renderCell={renderCell}
					/>
				</Box>
			</StyledDataGridContainer>

			<ModalComponent
				selectedRow={selectedRow}
				open={Boolean(selectedRow)}
				onClose={() => setSelectedRow(null)}
				actions={modalActions}
				title={modalTitle}
			/>
		</>
	);
}

// ----------------------------------------------------------------------

function RenderStatus(getStatus) {
	const theme = useTheme();
	const isLight = theme.palette.mode === "light";
	return (
		<Label
			variant={isLight ? "soft" : "filled"}
			color={
				(getStatus === "busy" && "error") ||
				(getStatus === "away" && "warning") ||
				"success"
			}
			sx={{ mx: "auto" }}
		>
			{getStatus}
		</Label>
	);
}

// ----------------------------------------------------------------------

RatingInputValue.propTypes = {
	item: PropTypes.object,
	applyValue: PropTypes.func,
};

function RatingInputValue({ item, applyValue }) {
	return (
		<Box sx={{ p: 1, height: 1, alignItems: "flex-end", display: "flex" }}>
			<Rating
				size="small"
				precision={0.5}
				placeholder="Filter value"
				value={Number(item.value)}
				onChange={(event, newValue) => {
					applyValue({ ...item, value: newValue });
				}}
			/>
		</Box>
	);
}
