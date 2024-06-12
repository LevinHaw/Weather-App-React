import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import WeatherSearch from "./src/components/weatherSearch";
import WeatherInfo from "./src/components/weatherInfo";
import axios from "axios";
import { API_KEY, BASE_URL } from "./src/helpers/constants";

const App = () => {
  const [weatherData, setWeatherData] = useState();

  const [status, setStatus] = useState();

  const renderComponent = () => {
    switch (status) {
      case "loading":
        return <ActivityIndicator size="large" />;
      case "success":
        return <WeatherInfo weatherData={weatherData} />;
      case "error":
        return (
          <Text>
            Something went wrong. Please try again with a correct city name
          </Text>
        );
      default:
        return;
    }
  };

  const searchWeather = (location) => {
    setStatus("loading");
    axios
      .get(`${BASE_URL}?q=${location}&appId=${API_KEY}`)
      .then((response) => {
        const data = response.data;
        data.visibility /= 100;
        data.visibility = data.visibility.toFixed(2);
        data.main.temp -= 273.15; // convert kelvin to cel
        data.main.temp = data.main.temp.toFixed(2);
        setWeatherData(data);
        setStatus("success");
      })
      .catch((error) => {
        console.log(error);
        setStatus("error");
      });
  };

  return (
    <View style={styles.container}>
      <WeatherSearch searchWeather={searchWeather} />
      <View style={styles.marginTop20}>{renderComponent()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  marginTop20: {
    marginTop: 20,
  },
});

export default App;
