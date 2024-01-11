import { Stack } from "@mui/system";
import Textfield from "../../../../components/form/textfield/textfield";
import { Upload } from "../../../../components/upload";
import PropTypes from "prop-types";

const AddServiceDetails = ({ thumbnail, handleThumbnailChange, setFieldValue }) => {
	return (
		<Stack direction="column" spacing={3}>
			<Upload
				name="thumbnail"
				file={thumbnail}
				onDrop={(acceptedFiles) =>
					handleThumbnailChange(acceptedFiles, setFieldValue)
				}
			/>
			<Textfield name="name" label="Service Name" />
			<Textfield
				name="introDescription"
				label="Intro Description"
				multiline
				rows={4}
			/>
		</Stack>
	);
};

AddServiceDetails.propTypes = {
	thumbnail: PropTypes.object,
	handleThumbnailChange: PropTypes.func.isRequired,
	setFieldValue: PropTypes.func.isRequired,
};

export default AddServiceDetails;
