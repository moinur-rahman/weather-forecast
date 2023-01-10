import { Flex, Heading, ScaleFade, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CurrentDayDetailsBox from "./CurrentDayDetailsBox";

const CurrentDayDetails = () => {
  const dayForecast = useSelector((state) => state.weatherData.dayForecast[0]);

  const [counter, SetCounter] = useState(0);

  useEffect(() => {
    if (dayForecast) {
      SetCounter(0);
      const time = 0;
      const intervalId = setInterval(() => {
        time += 1;
        if (time > 4) {
          clearInterval(intervalId);
          return;
        }
        return SetCounter((counter) => counter + 1);
      }, 125);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [dayForecast]);

  return (
    <Flex
      width="100%"
      height="45%"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <ScaleFade in={dayForecast && counter >= 1 ? true : false}>
        <Heading as="h1" fontFamily="roboto" size="lg" color="white">
          Hourly Forecast
        </Heading>
      </ScaleFade>
      <Flex
        width="100%"
        height="90%"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <ScaleFade in={dayForecast && counter >= 1 ? true : false}>
          <CurrentDayDetailsBox index="1" />
        </ScaleFade>
        <ScaleFade in={dayForecast && counter >= 2 ? true : false}>
          <CurrentDayDetailsBox index="2" />
        </ScaleFade>
        <ScaleFade in={dayForecast && counter >= 3 ? true : false}>
          <CurrentDayDetailsBox index="3" />
        </ScaleFade>
        <ScaleFade in={dayForecast && counter >= 4 ? true : false}>
          <CurrentDayDetailsBox index="4" />
        </ScaleFade>
      </Flex>
    </Flex>
  );
};

export default CurrentDayDetails;
