import { Flex, SimpleGrid, Text, Image } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const DayDetailsBox = ({ index }) => {
  const dayForecast = useSelector(
    (state) => state.weatherData.dayForecast[index]
  );

  const change24To12 = (time) => {
    time = time.split(" ")[1];

    const temp = Number(time[0] + time[1]);

    if (temp == 0) {
      temp = 12;
    } else if (temp > 12) {
      temp = temp - 12;
      return temp + time.substring(2, 8) + " PM";
    }
    return temp + time.substring(2, 8) + " AM";
  };

  return (
    <Flex
      width="280px"
      height="280px"
      borderRadius="20px"
      background="#000000"
      opacity="0.8"
      justifyContent="center"
      alignItems="center"
    >
      <SimpleGrid columns={2} width="90%" spacing="8px">
        <Text color="white" fontWeight="600" fontSize="1.1rem">
          Time:
        </Text>
        <Text color="white" fontWeight="600" fontSize="1.1rem">
          {dayForecast && change24To12(dayForecast.dt_txt)}
        </Text>

        <Text color="white" fontWeight="600" fontSize="1rem">
          Temperature:
        </Text>
        <Text color="white" fontWeight="600" fontSize="1.1rem">
          {dayForecast && dayForecast.main.temp} °C
        </Text>
        {dayForecast && (
          <Image
            height="30px"
            width="30px"
            src={`http://openweathermap.org/img/w/${dayForecast.weather[0].icon}.png`}
            alt="weather-icon"
          />
        )}

        <Text fontSize="1rem" color="white" fontWeight="600">
          {dayForecast && dayForecast.weather[0].description}
        </Text>
        <Text color="white" fontWeight="600" fontSize="1rem">
          Humidity:
        </Text>
        <Text color="white" fontWeight="600" fontSize="1.1rem">
          {dayForecast && dayForecast.main.humidity}%
        </Text>
        <Text color="white" fontWeight="600" fontSize="1rem">
          Cloudy:
        </Text>
        <Text color="white" fontWeight="600" fontSize="1.1rem">
          {dayForecast && dayForecast.clouds.all}%
        </Text>
        <Text color="white" fontWeight="600" fontSize="1rem">
          Wind speed:
        </Text>
        <Text color="white" fontWeight="600" fontSize="1rem">
          {dayForecast && dayForecast.wind.speed}meter/sec
        </Text>
        <Text color="white" fontWeight="600" fontSize="1rem">
          Pressure
        </Text>
        <Text color="white" fontWeight="600" fontSize="1rem">
          {dayForecast && dayForecast.main.pressure} hPa
        </Text>
      </SimpleGrid>
    </Flex>
  );
};

export default DayDetailsBox;
