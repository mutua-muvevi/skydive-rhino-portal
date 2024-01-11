import { useState } from "react";
import {
	Typography,
	Stack,
	Button,
	TextField,
	useTheme,
	Alert,
} from "@mui/material";
import PropTypes from "prop-types";
import Iconify from "../../../../components/iconify";
import { useDispatch, useSelector } from "../../../../redux/store";
import { deleteService } from "../../../../redux/slices/services";

const DeleteService = ({ service, onClose }) => {
	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("info");
	const [inputTitle, setInputTitle] = useState("");

	const {
		me: { _id: userID },
	} = useSelector((state) => state.user);
	const token = localStorage.getItem("token");

	const { name } = service;

	const theme = useTheme();
	const dispatch = useDispatch();

	const handleInputChange = (event) => {
		setInputTitle(event.target.value);
	};

	const handleDelete = async () => {
		try {
			const response = await dispatch(
				deleteService(userID, token, service._id)
			);

			//extract success message
			const { success, message } = response;

			// Set the alert message from the response and determine severity
			setAlertMessage(message);
			setAlertSeverity(success ? "success" : "error");

			onClose();

			//close the modal
			if (success) {
				setTimeout(() => {
					window.location.reload();
				}, 1000);
			}
		} catch (error) {
			console.log("Error is", error)
			setAlertMessage(error.error || "An error occurred.");
			setAlertSeverity("error");
		}
	};

	const isTitleMatch = inputTitle === name;

	return (
		<Stack direction="column" spacing={3} sx={{mb:3, pr:1}}>
			{alertMessage && (
				<Alert
					severity={alertSeverity}
				>
					{alertMessage}
				</Alert>
			)}
			<Typography variant="subtitle1" color="primary">
				Please type the name of the service to confirm deletion:
				<br />
				<span style={{ color: theme.palette.text.primary }}>
					{name}
				</span>
			</Typography>
			<TextField
				fullWidth
				variant="outlined"
				placeholder="Type service name here"
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
				Delete this service
			</Button>
		</Stack>
	);
};

DeleteService.propTypes = {
	service: PropTypes.object.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default DeleteService;
