import { Box, Typography, Stack, CardMedia, Paper } from "@mui/material";

import PropTypes from "prop-types";
import Iframe from "../../../../components/iframe";

const CurriculumPreview = ({ formData }) => {
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
							image={URL.createObjectURL(formData.thumbnail)}
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

						{block.file && (
							<Iframe
								src={block.file}
								title={`Content Block ${index + 1}`}
								style={{ height: "80vh" }}
								onError={(e) => console.log(e)}
							/>
						)}
					</Stack>
				</Paper>
			))}
		</Stack>
	);
};

CurriculumPreview.propTypes = {
	formData: PropTypes.object,
};

export default CurriculumPreview;
