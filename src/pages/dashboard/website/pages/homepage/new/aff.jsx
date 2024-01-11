import { Stack, Typography } from "@mui/material";
import Textfield from "../../../../../../components/form/textfield/textfield";
import { Upload } from "../../../../../../components/upload";
import PropTypes from "prop-types";

import { useState } from "react";

const CreateAff = ({
	values,
	setFieldValue,
	handleAffGalleryChange,
	handleAffImageChange,
	affImage,
}) => {
	const [files, setFiles] = useState(values.affGallery);

	const handleRemoveFile = (inputFile) => {
		const filesFiltered = values.affGallery.filter(
			(fileFiltered) => fileFiltered !== inputFile
		);
		setFiles(filesFiltered);

		// Update the form field value as well
		setFieldValue("affGallery", filesFiltered);
	};

	const handleRemoveAllFiles = () => {
		setFiles([]);
	};

	return (
		<Stack direction="column" spacing={3}>
			<Textfield name="affTitle" label="Aff Title" />
			<Textfield
				name="affSubtitle"
				label="Aff Subtitle"
				multiline
				rows={5}
			/>

			<Stack direction="column" spacing={1}>
				<Typography variant="body1">Aff Image</Typography>
				<Upload
					name="affImage"
					file={affImage}
					onDrop={(acceptedFiles) =>
						handleAffImageChange(acceptedFiles, setFieldValue)
					}
				/>
			</Stack>
			<Stack direction="column" spacing={1}>
				<Typography variant="body1">Aff Gallery</Typography>
				<Upload
					name="affGallery"
					files={files}
					onDrop={(acceptedFiles) =>
						handleAffGalleryChange(acceptedFiles, setFieldValue)
					}
					multiple
					onRemove={handleRemoveFile}
					onRemoveAll={handleRemoveAllFiles}
				/>
			</Stack>
		</Stack>
	);
};

CreateAff.propTypes = {
	values: PropTypes.object.isRequired,
	setFieldValue: PropTypes.func.isRequired,
	handleAffGalleryChange: PropTypes.func.isRequired,
	handleAffImageChange: PropTypes.func.isRequired,
	affImage: PropTypes.object,
};

export default CreateAff;
