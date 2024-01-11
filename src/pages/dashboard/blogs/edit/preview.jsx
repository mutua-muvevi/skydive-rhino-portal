import { Box, Typography, Stack, CardMedia, Paper } from "@mui/material";

import PropTypes from "prop-types";
import { isFile } from "../../../../utils/is-file";

const BlogPreview = ({ formData }) => {
	return (
		<Stack direction="column" spacing={3}>
			<Stack direction="column" spacing={1}>
				<Typography variant="h6" color="primary">
					Title
				</Typography>
				<Typography variant="body1" textAlign="justify">
					{formData.title}
				</Typography>
			</Stack>

			<Stack direction="column" spacing={1}>
				<Typography variant="h6" color="primary">
					Intro Description
				</Typography>
				<Typography variant="body1" textAlign="justify">
					{formData.introDescription}
				</Typography>
			</Stack>

			<Stack direction="column" spacing={1}>
				{formData.thumbnail && (
					<Box>
						<Typography variant="h6" color="primary">
							Thumbnail Preview
						</Typography>
						<CardMedia
							component="img"
							image={
								isFile(formData.thumbnail)
									? URL.createObjectURL(formData.thumbnail)
									: formData.thumbnail
							}
							alt="Thumbnail"
						/>
					</Box>
				)}
			</Stack>

			<Typography variant="h5" color="primary">
				Content Blocks
			</Typography>
			{formData.contentBlocks.map((block, index) => (
				<Paper
					key={index}
					sx={{ backgroundColor: "rgba(0,0,0,0.1)", p: 3 }}
				>
					<Stack spacing={3}>
						<Typography
							variant="subtitle1"
							color="primary"
						>{`Block ${index + 1} Title`}</Typography>
						<Typography variant="body1" textAlign="justify">
							{block.title}
						</Typography>

						<Typography
							variant="subtitle1"
							color="primary"
						>{`Block ${index + 1} Details`}</Typography>
						<Typography variant="body1" textAlign="justify">
							{block.details}
						</Typography>

						{block.image && (
							<CardMedia
								component="img"
								image={
									isFile(block.image)
										? URL.createObjectURL(block.image)
										: block.image
								}
								alt={`Content Block ${index + 1}`}
							/>
						)}
					</Stack>
				</Paper>
			))}

			<Stack direction="column">
				<Typography variant="h5" color="primary">
					Tags
				</Typography>
				<Typography variant="body1" textAlign="justify">
					{formData.tags.join(", ")}
				</Typography>
			</Stack>
		</Stack>
	);
};

BlogPreview.propTypes = {
	formData: PropTypes.object,
};

export default BlogPreview;
