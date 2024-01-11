import PropTypes from "prop-types";
// components
import Chart, { useChart } from "../index";

// ----------------------------------------------------------------------

const ChartMixed = ({ data }) => {
	const chartOptions = useChart(data.options);

	return (
		<Chart
			type={data.type}
			series={data.series}
			options={chartOptions}
			height={data.height ? data.height : 350}
		/>
	);
};

ChartMixed.propTypes = {
	data: PropTypes.object.isRequired,
};

export default ChartMixed;

// ----------------------------------------------------------------------
