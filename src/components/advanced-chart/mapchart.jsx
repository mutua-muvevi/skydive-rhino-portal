import PropTypes from "prop-types";
//component for mapchart
import { Chart } from "react-google-charts";

const Mapchart = ({ data }) => {
	

	return (
		<Chart
			chartEvents={[
				{
					eventName: "select",
					callback: ({ chartWrapper }) => {
						const chart = chartWrapper.getChart();
						const selection = chart.getSelection();
						if (selection.length === 0) return;
						const region = data[selection[0].row + 1];
						console.log("Selected : " + region);
					},
				},
			]}
			chartType="GeoChart"
			width="100%"
			height={data.height ? data.height : "100%"}
			data={data.series}
			options={data.options}
		/>
	);
};

Mapchart.propTypes = {
	data: PropTypes.object.isRequired,
};

export default Mapchart;
