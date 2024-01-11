import { useState } from "react";
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
import { deleteReservation } from "../../../../redux/slices/reservations";

const DeleteReservation = () => {
	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("info");
	const [inputTitle, setInputTitle] = useState("");

	const { reservation } = useSelector((state) => state.reservations);
	const {
		me: { _id: userID },
	} = useSelector((state) => state.user);

	const { _id } = reservation;
	const token = localStorage.getItem("token");

	const theme = useTheme();
	const dispatch = useDispatch();

	const handleInputChange = (event) => {
		setInputTitle(event.target.value);
	};

	const handleDelete = async () => {
		try {
			const response = await dispatch(
				deleteReservation(userID, token, reservation._id)
			);

			//extract success message
			const { success, message } = response;

			// Set the alert message from the response and determine severity
			setAlertMessage(message);
			setAlertSeverity(success ? "success" : "error");

			//close the modal
			if (success) {
				setTimeout(() => {
					window.location.reload();
				}, 2000);
			}
		} catch (error) {
			setAlertMessage(error.error || "An error occurred.");
			setAlertSeverity("error");
		}
	};

	const isTitleMatch = inputTitle === _id;

	return (
		<Stack direction="column" spacing={3}>
			{alertMessage && (
				<Alert severity={alertSeverity}>{alertMessage}</Alert>
			)}
			<Typography variant="subtitle1" color="primary">
				Please type the id of this reservation to confirm deletion.
				<br />
				<span style={{ color: theme.palette.text.primary }}>
					{_id}
				</span>
			</Typography>
			<TextField
				fullWidth
				variant="outlined"
				placeholder="Type reservation _id here"
				value={inputTitle}
				onChange={handleInputChange}
				size="small"
			/>
			<Button
				variant="contained"
				color="error"
				endIcon={<Iconify icon="mdi:delete" />}
				onClick={handleDelete}
				disabled={!isTitleMatch}
			>
				Delete this Announcement
			</Button>
		</Stack>
	);
};

export default DeleteReservation;
