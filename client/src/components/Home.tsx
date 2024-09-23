import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DevlogForm from './DevlogForm';
import DevlogList from './DevlogList';

interface DevlogEntry {
  _id: string;
  title: string;
  date: string;
  changes: string;
  tags?: string; // Optional tags field
}

const Home: React.FC = () => {
  const [devlogs, setDevlogs] = useState<DevlogEntry[]>([]);

  useEffect(() => {
    fetchDevlogs();
  }, []);

  const fetchDevlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/devlogs');
      setDevlogs(response.data);
    } catch (error) {
      console.error("Error fetching devlogs", error);
    }
  };

  const addDevlog = async (newDevlog: Omit<DevlogEntry, '_id'>) => {
    try {
      const response = await axios.post('http://localhost:5000/devlogs', newDevlog);
      setDevlogs([...devlogs, response.data]);
    } catch (error) {
      console.error("Error adding devlog", error);
    }
  };

  const updateDevlog = async (id: string, updatedDevlog: Omit<DevlogEntry, '_id'>) => {
    try {
      const response = await axios.put(`http://localhost:5000/devlogs/${id}`, updatedDevlog);
      setDevlogs(devlogs.map(devlog => devlog._id === id ? response.data : devlog));
    } catch (error) {
      console.error("Error updating devlog", error);
    }
  };

  const deleteDevlog = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/devlogs/${id}`);
      setDevlogs(devlogs.filter(devlog => devlog._id !== id));
    } catch (error) {
      console.error("Error deleting devlog", error);
    }
  };

  const resetCurrentDevlog = () => {
    // Logic to reset the current devlog state or form
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-10">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center text-gray-800 mb-8 font-2">DevLog Sof</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <DevlogForm addDevlog={addDevlog} resetCurrentDevlog={resetCurrentDevlog} />
          </div>
          <div>
            <h2 className="text-2xl font-2 font-semibold text-gray-700 mb-4">Devlog Entries</h2>
            <DevlogList devlogs={devlogs} updateDevlog={updateDevlog} deleteDevlog={deleteDevlog} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
