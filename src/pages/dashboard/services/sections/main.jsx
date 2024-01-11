import { Button, Stack, Typography } from "@mui/material";
import { useSelector } from "../../../../redux/store";
import ServiceCards from "./card";
import { useState } from "react";
import ModalComponent from "../../../../components/modal/modal";
import NewService from "../new/new";

const ServiceMain = () => {
	const [openModal, setOpenModal] = useState(false);

	const {
		services: { data: allServices },
	} = useSelector((state) => state.services);

	const handleOpenModal = () => {
		setOpenModal(true);
	};

	return (
		<>
			<Stack direction="column" spacing={5}>
				<div>
					<Button
						variant="contained"
						color="primary"
						onClick={handleOpenModal}
					>
						<Typography variant="subtitle1">
							Add a new Service
						</Typography>
					</Button>
				</div>

				{allServices.map((service) => (
					<div key={service._id}>
						<ServiceCards service={service} />
					</div>
				))}
			</Stack>

			<ModalComponent
				title="Add a new Service"
				open={openModal}
				onClose={() => setOpenModal(false)}
				height={700}
				maxWidth="xl"
			>
				<NewService onClose={() => setOpenModal(false)} />
			</ModalComponent>
		</>
	);
};

export default ServiceMain;
