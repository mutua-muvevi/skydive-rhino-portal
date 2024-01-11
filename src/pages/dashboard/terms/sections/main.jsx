import { Button, Grid } from "@mui/material";
import TermsCards from "./cards";
import Iconify from "../../../../components/iconify";
import { useState } from "react";
import ModalComponent from "../../../../components/modal/modal";
import NewTerm from "../new/new";
import { useSelector } from "../../../../redux/store";

const TermsMain = () => {
	const [ openTerm, setOpenTerm ] = useState(false);

	const { terms: { data: allTerms } } = useSelector((state) => state.terms);

	const handleOpenTerm = () => {
		setOpenTerm(true);
	}

	return (
		<>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Button
						variant="contained"
						color="primary"
						endIcon={<Iconify icon="ic:baseline-plus" />}
						onClick={handleOpenTerm}
					>
						Add a Term, Policy, Waiver
					</Button>
				</Grid>
				{allTerms ? allTerms.map((term) => (
					<Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={term._id}>
						<TermsCards term={term}/>
					</Grid>
				)): null }
			</Grid>

			<ModalComponent
				open={openTerm}
				onClose={() => setOpenTerm(false)}
				title="Add a Term, Policy, Waiver"
				maxWidth="lg"
				height={620}
			>
				<NewTerm />
			</ModalComponent>
		</>
	);
};

export default TermsMain;
