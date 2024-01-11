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
import { convertLeadToClient } from "../../../../redux/slices/leads";

const ConvertLead = ({ onClose }) => {
	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("info");
	const [inputFullname, setInputFullname] = useState("");

	const {
		me: { _id: userID },
	} = useSelector((state) => state.user);

	const { setLead: lead } = useSelector((state) => state.leads);

	const token = localStorage.getItem("token");

	const { fullname, _id } = lead

	const theme = useTheme();
	const dispatch = useDispatch();

	const handleInputChange = (event) => {
		setInputFullname(event.target.value);
	};

	
	const handleDelete = async () => {
		try {
			const response = await dispatch(
				convertLeadToClient(userID, token, _id)
			);

			//extract success message
			const { success, message } = response;

			// Set the alert message from the response and determine severity
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
			setAlertMessage(error.response.message || "An error occurred.");
			setAlertSeverity("error");
		}
	};

	const isFullnameMatch = inputFullname === fullname;


	return (
		<Stack direction="column" spacing={3}>
			{alertMessage && (
				<Alert>
					{alertMessage}
				</Alert>
			)}
			<Typography variant="subtitle1" color="primary">
				Please type the title of the blog to confirm deletion:
				<br />
				<span style={{ color: theme.palette.text.primary }}>
					{lead.fullname}
				</span>
			</Typography>
			<TextField
				fullWidth
				variant="outlined"
				placeholder="Type blog title here"
				value={inputFullname}
				onChange={handleInputChange}
				size="small"
			/>
			<Button
				variant="contained"
				color="error"
				endIcon={<Iconify icon="mdi:delete" />}
				onClick={handleDelete}
				disabled={!isFullnameMatch}
				type="submit"
			>
				Delete this blog
			</Button>
		</Stack>
	);
}

ConvertLead.propTypes = {
	onClose: PropTypes.func.isRequired,
};

export default ConvertLead