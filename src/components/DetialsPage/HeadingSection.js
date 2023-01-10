import { Flex, Heading } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const HeadingSection = ({ index }) => {
  const dayForecast = useSelector(
    (state) => state.weatherData.dayForecast[index]
  );
  return (
    <Flex>
      <Heading as="h2" fontFamily="roboto" size="2xl" color="white">
        {dayForecast && dayForecast.dt_txt.split(" ")[0]}
      </Heading>
    </Flex>
  );
};

export default HeadingSection;
