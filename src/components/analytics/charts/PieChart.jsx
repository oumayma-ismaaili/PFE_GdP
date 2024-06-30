import { Pie } from "react-chartjs-2";
import { data, options } from "../../../data/chart/pie-chart";

const PieChart = () => {
  return <Pie data={data} options={options} />;
};

export default PieChart;
