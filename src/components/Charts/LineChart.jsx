import { Line } from 'react-chartjs-2'

const options = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      grace: 1,
      ticks: {
        stepSize: 1,
        color: 'rgba(255, 255, 255, 0.8)'
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.3)'
      }
    },
    x: {
      ticks: {
        color: 'rgba(255, 255, 255, 0.8)'
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.3)'
      }
    }
  },
  elements: {
    point: {
      radius: 3
    }
  },
  plugins: {
    tooltip: {
      multiKeyBackground: 'rgb(255, 160, 122, 0.2)',
      backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    legend: {
      position: 'top',
      labels: {
        color: 'rgba(255, 255, 255, 0.9)',
        font: {
          size: 12
        }
      }
    },
    title: {
      display: true,
      color: 'rgba(255, 255, 255, 0.95)',
      font: {
        size: 14,
        weight: 'normal'
      }
    }
  }
}

const LineChart = ({ labels, data, titleText, label }) => {
  options.plugins.title.text = titleText
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: label,
        data: data,
        spanGaps: true,
        borderColor: 'rgb(255, 160, 122)',
        backgroundColor: 'rgb(255, 160, 122, 0.2)',
        borderWidth: 2,
        tension: 0.1,
        fill: true
      }
    ]
  }
  return <Line width={'100%'} height={'39%'} data={chartData} options={options} />
}

export default LineChart
