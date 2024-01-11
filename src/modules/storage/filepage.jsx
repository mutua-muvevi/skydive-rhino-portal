import { useState } from "react";
import PropTypes from "prop-types";
import {
	Button,
	Card,
	CardActionArea,
	CardContent,
	CardHeader,
	Grid,
	Typography,
	useTheme,
} from "@mui/material";
import { ChartArea, ChartPie } from "../../components/chart/types";
import { Stack } from "@mui/system";
import Iconify from "../../components/iconify";
import { getFilenameFromUrl } from "../../utils/get-filename";
import { formatBytes } from "../../utils/formatBytes";
import { fDate } from "../../utils/format-time";
import OpenFolderModal from "./modal";
import { StyledFolder } from "./styles";
import AddFileModal from "./add-file-modal";





const Filepage = ({ bannerGraph, fileType, sideGraph, files }) => {
	const [openFile, setOpenFile] = useState(false);
	const [openAddFile, setOpenAddFile] = useState(false);
	const [file, setFile] = useState({});

	//Open file handler
	const openFileHandler = (selectedFile) => {
		setOpenFile(true);
		setFile(selectedFile);
	};
	
	//add file handler
	const addFileHandler = () => {
		setOpenAddFile(true);
	};

	const theme = useTheme();

	//close modal
	const handleClose = () => {
		setOpenFile(false);
	};

	//close add open modal
	const handleCloseAddFile = () => {
		setOpenAddFile(false);
	};

	return (
		<Grid container spacing={3}>
			<Grid item xs={12} md={12} lg={8} xl={9}>
				<Card>
					<CardHeader title={`My ${fileType}`} />
					<CardContent>
						<ChartArea data={bannerGraph} />
					</CardContent>
				</Card>
			</Grid>

			<Grid item xs={12} md={12} lg={4} xl={3}>
				<Card>
					<CardHeader title={`My ${fileType}`} />
					<CardContent>
						<ChartPie data={sideGraph} />
					</CardContent>
				</Card>
			</Grid>

			<Grid item xs={12}>
				<StyledFolder>
					<Stack direction="row" justifyContent="space-between">
						<Typography variant="h5">My Images</Typography>
						<Button
							variant="outlined"
							icon={
								<Iconify icon="mdi:file-image-plus" height={50} />
							}
							onClick={addFileHandler}
						>
							Add Images
						</Button>
					</Stack>
				</StyledFolder>
			</Grid>

			{files
				? files.map((file, index) => (
						<Grid item xs={12} md={6} lg={4} xl={3} key={index}>
							<Card>
								<CardActionArea
									onClick={() => openFileHandler(file)}
								>
									<CardContent>
										<Stack
											direction="row"
											spacing={1.5}
											alignItems="flex-start"
										>
											<Iconify
												icon="mdi-file-image-outline"
												width={50}
												height={50}
												color={
													theme.palette.secondary.main
												}
											/>
											<Stack direction="column">
												<Stack
													direction="row"
													spacing={3}
													sx={{ overflowX: "hidden" }}
												>
													<Typography
														variant="body2"
														fontWeight={700}
													>
														Name
													</Typography>
													<Typography
														variant="body2"
														sx={{
															whiteSpace:
																"nowrap",
															overflow: "hidden",
															textOverflow:
																"ellipsis",
														}}
													>
														{getFilenameFromUrl(
															file.file
														)}
													</Typography>
												</Stack>
												<Stack
													direction="row"
													spacing={3}
													sx={{
														overflowX: "hidden",
													}}
												>
													<Typography
														variant="body2"
														sx={{
															fontWeight: 700,
														}}
													>
														Size:
													</Typography>
													<Typography variant="body2">
														{formatBytes(file.size)}
													</Typography>
												</Stack>
												<Stack
													direction="row"
													spacing={3}
													sx={{
														overflowX: "hidden",
													}}
												>
													<Typography
														variant="body2"
														sx={{
															fontWeight: 700,
														}}
													>
														Uploaded:
													</Typography>
													<Typography variant="body2">
														{fDate(file.uploaded)}
													</Typography>
												</Stack>
											</Stack>
										</Stack>
									</CardContent>
								</CardActionArea>
							</Card>
						</Grid>
				))
				: "No files"}
			<OpenFolderModal
				open={openFile}
				onClose={handleClose}
				file={file}
			/>
			<AddFileModal
				open={openAddFile}
				onClose={handleCloseAddFile}
			/>
		</Grid>
	);
};

Filepage.propTypes = {
	bannerGraph: PropTypes.object.isRequired,
	sideGraph: PropTypes.object.isRequired,
	fileType: PropTypes.string.isRequired,
	files: PropTypes.array.isRequired,
};

export default Filepage;
