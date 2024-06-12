import React, { useState } from "react";
import CustomTextInput from "./customTextInput";
import { Button, View, StyleSheet } from "react-native";

const WeatherSearch = ({ searchWeather }) => {
  const [location, setLocation] = useState("");

  return (
    <View>
      <CustomTextInput
        placeholder="Search the weather of your city"
        numberOfLines={1}
        text={location}
        onChange={setLocation}
      />
      <View style={styles.buttonWrapper}>
        <Button title="Search" onPress={() => searchWeather(location)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    marginTop: 20,
  },
});

export default WeatherSearch;
