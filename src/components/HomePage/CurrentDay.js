import {
  Flex,
  Button,
  Input,
  Box,
  Text,
  Image,
  Grid,
  GridItem,
  ScaleFade,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";

import { fetchWeatherData } from "../../redux/weatherDataSlice";
import Link from "next/link";

const CurrentDay = () => {
  const [place, setPlace] = useState("");

  const [counter, SetCounter] = useState(0);

  const locationName = useSelector((state) => state.geocodeData.location);

  const dayForecast = useSelector((state) => state.weatherData.dayForecast[0]);

  const city = useSelector((state) => state.weatherData.city);

  useEffect(() => {
    SetCounter(1);
  }, [dayForecast]);

  const timezone = (input) => {
    var hour = input / 3600;
    var min = input % 3600;

    var ans = "";
    if (hour <= 9) ans = "0" + hour;
    else ans = hour;

    ans = ans + ":";
    if (min <= 9) ans = ans + "0" + min;
    else ans = ans + min;
    return ans;
  };

  const dispatch = useDispatch();

  const onPlaceInput = (event) => {
    setPlace(event.target.value);
  };

  const onPlaceInputSubmit = (event) => {
    event.preventDefault();
    dispatch(fetchWeatherData(place));
    SetCounter(0);
  };

  return (
    <Flex
      width="100%"
      height="55%"
      justifyContent="space-evenly"
      alignItems="center"
    >
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        width="700px"
        height="375px"
        background="#000000"
        opacity="0.80"
        borderRadius="30px"
      >
        <Grid
          width="630px"
          height="37.5px"
          templateColumns="repeat(4, 140px)"
          justifyContent="center"
          alignItems="center"
        >
          <GridItem rowSpan={1} colSpan={4}>
            <form onSubmit={onPlaceInputSubmit}>
              <Input
                name="place"
                width="80%"
                color="white"
                backgroundColor="#7c7c7c2b"
                border="none"
                placeholder="Search"
                borderRadius="10px"
                onChange={onPlaceInput}
                value={place}
                marginRight="10px"
              />
              <Button type="submit" color="black">
                <BsSearch />
              </Button>
            </form>
          </GridItem>
        </Grid>
        <ScaleFade in={dayForecast && counter ? true : false}>
          <Grid
            width="690px"
            height="300px"
            templateRows="repeat(9, 1fr)"
            templateColumns="repeat(4, 140px)"
            justifyContent="center"
            alignItems="center"
          >
            <GridItem rowSpan={2} colSpan={4}>
              <Text color="white" fontSize="1.3rem" fontWeight="600">
                Weather in {locationName}
              </Text>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Text color="white" fontSize="1.2rem" fontWeight="600">
                Temperature:
              </Text>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Text color="white" fontSize="1.2rem" fontWeight="600">
                {dayForecast && dayForecast.main.temp} °C
              </Text>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Text color="white" fontSize="1.2rem" fontWeight="600">
                Cloudy:
              </Text>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Text color="white" fontSize="1.2rem" fontWeight="600">
                {dayForecast && dayForecast.clouds.all}%
              </Text>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Text color="white" fontSize="1.2rem" fontWeight="600">
                Feels like
              </Text>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Text color="white" fontSize="1.2rem" fontWeight="600">
                {dayForecast && dayForecast.main.feels_like} °C
              </Text>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Text color="white" fontSize="1rem" fontWeight="600">
                Sunrise:
              </Text>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Text color="white" fontSize="1rem" fontWeight="600">
                {city && city.sunrise}
              </Text>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              {dayForecast && (
                <Image
                  height="35px"
                  width="35px"
                  src={`http://openweathermap.org/img/w/${dayForecast.weather[0].icon}.png`}
                  alt="weather-icon"
                />
              )}
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Text fontSize="1.2rem" fontWeight="600" color="white">
                {dayForecast && dayForecast.weather[0].main}
              </Text>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Text color="white" fontSize="1rem" fontWeight="600">
                Sunset:
              </Text>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Text color="white" fontSize="1rem" fontWeight="600">
                {city && city.sunset}
              </Text>
            </GridItem>
            <GridItem rowSpan={1} colSpan={2}>
              <Text color="white" fontSize="1rem" fontWeight="600">
                {dayForecast && dayForecast.weather[0].description}
              </Text>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Text color="white" fontSize="1rem" fontWeight="600">
                Date:
              </Text>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Text color="white" fontSize="1rem" fontWeight="600">
                {city && city.date}
              </Text>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Text color="white" fontSize="1rem" fontWeight="600">
                Humidity:
              </Text>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Text color="white" fontSize="1rem" fontWeight="600">
                {dayForecast && dayForecast.main.humidity}%
              </Text>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Text color="white" fontSize="1rem" fontWeight="600">
                Timezone
              </Text>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Text color="white" fontSize="1rem" fontWeight="600">
                UTC + {city && timezone(city.timezone)}
              </Text>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Text color="white" fontSize="1rem" fontWeight="600">
                Wind speed:
              </Text>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Text color="white" fontSize="1rem" fontWeight="600">
                {dayForecast && dayForecast.wind.speed}meter/sec
              </Text>
            </GridItem>

            <GridItem rowSpan={2} colSpan={2}>
              <Text color="white" fontSize="1rem" fontWeight="600">
                Weather recorded in {dayForecast && dayForecast.dt_txt}
              </Text>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Text color="white" fontSize="1rem" fontWeight="600">
                Pressure
              </Text>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Text color="white" fontSize="1rem" fontWeight="600">
                {dayForecast && dayForecast.main.pressure} hPa
              </Text>
            </GridItem>
          </Grid>
        </ScaleFade>
      </Flex>
      <ScaleFade in={dayForecast ? true : false}>
        <Link href="day/1">
          <Button>Click here for 5 day forecast</Button>
        </Link>
      </ScaleFade>
    </Flex>
  );
};

export default CurrentDay;
