import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';

const API_KEY = 'your_api_key';
const AUTH_TOKEN = 'v-cI7JeH9XviafbZTCcMOQHKdpDrvf1G';
const PIN = 1;

// const API_URL = `http://blynk-cloud.com/${AUTH_TOKEN}/get/${PIN}`;
const apiUrl = `https://blynk.cloud/external/api/get?token=${AUTH_TOKEN}&dataStreamId=${PIN}`;
const CAR_IMAGE = require('../assets/car.png');
const AVAILABLE_MESSAGE = 'Available';



const ParkingSlot = ({ apiUrl }) => {
  const [distance, setDistance] = useState(null);
  const [slotStatus, setSlotStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching data...');
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        console.log('Response:', response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Data:', data);

        // calculate distance and set slot status
        const calculatedDistance = parseInt(data[0], 10);
        if (calculatedDistance <= 50) {
          setSlotStatus('full');
        } else {
          setSlotStatus('empty');
        }
        setDistance(calculatedDistance);
      } catch (error) {
        console.error(error);
        setError('Error fetching data');
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000); // fetch data every 5 seconds
    return () => clearInterval(intervalId); // cleanup interval on unmount
  }, [apiUrl]);

  return (
    <View style={{ margin: 10 }}>
      {error && (
        <Text style={{ color: 'red' }}>
          {error}
        </Text>
      )}
      {distance !== null && slotStatus !== null && (
        <View>
          <Image
            source={
              slotStatus === 'full'
                ? require('./car.png')
                : require('./available.png')
            }
            style={{ width: 100, height: 100 }}
          />
          <Text style={{ fontWeight: 'bold' }}>
            Slot {apiUrl}: {slotStatus}
          </Text>
          <Text>
            Distance: {distance} cm
          </Text>
        </View>
      )}
    </View>
  );
};

export default ParkingSlot;
