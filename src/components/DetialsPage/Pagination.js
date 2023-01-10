import { Button, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { FcNext, FcPrevious } from "react-icons/fc";
import {
  RiNumber1,
  RiNumber2,
  RiNumber3,
  RiNumber4,
  RiNumber5,
  RiNumber6,
} from "react-icons/ri";

const Pagination = ({ index }) => {
  return (
    <Flex width="500px" justifyContent="space-between">
      {index != 1 && (
        <Link href={`/day/${index - 1}`}>
          <Button>
            <FcPrevious />
          </Button>
        </Link>
      )}
      <Link href="/day/1">
        <Button>
          <RiNumber1 />
        </Button>
      </Link>
      <Link href="/day/2">
        <Button>
          <RiNumber2 />
        </Button>
      </Link>
      <Link href="/day/3">
        <Button>
          <RiNumber3 />
        </Button>
      </Link>
      <Link href="/day/4">
        <Button>
          <RiNumber4 />
        </Button>
      </Link>
      <Link href="/day/5">
        <Button>
          <RiNumber5 />
        </Button>
      </Link>
      <Link href="/day/6">
        <Button>
          <RiNumber6 />
        </Button>
      </Link>
      {index != 6 && (
        <Link href={`/day/${index + 1}`}>
          <Button>
            <FcNext />
          </Button>
        </Link>
      )}
    </Flex>
  );
};

export default Pagination;
