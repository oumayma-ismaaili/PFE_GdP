import { Bar } from "react-chartjs-2";
import { data, options } from "../../../data/chart/bar-chart";

const BarChart = () => {
  return (
    <div className="h-full relative">
      <Bar options={options} data={data} />
    </div>
  );
};

export default BarChart;
