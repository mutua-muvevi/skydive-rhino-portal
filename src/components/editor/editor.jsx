import PropTypes from "prop-types";
import "../../utils/highlight";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
//
import { StyledEditor } from "./styles";
import EditorToolbar from "./editor-toolbar";
import { formats } from "./constants";
import { useField } from "formik";
import { Typography } from "@mui/material";

// ----------------------------------------------------------------------

Editor.propTypes = {
	id: PropTypes.string,
	sx: PropTypes.object,
	error: PropTypes.bool,
	simple: PropTypes.bool,
	name: PropTypes.string,
};

export default function Editor({
	id = "minimal-quill",
	error,
	simple = false,
	sx,
	name,
	...props
}) {
	const [field, meta, helpers] = useField(name);

	const handleChange = (content, delta, source, editor) => {
		helpers.setValue(editor.getHTML()); // Or `content` depending on what you want to store
		helpers.setTouched(true);
		console.log("The content is", content);
	};

	const modules = {
		toolbar: {
			container: `#${id}`,
		},
		history: {
			delay: 500,
			maxStack: 100,
			userOnly: true,
		},
		syntax: true,
		clipboard: {
			matchVisual: false,
		},
	};

	return (
		<>
			<StyledEditor
				sx={{
					...(error && {
						border: (theme) =>
							`solid 1px ${theme.palette.error.main}`,
					}),
					...sx,
				}}
			>
				<EditorToolbar id={id} isSimple={simple} />

				<ReactQuill
					value={field.value || ""}
					onChange={handleChange}
					modules={modules}
					formats={formats}
					placeholder="Write something awesome..."
					{...props}
				/>
			</StyledEditor>

			{meta.error && meta.touched ? (
				<Typography variant="caption" color="error">
					{meta.error}
				</Typography>
			) : null}
		</>
	);
}
