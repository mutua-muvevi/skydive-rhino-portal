import { Box, Button, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "../../../../redux/store";
import DataGridCustom from "../../../../components/datagrid/custom";
import Iconify from "../../../../components/iconify";
import ModalComponent from "../../../../components/modal/modal";
import { useState } from "react";
import DeleteAnnouncement from "../delete/delete";
import { setAnnouncement } from "../../../../redux/slices/announcements";
import NewAnnouncement from "../new/new";

const AnnouncementMain = () => {
	const [openNew, setOpenNew] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const dispatch = useDispatch();

	const {
		announcements: { data: allAnnounceMents },
	} = useSelector((state) => state.announcements);

	const handleOpenNewAnnouncement = () => {
		setOpenNew(true);
	}

	const modalActions = [
		{
			label: "Delete",
			action: "delete",
			icon: "ic:baseline-delete",
			onClick: (rowData) => {
				setOpenDelete(true);
				dispatch(setAnnouncement(rowData))
			}
		},
	];

	return (
		<Stack direction="column" spacing={6}>
			<Box>
				<Button
					variant="contained"
					endIcon={<Iconify icon="ic:baseline-add" />}
					onClick={handleOpenNewAnnouncement}
				>
					<Typography variant="subtitle1">
						Make an Announcement
					</Typography>
				</Button>
			</Box>

			<DataGridCustom
				data={allAnnounceMents}
				title="Announcement List"
				modalActions={modalActions}
				modalTitle="Announcement"
			/>

			{/* new announcement */}
			<ModalComponent
				open={openNew}
				onClose={() => setOpenNew(false)}
				title="New Announcement"
				height={350}
				maxWidth="md"
			>
				<NewAnnouncement/>
			</ModalComponent>

			{/* delete announcement */}
			<ModalComponent
				open={openDelete}
				onClose={() => setOpenDelete(false)}
				title="Delete Announcement"
				height={230}
				maxWidth="sm"
			>
				<DeleteAnnouncement/>
			</ModalComponent>
		</Stack>
	);
};

export default AnnouncementMain;
