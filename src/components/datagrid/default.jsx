import PropTypes from "prop-types";
// @mui
import { DataGrid } from "@mui/x-data-grid";
import { Box, Card, CardHeader, IconButton } from "@mui/material";
import { styled } from "@mui/system";
// components
import Iconify from "../iconify";

// ----------------------------------------------------------------------

const columns = [
	{
		field: "id",
		headerName: "ID",
		width: 120,
	},
	{
		field: "firstName",
		headerName: "First name",
		width: 160,
		editable: true,
	},
	{
		field: "lastName",
		headerName: "Last name",
		width: 160,
		editable: true,
	},
	{
		field: "age",
		headerName: "Age",
		type: "number",
		width: 120,
		editable: true,
		align: "center",
		headerAlign: "center",
	},
	{
		field: "fullName",
		headerName: "Full name",
		description: "This column has a value getter and is not sortable.",
		flex: 1,
		valueGetter: (params) =>
			`${params.row.firstName || ""} ${params.row.lastName || ""}`,
	},
	{
		field: "action",
		headerName: " ",
		width: 80,
		align: "right",
		sortable: false,
		disableColumnMenu: true,
		renderCell: () => (
			<IconButton>
				<Iconify icon="eva:more-vertical-fill" />
			</IconButton>
		),
	},
];

const StyledDataGridContainer = styled(Card)(({ theme }) => ({
	borderRadius: theme.shape.default,
}));

const StyledDataGridHeader = styled(CardHeader)(({ theme }) => ({
	backgroundColor: theme.palette.primary.main,
	color: "#fff",
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

const DataGridBasic = ({ data }) => {
	return (
		<StyledDataGridContainer>
			<StyledDataGridHeader title="Basic Datagrid" />

			<Box style={{ height: "600px" }}>
				<StyledDataGrid
					columns={columns}
					rows={data}
					checkboxSelection
					disableSelectionOnClick
					getRowId={(row) => row._id}
					pageSize={20}
				/>
			</Box>
		</StyledDataGridContainer>
	);
};

DataGridBasic.propTypes = {
	data: PropTypes.array,
	title: PropTypes.string,
	height: PropTypes.string,
};

export default DataGridBasic;
