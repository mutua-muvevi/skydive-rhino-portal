import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Typography,
	useTheme,
} from "@mui/material";
import { sentenceCase } from "change-case";
import PropTypes from "prop-types";

const TableComponent = ({ columns, array }) => {
	const theme = useTheme();

	return (
		<TableContainer
			component={Paper}
			sx={{
				borderRadius: theme.shape.default,
				boxShadow: theme.shadows[3],
			}}
		>
			<Table size="small" aria-label="a dense table">
				<TableHead>
					<TableRow>
						{columns.map((column) => (
							<TableCell key={column} sx={{
								paddingTop: 2,
								paddingBottom: 2,
							}}>
								<Typography variant="subtitle1">
									{sentenceCase(column)}
								</Typography>
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{array.map((row, index) => (
						<TableRow
							key={index}
							sx={{
								"&:nth-of-type(2n)": {
									backgroundColor:
										theme.palette.background.neutral, // Or any color you want
								},
							}}
						>
							{columns.map((column) => (
								<TableCell
									key={`${index}_${column}`}
									sx={{
										paddingTop: 1.5,
										paddingBottom: 1.5,
									}}
								>
									<Typography variant="body2">
										{row[column]}
									</Typography>
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

TableComponent.propTypes = {
	columns: PropTypes.array,
	array: PropTypes.array,
};

export default TableComponent;
