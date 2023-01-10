import { Flex } from "@chakra-ui/react";
import Head from "next/head";
import CurrentDay from "../components/HomePage/CurrentDay";
import CurrentDayDetails from "../components/HomePage/CurrentDayDetails";

const Home = () => {
  
  return (
    <>
      <Head>
        <title>Weather Forecast</title>
      </Head>
      <Flex
        justifyContent="center"
        alignItems="center"
        backgroundImage="linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3)),url('/images/cloud.jpg')"
        width="100%"
        height="100vh"
        backgroundPosition="center"
        backgroundSize="cover"
      >
        <Flex
          width="90%"
          height="96%"
          flexDirection="column"
          fontFamily="roboto"
        >
          <CurrentDay />
          <CurrentDayDetails />
        </Flex>
      </Flex>
    </>
  );
};
export default Home;
