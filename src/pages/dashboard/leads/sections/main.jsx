import { Button, Grid, Typography } from "@mui/material";
import LeadGraph from "./graph";
import LeadPie from "./pie";
import LeadCards from "./card";
import { useSelector } from "../../../../redux/store";
import Iconify from "../../../../components/iconify";
import { useState } from "react";
import ModalComponent from "../../../../components/modal/modal";
import NewLead from "../new/new";

const LeadMain = () => {
	const {
		leads: { data: allLeads },
	} = useSelector((state) => state.leads);
	const [openAddLead, setOpenAddLead] = useState(false);

	return (
		<>
			<Grid container spacing={3}>
				<Grid item xs={12} md={6} lg={8} xl={9}>
					<LeadGraph />
				</Grid>
				<Grid item xs={12} md={6} lg={4} xl={3}>
					<LeadPie />
				</Grid>
				<Grid item xs={12}>
					<Button
						variant="contained"
						endIcon={<Iconify icon="mdi:plus" />}
						onClick={() => setOpenAddLead(true)}
					>
						<Typography variant="subtitle2">Add a lead</Typography>
					</Button>
				</Grid>
				{allLeads
					? allLeads.map((lead) => {
							return (
								<Grid
									item
									xs={12}
									md={6}
									lg={4}
									xl={3}
									key={lead._id}
								>
									<LeadCards lead={lead} />
								</Grid>
							);
					  })
					: null}
			</Grid>

			{/* Add New Lead */}
			<ModalComponent
				open={openAddLead}
				onClose={() => setOpenAddLead(false)}
				title="Add New Lead"
				size="md"
				fullWidth
				maxWidth="lg"
				backgroundIcon="fa:plus"
				height={650}
			>
				<NewLead onClose={() => setOpenAddLead(false)}/>
			</ModalComponent>

		</>
	);
};

export default LeadMain;