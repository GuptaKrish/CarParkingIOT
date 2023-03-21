import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const AUTH_TOKEN = 'v-cI7JeH9XviafbZTCcMOQHKdpDrvf1G';
const PIN = 1;

// const API_URL = `http://blynk-cloud.com/${AUTH_TOKEN}/get/${PIN}`;
const API_URL = `https://blynk.cloud/external/api/get?token=${AUTH_TOKEN}&dataStreamId=${PIN}`;


const calculateDistance = (sensorValues) => {
  // Your distance calculation logic goes here
  return Math.max(...sensorValues);
}

const EachDist = () => {
  const [sensorData, setSensorData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching data...');
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        console.log('Response:', response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Data:', data);

        // set sensor data state
        setSensorData(data);
      } catch (error) {
        console.error(error);
        setError('Error fetching data');
      }
    };

    // Fetch data every 10 seconds
    const intervalId = setInterval(fetchData, 10000);

    // Clear interval when component unmounts
    return () => clearInterval(intervalId);

  }, []);

  const distance = calculateDistance(sensorData);

  const isFull = distance <= 50;
  const statusText = isFull ? 'FULL' : 'EMPTY';
  const statusColor = isFull ? 'red' : 'green';

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {error && (
        <Text style={{ color: 'red' }}>
          {error}
        </Text>
      )}
      {!error && (
        <>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
            Parking Status
          </Text>
          <View style={{ backgroundColor: statusColor, padding: 20, borderRadius: 10 }}>
            <Text style={{ fontSize: 48, fontWeight: 'bold', color: 'white' }}>
              {statusText}
            </Text>
          </View>
          <Text style={{ marginTop: 20 }}>
            Distance: {distance} cm
          </Text>
        </>
      )}
    </View>
  );
};

export default EachDist;
