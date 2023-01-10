import { Button, Flex, Text } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { useSelector } from "react-redux";
import DayDetails from "../../components/DetialsPage/DayDetails";
import HeadingSection from "../../components/DetialsPage/HeadingSection";
import Pagination from "../../components/DetialsPage/Pagination";
import { AiFillHome } from "react-icons/ai";
import { useEffect } from "react";

const Details = () => {
  const dayForecast = useSelector((state) => state.weatherData.dayForecast[0]);

  const remaining = 0;
  if (dayForecast)
    remaining = (24 - dayForecast.dt_txt.split(" ")[1].substring(0, 2)) / 3;

  const router = useRouter();
  
  useEffect(() => {
    if (!dayForecast) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Day Details</title>
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
          width="100%"
          height="100%"
          justifyContent="right"
          position="absolute"
        >
          <Link href="/">
            <Button marginRight="150px" marginTop="10px">
              <AiFillHome />
              <Text marginLeft="10px"> Back to Home</Text>
            </Button>
          </Link>
        </Flex>
        <Flex
          width="90%"
          height="92%"
          justifyContent="center"
          alignItems="center"
        >
          <Flex
            flexDirection="column"
            fontFamily="roboto"
            justifyContent="center"
            alignItems="center"
          >
            <HeadingSection index={remaining + 16} />
            {dayForecast && (
              <DayDetails first={remaining + 16} last={remaining + 23} />
            )}
            <Pagination index={4} />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Details;
