import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import WeatherSearch from "./src/components/weatherSearch";
import WeatherInfo from "./src/components/weatherInfo";
import axios from "axios";
import { API_KEY, BASE_URL } from "./src/helpers/constants";

const App = () => {
  const [weatherData, setWeatherData] = useState();
  const searchWeather = (location) => {
    axios
      .get(`${BASE_URL}?q=${location}&appId=${API_KEY}`)
      .then((response) => {
        const data = response.data;
        data.visibility /= 100;
        data.visibility = data.visibility.toFixed(2);
        data.main.temp -= 273.15; // convert kelvin to cel
        data.main.temp = data.main.temp.toFixed(2);
        setWeatherData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <WeatherSearch searchWeather={searchWeather} />
      {weatherData && <WeatherInfo weatherData={weatherData} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default App;
