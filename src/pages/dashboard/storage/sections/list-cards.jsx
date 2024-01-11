import React, { useState } from "react";
import {
	Button,
	Card,
	CardActionArea,
	CardContent,
	Grid,
	Stack,
	Typography,
	useTheme,
} from "@mui/material";
import { useSelector } from "../../../../redux/store";
import { sentenceCase } from "change-case";
import { StyledFolder } from "./styles";
import Iconify from "../../../../components/iconify";
import { getFilenameFromUrl } from "../../../../utils/get-filename";
import { fDate } from "../../../../utils/format-time";
import { formatBytes } from "../../../../utils/format-bytes";
import OpenFolderModal from "../../../../modules/storage/modal";
import AddFileModal from "../../../../modules/storage/add-file-modal";

const StorageOverviewListCard = () => {
	const [expandedSections, setExpandedSections] = useState({});
	const [openFile, setOpenFile] = useState(false);
	const [file, setFile] = useState({});
	const [uploadFile, setUploadFile] = useState(false);

	const {
		me: { storage },
	} = useSelector((state) => state.user);

	// Function to toggle the expanded state of a section
	const toggleExpandSection = (folderName) => {
		setExpandedSections((prevState) => ({
			...prevState,
			[folderName]: !prevState[folderName],
		}));
	};

	//Open file handler
	const openFileHandler = (selectedFile) => {
		setOpenFile(true);
		setFile(selectedFile);
	};

	//close modal
	const handleClose = () => {
		setOpenFile(false);
	};

	//upload file handler
	const uploadFileHandler = () => {
		setUploadFile(true)
	};

	const theme = useTheme();

	const themeColors = [
		theme.palette.success.main,
		theme.palette.primary.main,
		theme.palette.secondary.main,
		theme.palette.warning.main,
		theme.palette.error.main,
		theme.palette.chart.green[1],
	];

	return (
		<div>
			{Object.entries(storage).map(
				([folderName, folderDetails], index) => {
					const iconColor = themeColors[index % themeColors.length];

					return (
						<StyledFolder spacing={3} key={folderName}>
							<Stack
								direction="row"
								justifyContent="space-between"
							>
								<Typography variant="h5" color={iconColor}>{`${
									folderName ? sentenceCase(folderName) : null
								}`}</Typography>
								<Button
									variant="outlined"
									endIcon={
										<Iconify icon="ep:upload-filled" />
									}
									onClick={uploadFileHandler}
								>
									<Typography variant="subtitle2">
										Add File
									</Typography>
								</Button>
							</Stack>

							<Stack spacing={3}>
								<div>
									<Grid container spacing={3}>
										{folderDetails.files
											.slice(
												0,
												expandedSections[folderName]
													? folderDetails.files.length
													: 4
											)
											.map((file, index) => (
												<React.Fragment key={index}>
													<Grid
														item
														xs={12}
														md={6}
														lg={4}
														xl={3}
													>
														<Card>
															<CardActionArea
																onClick={() =>
																	openFileHandler(
																		file
																	)
																}
															>
																<CardContent>
																	<Stack
																		direction="row"
																		spacing={
																			1.5
																		}
																		alignItems="flex-start"
																	>
																		<Iconify
																			icon={
																				folderName ===
																				"documents"
																					? "mdi-file-document-outline"
																					: folderName ===
																						"images"
																					? "mdi-file-image-outline"
																					: folderName ===
																						"videos"
																					? "mdi-file-video-outline"
																					: folderName ===
																						"code"
																					? "mdi-file-code-outline"
																					: folderName ===
																						"design"
																					? "mdi-file-document-edit-outline"
																					: folderName ===
																						"presentations"
																					? "mdi-file-powerpoint-outline"
																					: folderName ===
																						"spreadsheet"
																					? "mdi-file-excel-outline"
																					: folderName ===
																						"website"
																					? "mdi-file-web-outline"
																					: "mdi-file-outline"
																			}
																			width={
																				50
																			}
																			height={
																				80
																			}
																			sx={{
																				color: iconColor,
																			}}
																		/>
																		<Stack direction="column">
																			<Stack
																				direction="row"
																				spacing={
																					3
																				}
																				sx={{
																					overflowX:
																						"hidden",
																				}}
																			>
																				<Typography
																					variant="body2"
																					sx={{
																						fontWeight: 700,
																					}}
																				>
																					Name:
																				</Typography>
																				<Typography
																					variant="body2"
																					sx={{
																						whiteSpace:
																							"nowrap",
																						overflow:
																							"hidden",
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
																				spacing={
																					3
																				}
																				sx={{
																					overflowX:
																						"hidden",
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
																					{formatBytes(
																						file.size
																					)}
																				</Typography>
																			</Stack>
																			<Stack
																				direction="row"
																				spacing={
																					3
																				}
																				sx={{
																					overflowX:
																						"hidden",
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
																					{fDate(
																						file.uploaded
																					)}
																				</Typography>
																			</Stack>
																		</Stack>
																	</Stack>
																</CardContent>
															</CardActionArea>
														</Card>
													</Grid>
												</React.Fragment>
											))}
									</Grid>
								</div>
							</Stack>

							<Stack
								direction="row"
								justifyContent="space-between"
							>
								<Typography
									variant="subtitle1"
									color="text.primary"
								>
									<strong>Total Size:</strong>{" "}
									<span style={{ color: iconColor }}>
										<strong>
											{formatBytes(folderDetails.size)}
										</strong>
									</span>
								</Typography>

								<Button
									endIcon={
										<Iconify
											icon={
												expandedSections[folderName]
													? "ic:outline-expand-less"
													: "ic:outline-expand-more"
											}
										/>
									}
									onClick={() =>
										toggleExpandSection(folderName)
									}
								>
									<Typography
										variant="subtitle2"
										color="text.primary"
									>
										{expandedSections[folderName]
											? "Collapse"
											: "View All"}
									</Typography>
								</Button>
							</Stack>
						</StyledFolder>
					);
				}
			)}
			<OpenFolderModal
				open={openFile}
				onClose={handleClose}
				file={file}
			/>
			<AddFileModal
				open={uploadFile}
				onClose={() => setUploadFile(false)}
			/>
		</div>
	);
};

export default StorageOverviewListCard;