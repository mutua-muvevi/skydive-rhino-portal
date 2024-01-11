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
import { deleteManual } from "../../../../redux/slices/manuals";

//------------------------ || DELETE MANUAL || -------------------------//

const DeleteManual = ({ onClose }) => {
	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("info");
	const [inputManualName, setInputFullname] = useState("");

	const {
		me: { _id: userID },
	} = useSelector((state) => state.user);

	const { setManual: manual } = useSelector((state) => state.manuals);

	const token = localStorage.getItem("token");

	const { name } = manual;

	const theme = useTheme();
	const dispatch = useDispatch();

	const handleInputChange = (event) => {
		setInputFullname(event.target.value);
	};

	const handleDelete = async () => {
		try {
			const response = await dispatch(
				deleteManual(userID, token, manual._id)
			);

			//extract success message
			const { success, message } = response;

			// Set the alert message from the response and demanualine severity
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

	const isInputManualName = inputManualName === name;

	return (
		<Stack direction="column" spacing={3}>
			{alertMessage && <Alert severity={alertSeverity} >{alertMessage}</Alert>}
			<Typography variant="subtitle1" color="primary">
				Please type the title of the manual to confirm deletion:
				<br />
				<span style={{ color: theme.palette.text.primary }}>
					{manual.name}
				</span>
			</Typography>
			<TextField
				fullWidth
				variant="outlined"
				placeholder="Type manual title here"
				value={inputManualName}
				onChange={handleInputChange}
				size="small"
			/>
			<Button
				variant="contained"
				color="error"
				endIcon={<Iconify icon="mdi:delete" />}
				onClick={handleDelete}
				disabled={!isInputManualName}
				type="submit"
			>
				Delete this manual
			</Button>
		</Stack>
	);
};

DeleteManual.propTypes = {
	onClose: PropTypes.func,
};

export default DeleteManual;
