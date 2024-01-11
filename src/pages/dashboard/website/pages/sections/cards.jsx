import { Card, CardActionArea, CardContent, Stack, Typography } from "@mui/material";
import { useState } from "react";
import ModalComponent from "../../../../../components/modal/modal";
import HomePage from "../homepage/homepage";
import AboutPage from "../about/about";
import ContactPage from "../contact/contact";

const PagesCards = () => {
	const [openHomepage, setOpenHomepage] = useState(false);
	const [openAboutpage, setOpenAboutpage] = useState(false);
	const [openContactpage, setOpenContactpage] = useState(false);

	const pages = [
		{
			title: "Homepage",
			onClick: () => setOpenHomepage(true),
		},
		{
			title: "About Page",
			onClick: () => setOpenAboutpage(true),
		},
		{
			title: "Contact Page",
			onClick: () => setOpenContactpage(true),
		},
	];
	return (
		<>
			<Stack direction="column" spacing={3}>
				{pages.map((page, index) => (
					<Card key={index}>
						<CardActionArea onClick={page.onClick}>
							<CardContent>
								<Typography variant="h5">{page.title}</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				))}
			</Stack>

			<ModalComponent
				title="Open Homepage Data"
				open={openHomepage}
				onClose={() => setOpenHomepage(false)}
				height={700}
			>
				<HomePage onClose={() => setOpenHomepage(false)}/>
			</ModalComponent>

			<ModalComponent
				title="Open About Page Data"
				open={openAboutpage}
				onClose={() => setOpenAboutpage(false)}
				height={700}
			>
				<AboutPage onClose={() => setOpenAboutpage(false)}/>
			</ModalComponent>

			<ModalComponent
				title="Open Contact Page Data"
				open={openContactpage}
				onClose={() => setOpenContactpage(false)}
				height={700}
			>
				<ContactPage onClose={() => setOpenContactpage(false)}/>
			</ModalComponent>
		</>
	);
};

export default PagesCards;
