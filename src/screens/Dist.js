import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity  } from 'react-native';
import BackButton from '../components/BackButton';
const API_KEY = 'your_api_key';
const AUTH_TOKEN = 'v-cI7JeH9XviafbZTCcMOQHKdpDrvf1G';
const PIN = 1;

// const API_URL = `http://blynk-cloud.com/${AUTH_TOKEN}/get/${PIN}`;
const API_URL = `https://blynk.cloud/external/api/get?token=${AUTH_TOKEN}&dataStreamId=${PIN}`;
const CAR_IMAGE = require('../assets/car.png');
const AVAILABLE_MESSAGE = 'Available';


const Dist = (navigation) => {
  const [sensorData, setSensorData] = useState(null);
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
        // storing api call value
        const data = await response.json();
        console.log('Data:', data);

        // set sensor data state
        setSensorData(parseFloat(data));
      } catch (error) {
        console.error(error);
        setError('Error fetching data');
      }
    };

    // set interval to fetch distance every 5 seconds
    const interval = setInterval(() => {
      fetchData();
    }, 2000);

    // clear interval when component unmounts
    return () => clearInterval(interval);
  }, []);


  const isSlotEmpty = sensorData && sensorData > 50;
  const slotStatus = isSlotEmpty ? 'Empty' : 'Full';
  const slotStatusColor = isSlotEmpty ? 'green' : 'red';

  return (
    
    <View style={styles.container}>
      <BackButton goBack={navigation.goBack} />
      <Text style={styles.title}>Parking Status</Text>
      <View style={styles.row}>
        <View style={styles.slot}>
          <Text style={styles.slotNumber}>Slot 1</Text>
          {sensorData <= 50 ? (
            <Image source={CAR_IMAGE} style={styles.image} />
          ) : (
            <Text style={styles.available}>{AVAILABLE_MESSAGE}</Text>
          )}
        </View>
        <View style={styles.slot}>
          <Text style={styles.slotNumber}>Slot 2</Text>
          {sensorData <= 50 ? (
            <Image source={CAR_IMAGE} style={styles.image} />
          ) : (
            <Text style={styles.available}>{AVAILABLE_MESSAGE}</Text>
          )}
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.slot}>
          <Text style={styles.slotNumber}>Slot 3</Text>
          {sensorData <= 50 ? (
            <Image source={CAR_IMAGE} style={styles.image} />
          ) : (
            <Text style={styles.available}>{AVAILABLE_MESSAGE}</Text>
          )}
        </View>
        <View style={styles.slot}>
          <Text style={styles.slotNumber}>Slot 4</Text>
          {sensorData <= 50 ? (
            <Image source={CAR_IMAGE} style={styles.image} />
          ) : (
            <Text style={styles.available}>{AVAILABLE_MESSAGE}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  parkingSpot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  available: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'green',
  },
});

export default Dist;