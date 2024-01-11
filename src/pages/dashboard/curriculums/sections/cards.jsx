import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	CardHeader,
	CardMedia,
	Stack,
	Typography,
	useTheme,
} from "@mui/material";
import { sentenceCase } from "change-case";
import { truncateStr } from "../../../../utils/format-string";
import PropTypes from "prop-types";
import Iconify from "../../../../components/iconify";
import { useState } from "react";
import ModalComponent from "../../../../components/modal/modal";
import Curriculum from "../curriculum/curriculum";
import EditCurriculum from "../edit/edit";
import DeleteCurriculum from "../delete/delete";

const CurriculumsCard = ({ curriculum }) => {
	const [openCurriculum, setOpenCurriculum] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);

	const theme = useTheme();

	const {
		title,
		introDescription,
		thumbnail,
		author: { fullname },
	} = curriculum;

	const handleOpenCurriculum = () => {
		setOpenCurriculum(true);
	};

	//edit curriculum
	const handleEditCurriculum = () => {
		setOpenEdit(true);
	};

	//delete curriculum
	const handleDeleteCurriculum = () => {
		setOpenDelete(true);
	};

	//modal Actions
	const modalActions = [
		{
			label: "Edit",
			icon: "uiw:edit",
			onClick: handleEditCurriculum,
		},
		{
			label: "Delete",
			icon: "ic:baseline-delete",
			onClick: handleDeleteCurriculum,
			color: "error",
		},
	];

	return (
		<>
			<Card>
				<CardActionArea onClick={handleOpenCurriculum}>
					{curriculum && thumbnail ? (
						<CardMedia
							component="img"
							height={250}
							image={thumbnail}
							alt={title}
						/>
					) : (
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								width: "100%",
								height: 400,
								backgroundColor: "rgba(0, 0, 0, 0.5)",
								padding: 2,
							}}
						>
							<Iconify
								icon="fluent-emoji-high-contrast:parachute"
								width={1}
							/>
						</Box>
					)}
					<CardHeader
						title={
							curriculum.title
								? truncateStr(
										sentenceCase(curriculum.title),
										30
								)
								: "Curriculum title"
						}
						sx={{ color: theme.palette.primary.main }}
					/>
					<CardContent>
						<Stack direction="column" spacing={3}>
							<Typography variant="body2">
								{truncateStr(
									sentenceCase(introDescription),
									200
								)}
							</Typography>

							<Stack direction="column">
								<Typography variant="subtitle1" color="primary">
									Author
								</Typography>
								<Typography
									variant="body2"
									sx={{ textTransform: "capitalize" }}
								>
									{fullname}
								</Typography>
							</Stack>
						</Stack>
					</CardContent>
				</CardActionArea>
			</Card>

			{/* Curriculum Modal */}
			<ModalComponent
				title={`Curriculum : ${title}`}
				open={openCurriculum}
				onClose={() => setOpenCurriculum(false)}
				height={700}
				actions={modalActions}
			>
				<Curriculum
					curriculum={curriculum}
					onClose={() => setOpenCurriculum(false)}
				/>
			</ModalComponent>

			{/* Edit Modal */}
			<ModalComponent
				title={`Edit Curriculum: ${title}`}
				open={openEdit}
				onClose={() => setOpenEdit(false)}
				height={700}
				maxWidth="lg"
			>
				<EditCurriculum
					curriculum={curriculum}
					onClose={() => setOpenEdit(false)}
				/>
			</ModalComponent>

			{/* Delete Modal */}
			<ModalComponent
				title={`Delete Curriculum:  ${title}?`}
				open={openDelete}
				onClose={() => setOpenDelete(false)}
				height={200}
				maxWidth="sm"
			>
				<DeleteCurriculum
					curriculum={curriculum}
					onClose={() => setOpenDelete(false)}
				/>
			</ModalComponent>
		</>
	);
};

CurriculumsCard.propTypes = {
	curriculum: PropTypes.object.isRequired,
};

export default CurriculumsCard;
