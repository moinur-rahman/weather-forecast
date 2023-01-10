import { Center, ScaleFade, Wrap, WrapItem, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DayDetailsBox from "./DayDetailsBox";

const DayDetails = ({ first, last }) => {
  const [counter, SetCounter] = useState(0);

  useEffect(() => {
    const time = 0;
    const intervalId = setInterval(() => {
      time += 1;
      if (time > 8) {
        clearInterval(intervalId);
        return;
      }
      return SetCounter((counter) => counter + 1);
    }, 125);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Wrap justify="space-evenly">
      {first <= last && first < 40 && (
        <WrapItem
          w="300px"
          h="300px"
          justifyContent="center"
          alignItems="center"
        >
          <ScaleFade in={counter >= 1 ? true : false}>
            <DayDetailsBox index={first} />
          </ScaleFade>
        </WrapItem>
      )}

      {first + 1 <= last && first + 1 < 40 && (
        <WrapItem
          w="300px"
          h="300px"
          justifyContent="center"
          alignItems="center"
        >
          <ScaleFade in={counter >= 2 ? true : false}>
            <DayDetailsBox index={first + 1} />
          </ScaleFade>
        </WrapItem>
      )}
      {first + 2 <= last && first + 2 < 40 && (
        <WrapItem
          w="300px"
          h="300px"
          justifyContent="center"
          alignItems="center"
        >
          <ScaleFade in={counter >= 3 ? true : false}>
            <DayDetailsBox index={first + 2} />
          </ScaleFade>
        </WrapItem>
      )}
      {first + 3 <= last && first + 3 < 40 && (
        <WrapItem
          w="300px"
          h="300px"
          justifyContent="center"
          alignItems="center"
        >
          <ScaleFade in={counter >= 4 ? true : false}>
            <DayDetailsBox index={first + 3} />
          </ScaleFade>
        </WrapItem>
      )}
      {first + 4 <= last && first + 4 < 40 && (
        <WrapItem
          w="300px"
          h="300px"
          justifyContent="center"
          alignItems="center"
        >
          <ScaleFade in={counter >= 5 ? true : false}>
            <DayDetailsBox index={first + 4} />
          </ScaleFade>
        </WrapItem>
      )}
      {first + 5 <= last && first + 5 < 40 && (
        <WrapItem
          w="300px"
          h="300px"
          justifyContent="center"
          alignItems="center"
        >
          <ScaleFade in={counter >= 6 ? true : false}>
            <DayDetailsBox index={first + 5} />
          </ScaleFade>
        </WrapItem>
      )}
      {first + 6 <= last && first + 6 < 40 && (
        <WrapItem
          w="300px"
          h="300px"
          justifyContent="center"
          alignItems="center"
        >
          <ScaleFade in={counter >= 7 ? true : false}>
            <DayDetailsBox index={first + 6} />
          </ScaleFade>
        </WrapItem>
      )}
      {first + 7 <= last && first + 7 < 40 && (
        <WrapItem
          w="300px"
          h="300px"
          justifyContent="center"
          alignItems="center"
        >
          <ScaleFade in={counter >= 8 ? true : false}>
            <DayDetailsBox index={first + 7} />
          </ScaleFade>
        </WrapItem>
      )}
    </Wrap>
  );
};

export default DayDetails;
