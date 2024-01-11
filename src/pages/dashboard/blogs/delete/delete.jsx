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
import { deleteBlog } from "../../../../redux/slices/blogs";

const DeleteBlog = ({ blog }) => {
	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("info");
	const [inputTitle, setInputTitle] = useState("");

	const {
		me: { _id: userID },
	} = useSelector((state) => state.user);
	const token = localStorage.getItem("token");

	const { title } = blog;

	const theme = useTheme();
	const dispatch = useDispatch();

	const handleInputChange = (event) => {
		setInputTitle(event.target.value);
	};

	const handleDelete = async () => {
		try {
			const response = await dispatch(
				deleteBlog(userID, token, blog._id)
			);

			//extract success message
			const { success, message } = response.data;

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

	const isTitleMatch = inputTitle === title;

	return (
		<Stack direction="column" spacing={3}>
			{alertMessage && (
				<Alert
					severity={alertSeverity}
					sx={{
						mb: 2,
						position: "absolute",
						left: "50%",
						top: "50%",
					}}
				>
					{alertMessage}
				</Alert>
			)}
			<Typography variant="subtitle1" color="primary">
				Please type the title of the blog to confirm deletion:
				<br />
				<span style={{ color: theme.palette.text.primary }}>
					{title}
				</span>
			</Typography>
			<TextField
				fullWidth
				variant="outlined"
				placeholder="Type blog title here"
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
				Delete this blog
			</Button>
		</Stack>
	);
};

DeleteBlog.propTypes = {
	blog: PropTypes.object.isRequired,
};

export default DeleteBlog;
