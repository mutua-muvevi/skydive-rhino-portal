import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Grid,
	Stack,
	Typography,
} from "@mui/material";
import { sentenceCase } from "change-case";
import PropTypes from "prop-types";
import Iconify from "../../../../components/iconify";
import { truncateStr } from "../../../../utils/format-string";
import Scrollbar from "../../../../components/scrollbar";
import { useMediaQuery } from "@mui/material";
import { useDispatch } from "../../../../redux/store";
import { setService } from "../../../../redux/slices/services";
import { useState } from "react";
import ModalComponent from "../../../../components/modal/modal";
import Service from "../service/service";
import EditService from "../edit/edit";
import DeleteService from "../delete/delete";

const ServiceCards = ({ service }) => {
	const [openService, setOpenService] = useState(false);
	const [openEditService, setOpenEditService] = useState(false);
	const [openDeleteService, setOpenDeleteService] = useState(false);
	const dispatch = useDispatch();

	const isLargeScreen = useMediaQuery("(min-width: 1280px)");
	const isMediumScreen = useMediaQuery("(min-width: 960px)");

	const handleSetService = () => {
		dispatch(setService(service));

		setOpenService(true);
	};

	const handleEditService = () => {
		dispatch(setService(service));

		setOpenEditService(true);
	};

	const handleDeleteService = () => {
		dispatch(setService(service));

		setOpenDeleteService(true);
	};

	const modalActions = [
		{
			label: "Edit",
			icon: "uiw:edit",
			onClick: handleEditService,
		},
		{
			label: "Delete",
			icon: "ic:baseline-delete",
			onClick: handleDeleteService,
			color: "error",
		},
	];

	return (
		<>
			<Card>
				<CardActionArea onClick={handleSetService}>
					<Stack
						direction={{ xs: "column", md: "row" }}
						spacing={1}
						sx={{ height: 450 }}
					>
						{service.thumbnail ? (
							<CardMedia
								component="img"
								src={service.thumbnail}
								alt={service.name}
								sx={{
									width: {
										md: "30%",
										lg: "35%",
										xl: "30%",
									},
									height: "100%",
								}}
							/>
						) : (
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									width: {
										md: "30%",
										lg: "35%",
										xl: "30%",
									},
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

						<Stack
							direction="column"
							spacing={3}
							sx={{
								width: {
									md: "70%",
									lg: "65%",
									xl: "70%",
								},
							}}
						>
							<CardContent sx={{ height: 400 }}>
								<Scrollbar>
									<Stack direction="column" spacing={2}>
										{/* Name */}
										<Typography
											variant="subtitle1"
											color="primary"
										>
											{service.name}
										</Typography>
										<Typography
											variant="body2"
											textAlign="justify"
										>
											{truncateStr(
												sentenceCase(
													service.introDescription
												),
												isLargeScreen
													? 500
													: isMediumScreen
													? 350
													: 250
											)}
										</Typography>

										{/* Prices */}
										<Stack direction="column" spacing={1.5}>
											<Typography
												variant="subtitle1"
												color="primary"
											>
												Prices
											</Typography>
											<div>
												<Grid container spacing={3}>
													{service.prices.map(
														(price) => (
															<Grid
																item
																xs={12}
																md={6}
																lg={4}
																key={price._id}
															>
																<Stack
																	direction="column"
																	spacing={
																		1.5
																	}
																>
																	<Typography
																		variant="subtitle2"
																		color="primary"
																	>
																		{
																			price.title
																		}
																	</Typography>
																	<Stack
																		direction="row"
																		spacing={
																			3
																		}
																	>
																		<Iconify icon="icomoon-free:price-tags" />
																		<Typography variant="body2">
																			{
																				price
																					.price
																					.amount
																			}{" "}
																			{
																				price
																					.price
																					.currency
																			}
																		</Typography>
																	</Stack>
																</Stack>
															</Grid>
														)
													)}
												</Grid>
											</div>
											<Stack
												direction="row"
												spacing={3}
											></Stack>
										</Stack>

										{/* Leads */}
										<Stack direction="column" spacing={1.5}>
											<Typography
												variant="subtitle1"
												color="primary"
											>
												Leads
											</Typography>
											<Stack direction="row" spacing={3}>
												<Iconify icon="fluent:people-community-20-filled" />
												{service.leads.length < 1 ? (
													<Typography variant="body2">
														We currently have no
														leads for this service
													</Typography>
												) : (
													<Typography variant="body2">
														{service.leads.length}{" "}
														Lead(s)
													</Typography>
												)}
											</Stack>
										</Stack>

										{/* Clients */}
										<Stack direction="column" spacing={1.5}>
											<Typography
												variant="subtitle1"
												color="primary"
											>
												Clients
											</Typography>
											<Stack direction="row" spacing={3}>
												<Iconify icon="fluent:people-community-20-filled" />

												{service.clients &&
												service.clients.length < 1 ? (
													<Typography variant="body2">
														We currently have no
														clients for this service
													</Typography>
												) : (
													<Typography variant="body2">
														{service.clients.length}{" "}
														Client(s)
													</Typography>
												)}
											</Stack>
										</Stack>
									</Stack>
								</Scrollbar>
							</CardContent>
						</Stack>
					</Stack>
				</CardActionArea>
			</Card>

			{/* Service modal  */}
			<ModalComponent
				open={openService}
				onClose={() => setOpenService(false)}
				title={service.name}
				height={750}
				maxWidth="xl"
				actions={modalActions}
			>
				<Service service={service} />
			</ModalComponent>

			{/* Edit service modal */}
			<ModalComponent
				open={openEditService}
				onClose={() => setOpenEditService(false)}
				title={`Edit Service: ${service.name}`}
				height={700}
				maxWidth="xl"
			>
				<EditService
					service={service}
					onClose={() => setOpenEditService(false)}
				/>
			</ModalComponent>

			{/* Delete service modal */}
			<ModalComponent
				open={openDeleteService}
				onClose={() => setOpenDeleteService(false)}
				title={`Delete Service: ${service.name}`}
				height={250}
				maxWidth="sm"
			>
				<DeleteService
					service={service}
					onClose={() => setOpenDeleteService(false)}
				/>
			</ModalComponent>
		</>
	);
};

ServiceCards.propTypes = {
	service: PropTypes.object.isRequired,
};

export default ServiceCards;
