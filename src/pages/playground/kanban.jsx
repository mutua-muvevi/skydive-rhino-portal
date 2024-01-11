import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
// @mui
import { Container, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
//drag and drop
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
// redux
import { useDispatch, useSelector } from "../../redux/store";
import {
	getBoard,
	persistColumn,
	persistCard,
} from "../../redux/slices/kanban";
// routes
import { PATH_DASHBOARD } from "../../routes/path";
// utils
import { hideScrollbarX } from "../../utils/css-styles";
// components
import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
import { SkeletonKanbanColumn } from "../../components/skeleton";
// sections
import { KanbanColumn, KanbanColumnAdd } from "../../modules/kanban";

// ----------------------------------------------------------------------

export default function KanbanPage() {
	const dispatch = useDispatch();

	const { board } = useSelector((state) => state.kanban);

	useEffect(() => {
		dispatch(getBoard());
	}, [dispatch]);

	const onDragEnd = (result) => {
		const { destination, source, draggableId, type } = result;

		if (!destination) return;

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		)
			return;

		if (type === "column") {
			const newColumnOrder = Array.from(board.columnOrder);

			newColumnOrder.splice(source.index, 1);

			newColumnOrder.splice(destination.index, 0, draggableId);

			dispatch(persistColumn(newColumnOrder));
			return;
		}

		const start = board.columns[source.droppableId];
		const finish = board.columns[destination.droppableId];

		if (start.id === finish.id) {
			const updatedCardIds = [...start.cardIds];

			updatedCardIds.splice(source.index, 1);

			updatedCardIds.splice(destination.index, 0, draggableId);

			const updatedColumn = {
				...start,
				cardIds: updatedCardIds,
			};

			dispatch(
				persistCard({
					...board.columns,
					[updatedColumn.id]: updatedColumn,
				})
			);
			return;
		}

		const startCardIds = [...start.cardIds];

		startCardIds.splice(source.index, 1);

		const updatedStart = {
			...start,
			cardIds: startCardIds,
		};

		const finishCardIds = [...finish.cardIds];

		finishCardIds.splice(destination.index, 0, draggableId);

		const updatedFinish = {
			...finish,
			cardIds: finishCardIds,
		};

		dispatch(
			persistCard({
				...board.columns,
				[updatedStart.id]: updatedStart,
				[updatedFinish.id]: updatedFinish,
			})
		);
	};

	const theme = useTheme();

	const colors = [
		theme.palette.secondary.main,
		theme.palette.primary.main,
		theme.palette.success.main,
		theme.palette.info.main,
		theme.palette.error.main,
	];

	return (
		<>
			<Helmet>
				<title> Kanban | Skydive Rhino Kenya</title>
			</Helmet>

			<Container maxWidth="xl" sx={{ height: 1, my: 10 }}>
				<CustomBreadcrumbs
					heading="Kanban"
					links={[
						{
							name: "Dashboard",
							href: PATH_DASHBOARD.root,
						},
						{ name: "Kanban" },
					]}
				/>

				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable
						droppableId="all-columns"
						direction="horizontal"
						type="column"
					>
						{(provided) => (
							<Stack
								{...provided.droppableProps}
								ref={provided.innerRef}
								spacing={3}
								direction="row"
								alignItems="flex-start"
								sx={{
									height: 1,
									overflowY: "hidden",
									...hideScrollbarX,
								}}
							>
								{!board.columnOrder.length ? (
									<SkeletonKanbanColumn />
								) : (
									board.columnOrder.map((columnId, index) => {
										const color = colors[index % colors.length];
										return (
											<KanbanColumn
												index={index}
												key={columnId}
												column={board.columns[columnId]}
												cards={board.cards}
												color={color}
											/>
										);
									})
								)}

								{provided.placeholder}
								<KanbanColumnAdd />
							</Stack>
						)}
					</Droppable>
				</DragDropContext>
			</Container>
		</>
	);
}
