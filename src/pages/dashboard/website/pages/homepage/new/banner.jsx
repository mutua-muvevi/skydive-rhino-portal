import { Stack } from "@mui/system";
import Textfield from "../../../../../../components/form/textfield/textfield";
import { Upload } from "../../../../../../components/upload";
import PropTypes from "prop-types";

const CreateBanner = ({ video, handleVideoChange, setFieldValue }) => {
	return (
		<Stack direction="column" spacing={3}>
			<Upload
				name="bannerVideo"
				file={video}
				onDrop={(acceptedFiles) =>
					handleVideoChange(acceptedFiles, setFieldValue)
				}
			/>
			<Textfield name="bannerTitle" label="Main title of the banner" />
			<Textfield
				name="bannerSubtitle"
				label="Subtitle of the banner"
				multiline
				rows={4}
			/>
		</Stack>
	);
};

CreateBanner.propTypes = {
	video: PropTypes.object,
	handleVideoChange: PropTypes.func.isRequired,
	setFieldValue: PropTypes.func.isRequired,
};

export default CreateBanner;
