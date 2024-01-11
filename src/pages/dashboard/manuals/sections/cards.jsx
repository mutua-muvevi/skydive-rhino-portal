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
import { setManual } from "../../../../redux/slices/manuals";
import ModalComponent from "../../../../components/modal/modal";
import Manual from "../manual/manual";
import EditManual from "../edit/edit";
import DeleteManual from "../delete/delete";

const ManualsCards = ({ manual }) => {
	const [openManual, setOpenManual] = useState(false);
	const [openEditManual, setOpenEditManual] = useState(false);
	const [openDeleteManual, setOpenDeleteManual] = useState(false);

	const { name, type, file } = manual;
	const theme = useTheme();

	const dispatch = useDispatch();

	const handleSetManual = () => {
		dispatch(setManual(manual));

		setOpenManual(true);
	};

	//edit Manual
	const handleEditManual = () => {
		dispatch(setManual(manual));

		setOpenEditManual(true);
	};

	//delete Manual
	const handleDeleteManual = () => {
		dispatch(setManual(manual));

		setOpenDeleteManual(true);
	};

	const modalActions = [
		{
			label: "Edit",
			icon: "uiw:edit",
			onClick: handleEditManual,
		},
		{
			label: "Delete",
			icon: "ic:baseline-delete",
			onClick: handleDeleteManual,
			color: "error",
		},
	];

	return (
		<>
			<Card>
				<CardActionArea onClick={handleSetManual}>
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
									icon="iconoir:book-solid"
									width={100}
									sx={{ color: theme.palette.primary.main }}
								/>
							</Box>
							<Stack direction="row" spacing={3}>
								<Typography variant="subtitle2" color="primary">
									Type:
								</Typography>
								<Typography variant="body2">
									{type ? sentenceCase(type): "no type provided"}
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

			{/* Manual Modal */}
			<ModalComponent
				open={openManual}
				onClose={() => setOpenManual(false)}
				title={`Manual : ${manual.name}`}
				fullWidth
				maxWidth="xl"
				actions={modalActions}
				backgroundIcon="fa-solid:funnel-dollar"
				height={650}
			>
				<Manual onClose={() => setOpenManual(false)}/>
			</ModalComponent>

			{/* Edit Modal */}
			<ModalComponent
				open={openEditManual}
				onClose={() => setOpenEditManual(false)}
				title={`Edit Manual: ${manual.name}`}
				fullWidth
				maxWidth="lg"
				height={650}
			>
				<EditManual  onClose={() => setOpenEditManual(false)} />
			</ModalComponent>

			{/* Delete Modal */}
			<ModalComponent
				open={openDeleteManual}
				onClose={() => setOpenDeleteManual(false)}
				title={`Delete Manual: ${manual.name}?`}
				maxWidth="sm"
				height={200}
			>
				<DeleteManual onClose={() => setOpenDeleteManual(false)}/>
			</ModalComponent>
		</>
	);
};

ManualsCards.propTypes = {
	manual: PropTypes.object.isRequired,
};

export default ManualsCards;
