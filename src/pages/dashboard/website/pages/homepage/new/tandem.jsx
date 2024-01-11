import { Stack, Typography } from "@mui/material";
import Textfield from "../../../../../../components/form/textfield/textfield";
import { Upload } from "../../../../../../components/upload";
import PropTypes from "prop-types";

import { useState } from "react";

const CreateTandem = ({
	values,
	setFieldValue,
	handleDropMultiFile,
	handleTandemImageChange,
	tandemImage,
}) => {
	const [files, setFiles] = useState(values.tandemGallery);

	const handleRemoveFile = (inputFile) => {
		const filesFiltered = values.tandemGallery.filter(
			(fileFiltered) => fileFiltered !== inputFile
		);
		setFiles(filesFiltered);

		// Update the form field value as well
		setFieldValue('tandemGallery', filesFiltered);
	};

	const handleRemoveAllFiles = () => {
		setFiles([]);
	};

	return (
		<Stack direction="column" spacing={3}>
			<Textfield name="tandemTitle" label="Tandem Title" />
			<Textfield
				name="tandemSubtitle"
				label="Tandem Subtitle"
				multiline
				rows={5}
			/>

			<Stack direction="column" spacing={1}>
				<Typography variant="body1">Tandem Image</Typography>
				<Upload
					name={`tandemImage`}
					file={tandemImage}
					onDrop={(acceptedFiles) =>
						handleTandemImageChange(acceptedFiles, setFieldValue)
					}
				/>
			</Stack>
			<Stack direction="column" spacing={1}>
				<Typography variant="body1">Tandem Gallery</Typography>
				<Upload
					name={`tandemGallery`}
					files={files}
					onDrop={(acceptedFiles) =>
						handleDropMultiFile(acceptedFiles, setFieldValue)
					}
					multiple
					onRemove={handleRemoveFile}
					onRemoveAll={handleRemoveAllFiles}
				/>
			</Stack>
		</Stack>
	);
};

CreateTandem.propTypes = {
	values: PropTypes.object.isRequired,
	setFieldValue: PropTypes.func.isRequired,
	handleDropMultiFile: PropTypes.func.isRequired,
	tandemGallery: PropTypes.array.isRequired,
	handleTandemImageChange: PropTypes.func.isRequired,
	tandemImage: PropTypes.object,
};

export default CreateTandem;
