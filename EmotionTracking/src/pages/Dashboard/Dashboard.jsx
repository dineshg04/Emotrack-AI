import React from 'react';
import { CircularProgress, Button, Box, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const mentalHealthScore = 75; // This can be dynamic based on actual data

  const data = {
    labels: ['Anxiety', 'Mood', 'Stress', 'Overall'],
    datasets: [
      {
        label: 'Score',
        data: [65, 70, 60, 75], // Example data
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0'
        ],
        borderColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0'
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    },
    plugins: {
      legend: {
        display: true
      },
      title: {
        display: true,
        text: 'Mental Health Metrics'
      }
    }
  };

  return (
    <Box sx={{ width: '80%', m: 'auto', textAlign: 'center', p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Mental Health Dashboard
      </Typography>
      <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
        <CircularProgress variant="determinate" value={mentalHealthScore} size={100} thickness={4} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {`${Math.round(mentalHealthScore)}%`}
          </Typography>
        </Box>
      </Box>
      <Bar data={data} options={options} />
      <Button variant="contained" color="primary" onClick={() => console.log('Exporting...')}>
        Export Data
      </Button>
    </Box>
  );
}

export default Dashboard;
