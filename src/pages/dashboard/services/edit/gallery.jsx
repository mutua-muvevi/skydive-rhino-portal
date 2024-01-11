import PropTypes from "prop-types";
import { Upload } from "../../../../components/upload";
import { useState } from "react";

const AddServiceGallery = ({values, setFieldValue, handleDropMultiFile}) => {
	const [files, setFiles] = useState(values.gallery);

	const handleRemoveFile = (inputFile) => {
		const filesFiltered = values.gallery.filter(
			(fileFiltered) => fileFiltered !== inputFile
		);
		setFiles(filesFiltered);
	};

	const handleRemoveAllFiles = () => {
		setFiles([]);
	};
	return (
		<div>
			<Upload
				name="gallery"
				files={files}
				onDrop={(acceptedFiles) =>
					handleDropMultiFile(acceptedFiles, setFieldValue)
				}
				multiple
				onRemove={handleRemoveFile}
				onRemoveAll={handleRemoveAllFiles}
			/>
		</div>
	);
};

AddServiceGallery.propTypes = {
	values: PropTypes.object.isRequired,
	setFieldValue: PropTypes.func.isRequired,
	handleDropMultiFile: PropTypes.func.isRequired,
};

export default AddServiceGallery;
