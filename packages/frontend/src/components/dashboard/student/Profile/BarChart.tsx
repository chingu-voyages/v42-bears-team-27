import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

type Props = {
  chartLabel: string;
  dataFromAPI: {
    [key: string]: number;
  };
};

const BarChart: React.FC<Props> = ({ chartLabel, dataFromAPI }) => {
  const labels = Object.keys(dataFromAPI);

  const dataPoints = Object.values(dataFromAPI);
  const minValue = Math.min(...dataPoints);
  const maxValue = Math.max(...dataPoints);
  const range = maxValue - minValue;
  const breakPoint1 = minValue + range / 3;
  const breakPoint2 = breakPoint1 + range / 3;

  const bgColors = dataPoints.map((val) => {
    if (val > breakPoint2) {
      return 'rgba(78, 191, 46, 0.595)';
    }
    if (val > breakPoint1) {
      return 'rgba(202, 108, 21, 0.593)';
    }
    return 'rgba(245, 14, 14, 0.592)';
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: chartLabel,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        data: dataPoints,
        backgroundColor: bgColors,
      },
    ],
  };
  return (
    <div sx={{ padding: '1.5em' }}>
      <Bar options={options} data={data} />
    </div>
  );
};
export default BarChart;
