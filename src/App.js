import React, { useState, useEffect } from 'react';
import axios from 'axios';
import KanbanBoard from './components/KanbanBoard';

function App() {
  const [data, setData] = useState(() => {
    // Try to load from localStorage if available
    const savedData = localStorage.getItem('kanbanData');
    return savedData ? JSON.parse(savedData) : null;
  });
  
  const [loading, setLoading] = useState(!data); // If data is loaded from localStorage, skip loading
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch data if not already available in localStorage
    if (!data) {
      const fetchData = async () => {
        try {
          const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
          setData(response.data);
          localStorage.setItem('kanbanData', JSON.stringify(response.data)); // Save data to localStorage
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setError('Failed to load data');
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [data]);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (data) {
      localStorage.setItem('kanbanData', JSON.stringify(data));
    }
  }, [data]);

  const handleTicketUpdate = (updatedTickets) => {
    // When tickets are updated, save the new state
    setData(prevData => ({
      ...prevData,
      tickets: updatedTickets
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>No data found</div>;
  }

  return (
    <div className="App">
      <KanbanBoard tickets={data.tickets} users={data.users} onTicketUpdate={handleTicketUpdate} />
    </div>
  );
}

export default App;
