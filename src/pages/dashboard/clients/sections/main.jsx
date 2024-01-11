import { Button, Grid, Typography } from "@mui/material";
import ClientGraph from "./graph";
import ClientPie from "./pie";
import ClientCards from "./card";
import { useSelector } from "../../../../redux/store";
import Iconify from "../../../../components/iconify";
import { useState } from "react";
import ModalComponent from "../../../../components/modal/modal";
import NewClient from "../new/new";

const ClientMain = () => {
	const {
		clients: { data: allClients },
	} = useSelector((state) => state.clients);
	const [openAddClient, setOpenAddClient] = useState(false);

	return (
		<>
			<Grid container spacing={3}>
				<Grid item xs={12} md={6} lg={8} xl={9}>
					<ClientGraph />
				</Grid>
				<Grid item xs={12} md={6} lg={4} xl={3}>
					<ClientPie />
				</Grid>
				<Grid item xs={12}>
					<Button
						variant="contained"
						endIcon={<Iconify icon="mdi:plus" />}
						onClick={() => setOpenAddClient(true)}
					>
						<Typography variant="subtitle2">Add a client</Typography>
					</Button>
				</Grid>
				{allClients
					? allClients.map((client) => {
							return (
								<Grid
									item
									xs={12}
									md={6}
									lg={4}
									xl={3}
									key={client._id}
								>
									<ClientCards client={client} />
								</Grid>
							);
					  })
					: null}
			</Grid>

			{/* Add New Client */}
			<ModalComponent
				open={openAddClient}
				onClose={() => setOpenAddClient(false)}
				title="Add New Client"
				size="md"
				fullWidth
				maxWidth="lg"
				height={650}
			>
				<NewClient onClose={() => setOpenAddClient(false)}/>
			</ModalComponent>

		</>
	);
};

export default ClientMain;