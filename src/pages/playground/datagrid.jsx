import {
	Container,
	Grid,
	Stack,
	Typography,
} from "@mui/material";
import DataGridBasic from "../../components/datagrid/default";

// _mock_
import _mock, { randomInArray } from "../../_mock";
import DataGridCustom from "../../components/datagrid/custom";

export const _dataGrid = [...Array(36)].map((_, index) => ({
	_id: _mock.id(index),
	name: _mock.name.fullName(index),
	email: _mock.email(index),
	lastLogin: _mock.time(index),
	performance: _mock.number.percent(index),
	rating: _mock.number.rating(index),
	status: randomInArray(["online", "away", "busy"]),
	isAdmin: _mock.boolean(index),
	lastName: _mock.name.lastName(index),
	firstName: _mock.name.firstName(index),
	age: _mock.number.age(index),
}));

const ComponentsPlayground = () => {
	return (
		<Container maxWidth="xl" sx={{ my: "50px" }}>
			<Stack spacing={3} sx={{pb: "50px"}}>
				<Typography variant="h3" textAlign="left">
					Datagrid Playground
				</Typography>

				<div>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<DataGridBasic
								data={_dataGrid}
								title="Basic Datagrid"
							/>
						</Grid>
						<Grid item xs={12}>
							<DataGridCustom
								data={_dataGrid}
								title="Custom Datagrid"
							/>
						</Grid>
					</Grid>
				</div>
			</Stack>
		</Container>
	);
};

export default ComponentsPlayground;
