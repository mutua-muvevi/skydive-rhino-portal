import { Button, Grid } from "@mui/material";
import ManualsCards from "./cards";
import Iconify from "../../../../components/iconify";
import { useState } from "react";
import ModalComponent from "../../../../components/modal/modal";
import NewManual from "../new/new";
import { useSelector } from "../../../../redux/store";

const ManualsMain = () => {
	const [ openManual, setOpenManual ] = useState(false);

	const { manuals: { data: allManuals } } = useSelector((state) => state.manuals);

	const handleOpenManual = () => {
		setOpenManual(true);
	}

	return (
		<>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Button
						variant="contained"
						color="primary"
						endIcon={<Iconify icon="ic:baseline-plus" />}
						onClick={handleOpenManual}
					>
						Add a new manual
					</Button>
				</Grid>
				{allManuals ? allManuals.map((manual) => (
					<Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={manual._id}>
						<ManualsCards manual={manual}/>
					</Grid>
				)): null }
			</Grid>

			<ModalComponent
				open={openManual}
				onClose={() => setOpenManual(false)}
				title="Add a new manual"
				maxWidth="lg"
				height={620}
			>
				<NewManual />
			</ModalComponent>
		</>
	);
};

export default ManualsMain;
