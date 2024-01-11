import { useState } from "react";
import PropTypes from "prop-types";
import {
	Typography,
	Stack,
	Button,
	TextField,
	useTheme,
	Alert,
} from "@mui/material";
import Iconify from "../../../../components/iconify";
import { useDispatch, useSelector } from "../../../../redux/store";
import { deleteEvent } from "../../../../redux/slices/events";

//------------------------ || DELETE MANUAL || -------------------------//

const DeleteEvent = ({ onClose }) => {
	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("info");
	const [inputEventName, setInputFullname] = useState("");

	const {
		me: { _id: userID },
	} = useSelector((state) => state.user);

	const { setEvent: event } = useSelector((state) => state.events);

	const token = localStorage.getItem("token");

	const { name } = event;

	const theme = useTheme();
	const dispatch = useDispatch();

	const handleInputChange = (event) => {
		setInputFullname(event.target.value);
	};

	const handleDelete = async () => {
		try {
			const response = await dispatch(
				deleteEvent(userID, token, event._id)
			);

			//extract success message
			const { success, message } = response;

			// Set the alert message from the response and event severity
			setAlertMessage(message);
			setAlertSeverity(success ? "success" : "error");

			//close the modal
			if (success) {
				setTimeout(() => {
					onClose();
					window.location.reload();
				}, 2000);
			}
		} catch (error) {
			setAlertMessage(error.error || "An error occurred.");
			setAlertSeverity("error");
		}
	};

	const isInputEventName = inputEventName === name;

	return (
		<Stack direction="column" spacing={3}>
			{alertMessage && <Alert severity={alertSeverity} >{alertMessage}</Alert>}
			<Typography variant="subtitle1" color="primary">
				Please type the name of the event to confirm deletion:
				<br />
				<span style={{ color: theme.palette.text.primary }}>
					{event.name}
				</span>
			</Typography>
			<TextField
				fullWidth
				variant="outlined"
				placeholder="Type event name here"
				value={inputEventName}
				onChange={handleInputChange}
				size="small"
			/>
			<Button
				variant="contained"
				color="error"
				endIcon={<Iconify icon="mdi:delete" />}
				onClick={handleDelete}
				disabled={!isInputEventName}
				type="submit"
			>
				Delete this event
			</Button>
		</Stack>
	);
};

DeleteEvent.propTypes = {
	onClose: PropTypes.func,
};

export default DeleteEvent;
