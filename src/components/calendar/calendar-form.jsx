import PropTypes from "prop-types";
import merge from "lodash/merge";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
	Box,
	Button,
	DialogActions,
	IconButton,
	Stack,
	Tooltip,
} from "@mui/material";
import Textfield from "../form/textfield/textfield";
import SwitchField from "../form/switch/switch";
import Iconify from "../iconify";
import { LoadingButton } from "@mui/lab";
import { ColorSinglePicker } from "../color-utils";
import MobileDateTimeField from "../form/date/mobile-datetime";

// ----------------------------------------------------------------------

const getInitialValues = (event, range) => {
	const initialEvent = {
		title: "",
		description: "",
		color: "#1890FF",
		allDay: false,
		start: range
			? new Date(range.start).toISOString()
			: new Date().toISOString(),
		end: range
			? new Date(range.end).toISOString()
			: new Date().toISOString(),
	};

	if (event || range) {
		return merge({}, initialEvent, event);
	}

	return initialEvent;
};

const eventValidation = Yup.object().shape({
	title: Yup.string().max(255).required("Title is required"),
	description: Yup.string().max(1000),
});

// ----------------------------------------------------------------------

CalendarForm.propTypes = {
	event: PropTypes.object,
	range: PropTypes.object,
	onCancel: PropTypes.func,
	onDeleteEvent: PropTypes.func,
	onCreateUpdateEvent: PropTypes.func,
	colorOptions: PropTypes.arrayOf(PropTypes.string),
};

export default function CalendarForm({
	event,
	range,
	colorOptions,
	onDeleteEvent,
	onCancel,
}) {
	const onSubmit = (values, actions) => {
		console.log(values);
		console.log(actions);
	};

	const hasEventData = !!event;

	return (
		<Formik
			initialValues={getInitialValues(event, range)}
			validationSchema={eventValidation}
			onSubmit={onSubmit}
		>
			{({ isSubmitting, values, handleChange }) => (
				<Form>
					<Stack spacing={3} sx={{ px: 3, pb: 3 }}>
						<Textfield name="title" label="Title" />
						<Textfield
							name="description"
							label="Description"
							multiline
							rows={3}
						/>
						<SwitchField name="allDay" label="All day" />

						<MobileDateTimeField name="start" label="Start date" />

						<ColorSinglePicker
							value={values}
							onChange={handleChange}
							colors={colorOptions}
						/>
					</Stack>
					<DialogActions>
						{hasEventData && (
							<Tooltip title="Delete Event">
								<IconButton onClick={onDeleteEvent}>
									<Iconify icon="eva:trash-2-outline" />
								</IconButton>
							</Tooltip>
						)}

						<Box sx={{ flexGrow: 1 }} />

						<Button
							variant="outlined"
							color="inherit"
							onClick={onCancel}
						>
							Cancel
						</Button>

						<LoadingButton
							type="submit"
							variant="contained"
							loading={isSubmitting}
						>
							{hasEventData ? "Update" : "Add"}
						</LoadingButton>
					</DialogActions>
				</Form>
			)}
		</Formik>
	);
}
