import PropTypes from "prop-types";
import { useState } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
// @mui
import { Paper, Stack, Button, useTheme, Box } from "@mui/material";
// redux
import { useDispatch } from "../../../redux/store";
import {
	deleteColumn,
	updateColumn,
	addTask,
	deleteTask,
} from "../../../redux/slices/kanban";
// components
import Iconify from "../../../components/iconify";
import { useSnackbar } from "../../../components/snackbar";
//
import KanbanTaskAdd from "../kanban-task-add";
import KanbanTaskCard from "../kanban-task-card";
import KanbanColumnToolBar from "./kanban-column-toolbar";

// ----------------------------------------------------------------------

KanbanColumn.propTypes = {
	cards: PropTypes.object,
	index: PropTypes.number,
	column: PropTypes.object,
	color: PropTypes.string,
};

export default function KanbanColumn({ column, index, cards, color }) {
	const dispatch = useDispatch();

	const { enqueueSnackbar } = useSnackbar();

	const [openAddTask, setOpenAddTask] = useState(false);

	const handleToggleAddTask = () => {
		setOpenAddTask(!openAddTask);
	};

	const handleCloseAddTask = () => {
		setOpenAddTask(false);
	};

	const handleDeleteTask = (cardId) => {
		dispatch(
			deleteTask({
				cardId,
				columnId: column.id,
			})
		);
		enqueueSnackbar("Delete success!");
	};

	const handleUpdateColumn = async (newName) => {
		try {
			if (newName !== column.name) {
				dispatch(
					updateColumn(column.id, {
						...column,
						name: newName,
					})
				);
				enqueueSnackbar("Update success!");
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleDeleteColumn = async () => {
		try {
			dispatch(deleteColumn(column.id));
			enqueueSnackbar("Delete success!");
		} catch (error) {
			console.error(error);
		}
	};

	const handleAddTask = (task) => {
		handleCloseAddTask();
		dispatch(
			addTask({
				card: task,
				columnId: column.id,
			})
		);
	};

	const theme = useTheme();

	return (
		<Draggable draggableId={column.id} index={index}>
			{(provided) => (
				<Paper
					{...provided.draggableProps}
					ref={provided.innerRef}
					variant="outlined"
					sx={{
						px: 2,
						borderRadius: 1,
						borderStyle: "dashed",
						bgcolor: theme.palette.background.paper,
					}}
				>
					<Stack spacing={3} {...provided.dragHandleProps}>
						<Box sx={{
							borderBottom: 1,
							borderBottomStyle: "dashed",
							pb:2,
							borderWidth: 2,
							color: color
						}}>
							<KanbanColumnToolBar
								columnName={column.name}
								onDelete={handleDeleteColumn}
								onUpdate={handleUpdateColumn}
								color={color}
							/>
						</Box>

						<Droppable droppableId={column.id} type="task">
							{(columnProvided) => (
								<Stack
									ref={columnProvided.innerRef}
									{...columnProvided.droppableProps}
									spacing={2}
									sx={{ width: 350 }}
								>
									{column.cardIds.map((cardId, cardIndex) => (
										<KanbanTaskCard
											key={cardId}
											index={cardIndex}
											onDeleteTask={handleDeleteTask}
											card={cards[cardId]}
										/>
									))}
									{columnProvided.placeholder}
								</Stack>
							)}
						</Droppable>

						<Stack spacing={2} sx={{ pb: 3 }}>
							{openAddTask && (
								<KanbanTaskAdd
									onAddTask={handleAddTask}
									onCloseAddTask={handleCloseAddTask}
								/>
							)}

							<Button
								fullWidth
								size="large"
								color="inherit"
								startIcon={<Iconify icon="eva:plus-fill" />}
								onClick={handleToggleAddTask}
								sx={{ fontSize: 14 }}
							>
								Add Task
							</Button>
						</Stack>
					</Stack>
				</Paper>
			)}
		</Draggable>
	);
}
