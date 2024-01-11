import { useState } from "react";
import {
	Alert,
	AlertTitle,
	Card,
	CardContent,
	Dialog,
	Grow,
	MenuItem,
	Snackbar,
	Stack,
	Typography,
	useTheme,
} from "@mui/material";
import Iconify from "../../components/iconify";
import { PropTypes } from "prop-types";
import Iframe from "../../components/iframe";
import { IconButtonAnimate } from "../../components/animate";
import MenuPopover from "../../components/menu-popover";
import { getFilenameFromUrl } from "../../utils/get-filename";
import { useDispatch, useSelector } from "../../redux/store";
import { deleteFile, downloadFile } from "../../redux/slices/storage";

const OpenFolderModal = ({ open, onClose, file }) => {
	const [openPopover, setOpenPopover] = useState(null);
	const [openDelete, setOpenDelete] = useState(null);
	const [openDownloading, setOpenDownloading] = useState(null);

	const { me } = useSelector((state) => state.user);

	const token = localStorage.getItem("token");

	const dispatch = useDispatch();
	const theme = useTheme();

	const handleOpenPopover = (event) => {
		setOpenPopover(event.currentTarget);
	};

	const handleClosePopover = () => {
		setOpenPopover(null);
	};

	const OPTIONS = [
		{
			label: "Download",
			linkTo: "",
			icon: "mdi:download",
			color: theme.palette.primary.main,
			onClick: async () => {
				setOpenDownloading(true);
				const filename = file.file.split("/").pop();

				const response = await dispatch(
					downloadFile(me._id, filename, token)
				);

				if (response.status === 200) {
					setOpenDownloading(false);
					handleClosePopover();
				}
			},
		},
		{
			label: "Delete",
			linkTo: "",
			icon: "mdi:trash",
			color: theme.palette.error.main,
			onClick: async () => {
				setOpenDelete(true);
				const filename = file.file.split("/").pop();

				const response = await dispatch(
					deleteFile(me._id, filename, token)
				);

				if (response.status === 200) {
					setOpenDelete(false);

					setTimeout(() => {
						window.location.reload();
					}, 3000);
				}
			},
		},
	];

	return (
		<div>
			{openDownloading && (
				<Grow
					in={openDownloading}
					style={{ transformOrigin: "0 0 0" }}
					timeout={1500}
				>
					<Snackbar
						open={openDownloading}
						anchorOrigin={{ vertical: "top", horizontal: "right" }}
					>
						<Alert severity="info" variant="filled">
							<AlertTitle>Download</AlertTitle>
							<Typography variant="body2">
								Preparing to download file ...
							</Typography>
						</Alert>
					</Snackbar>
				</Grow>
			)}

			{openDelete && (
				<Grow
					in={openDelete}
					style={{ transformOrigin: "0 0 0" }}
					timeout={1500}
				>
					<Snackbar
						open={openDelete}
						anchorOrigin={{ vertical: "top", horizontal: "right" }}
					>
						<Alert severity="error" variant="filled">
							<AlertTitle>Delete</AlertTitle>
							<Typography variant="body2">
								Deleting the file ...
							</Typography>
						</Alert>
					</Snackbar>
				</Grow>
			)}

			<Dialog onClose={onClose} open={open} maxWidth="xl" fullWidth>
				<Card>
					<CardContent>
						<Stack direction="column" spacing={3}>
							<Stack
								direction="row"
								justifyContent="space-between"
							>
								<Typography variant="h5">
									Filename: {getFilenameFromUrl(file.file)}
								</Typography>

								<IconButtonAnimate
									onClick={handleOpenPopover}
									sx={{
										p: 0,
										...(openPopover && {
											"&:before": {
												zIndex: 1,
												content: "''",
												width: "100%",
												height: "100%",
												borderRadius: "50%",
												position: "absolute",
											},
										}),
									}}
								>
									<Iconify icon="pepicons-pop:dots-y" />
								</IconButtonAnimate>
							</Stack>

							<MenuPopover
								open={openPopover}
								onClose={handleClosePopover}
								sx={{ width: 200, p: 0 }}
							>
								<Stack sx={{ p: 1 }}>
									{OPTIONS.map((option) => (
										<MenuItem
											key={option.label}
											onClick={() =>
												option.onClick(option.linkTo)
											}
										>
											<Stack
												direction="row"
												spacing={1.5}
												alignItems="center"
											>
												<Iconify
													icon={option.icon}
													color={option.color}
												/>
												<Typography
													variant="subtitle2"
													style={{
														color: option.color,
													}}
												>
													{option.label}
												</Typography>
											</Stack>
										</MenuItem>
									))}
								</Stack>
							</MenuPopover>

							<Iframe
								src={file.file}
								title={file.name}
								style={{ height: "80vh" }}
								onError={(e) => console.log(e)}
							/>
						</Stack>
					</CardContent>
				</Card>
			</Dialog>
		</div>
	);
};

OpenFolderModal.propTypes = {
	open: PropTypes.bool,
	onClose: PropTypes.func,
	file: PropTypes.object,
};

export default OpenFolderModal;
