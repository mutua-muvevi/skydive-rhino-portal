//
import Accordion from "./accordion";
import Alert from "./alert";
import Avatar from "./avatar";
import Autocomplete from "./autocomplete";

import Breadcrumbs from "./breadcrumbs";
import ButtonGroup from "./button-group";
import Backdrop from "./backdrop";
import Button from "./button";
import Badge from "./badge";

import Card from "./card";
import Checkbox from "./checkbox";
import Chip from "./chip";
import ControlLabel from "./control-label";

import DataGrid from "./datagrid";
import Dialog from "./dialog";
import Drawer from "./drawer";

import Fab from "./fab";

import Input from "./input";

import Link from "./link";
import Lists from "./list";
import LoadingButton from "./loading-button";

import Menu from "./menu";

import Pagination from "./pagination";
import Paper from "./paper";
import Progress from "./progress";
import Popover from "./popover";

import Radio from "./radio";
import Rating from "./rating";

import Select from "./select";
import Skeleton from "./skeleton";
import Slider from "./slider";
import Stepper from "./stepper";
import SvgIcon from "./svg-icon";
import Switch from "./switch";

import Table from "./table";
import Tabs from "./tabs";
import Timeline from "./timeline";
import ToggleButton from "./toggle-button";
import Tooltip from "./tooltip";
import TreeView from "./tree-view";
import Typography from "./typography";

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme) {
	return Object.assign(
		Accordion(theme),
		Alert(theme),
		Avatar(theme),
		Autocomplete(theme),

		Backdrop(theme),
		Badge(theme),
		ButtonGroup(theme),
		Breadcrumbs(theme),
		Button(theme),

		Card(theme),
		Checkbox(theme),
		Chip(theme),
		ControlLabel(theme),

		DataGrid(theme),
		Dialog(theme),
		Drawer(theme),

		Fab(theme),

		Input(theme),

		Link(theme),
		Lists(theme),
		LoadingButton(theme),

		Menu(theme),

		Pagination(theme),
		Paper(theme),
		Popover(theme),
		Progress(theme),

		Radio(theme),
		Rating(theme),

		Select(theme),
		Skeleton(theme),
		Slider(theme),
		Stepper(theme),
		SvgIcon(theme),
		Switch(theme),

		Tabs(theme),
		Table(theme),
		Timeline(theme),
		ToggleButton(theme),
		Tooltip(theme),
		TreeView(theme),
		Typography(theme)
	);
}
