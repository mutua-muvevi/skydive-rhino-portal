import { Box, Button, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "../../../../redux/store";
import DataGridCustom from "../../../../components/datagrid/custom";
import Iconify from "../../../../components/iconify";
import ModalComponent from "../../../../components/modal/modal";
import { useState } from "react";
import DeleteVoicemail from "../delete/delete";
import { setVoicemail } from "../../../../redux/slices/voicemails";
import NewVoicemail from "../new/new";
import EditVoicemail from "../edit/edit";

const VoicemailsMain = () => {
	const [openNew, setOpenNew] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const dispatch = useDispatch();

	const {
		voicemails: { data: allVoicemailss },
	} = useSelector((state) => state.voicemails);

	const handleOpenNewVoicemail = () => {
		setOpenNew(true);
	}

	const modalActions = [
		{
			label: "Edit",
			action: "edit",
			icon: "uiw:edit",
			onClick: (rowData) => {
				setOpenEdit(true);
				dispatch(setVoicemail(rowData))
			}
		},
		{
			label: "Delete",
			action: "delete",
			icon: "ic:baseline-delete",
			onClick: (rowData) => {
				setOpenDelete(true);
				dispatch(setVoicemail(rowData))
			}
		},
	];

	return (
		<Stack direction="column" spacing={6}>
			<Box>
				<Button
					variant="contained"
					endIcon={<Iconify icon="ic:baseline-add" />}
					onClick={handleOpenNewVoicemail}
				>
					<Typography variant="subtitle1">
						Make an Voicemail
					</Typography>
				</Button>
			</Box>

			<DataGridCustom
				data={allVoicemailss}
				title="Voicemail List"
				modalActions={modalActions}
				modalTitle="Voicemail"
			/>

			{/* new voicemail */}
			<ModalComponent
				open={openNew}
				onClose={() => setOpenNew(false)}
				title="New Voicemail"
				height={450}
				maxWidth="md"
			>
				<NewVoicemail onClose={() => setOpenDelete(false)}/>
			</ModalComponent>

			{/* edit voicemail */}
			<ModalComponent
				open={openEdit}
				onClose={() => setOpenEdit(false)}
				title="Edit Voicemail"
				height={450}
				maxWidth="lg"
			>
				<EditVoicemail onClose={() => setOpenEdit(false)}/>
			</ModalComponent>

			{/* delete voicemail */}
			<ModalComponent
				open={openDelete}
				onClose={() => setOpenDelete(false)}
				title="Delete Voicemail"
				height={230}
				maxWidth="sm"
			>
				<DeleteVoicemail onClose={() => setOpenDelete(false)}/>
			</ModalComponent>
		</Stack>
	);
};

export default VoicemailsMain;
