import PropTypes from "prop-types";
import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	CardHeader,
	Stack,
	Typography,
	useTheme,
} from "@mui/material";
import { sentenceCase } from "change-case";
import Iconify from "../../../../components/iconify";
import { useState } from "react";
import { useDispatch } from "../../../../redux/store";
import { setTerm } from "../../../../redux/slices/terms";
import ModalComponent from "../../../../components/modal/modal";
import Term from "../term/term";
import EditTerm from "../edit/edit";
import DeleteTerm from "../delete/delete";

const TermsCards = ({ term }) => {
	const [openTerm, setOpenTerm] = useState(false);
	const [openEditTerm, setOpenEditTerm] = useState(false);
	const [openDeleteTerm, setOpenDeleteTerm] = useState(false);

	const { name, type, file } = term;
	const theme = useTheme();

	const dispatch = useDispatch();

	const handleSetTerm = () => {
		dispatch(setTerm(term));

		setOpenTerm(true);
	};

	//edit Term
	const handleEditTerm = () => {
		dispatch(setTerm(term));

		setOpenEditTerm(true);
	};

	//delete Term
	const handleDeleteTerm = () => {
		dispatch(setTerm(term));

		setOpenDeleteTerm(true);
	};

	const modalActions = [
		{
			label: "Edit",
			icon: "uiw:edit",
			onClick: handleEditTerm,
		},
		{
			label: "Delete",
			icon: "ic:baseline-delete",
			onClick: handleDeleteTerm,
			color: "error",
		},
	];

	return (
		<>
			<Card>
				<CardActionArea onClick={handleSetTerm}>
					<CardHeader title={sentenceCase(name)} />
					<CardContent>
						<Stack direction="column" spacing={1}>
							<Box
								sx={{
									position: "absolute",
									right: 0,
									top: "10%",
									opacity: 0.2,
									zIndex: -1,
								}}
							>
								<Iconify
									icon="clarity:contract-solid"
									width={100}
									sx={{ color: theme.palette.primary.main }}
								/>
							</Box>
							<Stack direction="row" spacing={3}>
								<Typography variant="subtitle2" color="primary">
									Type:
								</Typography>
								<Typography variant="body2">
									{sentenceCase(type)}
								</Typography>
							</Stack>

							{/* file icon and file */}
							<Stack direction="row" spacing={3}>
								<Typography variant="subtitle2" color="primary">
									File:
								</Typography>
								<Typography variant="body2">
									{file ? file.split("/").pop() : "No File"}
								</Typography>
							</Stack>
						</Stack>
					</CardContent>
				</CardActionArea>
			</Card>

			{/* Term Modal */}
			<ModalComponent
				open={openTerm}
				onClose={() => setOpenTerm(false)}
				title={`Term : ${term.name}`}
				fullWidth
				maxWidth="xl"
				actions={modalActions}
				backgroundIcon="fa-solid:funnel-dollar"
				height={650}
			>
				<Term onClose={() => setOpenTerm(false)}/>
			</ModalComponent>

			{/* Edit Modal */}
			<ModalComponent
				open={openEditTerm}
				onClose={() => setOpenEditTerm(false)}
				title={`Edit Term: ${term.name}`}
				fullWidth
				maxWidth="lg"
				height={650}
			>
				<EditTerm  onClose={() => setOpenEditTerm(false)} />
			</ModalComponent>

			{/* Delete Modal */}
			<ModalComponent
				open={openDeleteTerm}
				onClose={() => setOpenDeleteTerm(false)}
				title={`Delete Term: ${term.name}?`}
				maxWidth="sm"
				height={200}
			>
				<DeleteTerm onClose={() => setOpenDeleteTerm(false)}/>
			</ModalComponent>
		</>
	);
};

TermsCards.propTypes = {
	term: PropTypes.object.isRequired,
};

export default TermsCards;
