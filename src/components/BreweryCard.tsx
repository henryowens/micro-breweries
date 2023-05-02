import {
  Heading,
  Text,
  Card,
  CardHeader,
  CardBody,
  Container,
} from "@chakra-ui/react";
import { Brewery, DaysOfTheWeek } from "../api/breweries/models";

interface BreweryCardProps extends Brewery {}

const dayOfTheWeekMap: Record<number, DaysOfTheWeek> = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  7: "Sunday",
};

const BreweryCard: React.FC<BreweryCardProps> = ({
  city,
  name,
  zipcode,
  open,
}) => {
  const isOpen = open.includes(dayOfTheWeekMap[new Date().getDay()]);

  return (
    <Card width={300} borderColor="whitesmoke" borderWidth={1}>
      <CardHeader
        flex={1}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Heading as="h2" fontSize="2xl">
          {name}
        </Heading>
        <Text color="gray.500" fontSize="xs" fontWeight="bold" marginTop={2}>
          {city}, {zipcode}
        </Text>
      </CardHeader>
      <CardBody flex="inherit">
        <Container
          bgColor={isOpen ? "green.200" : "red.200"}
          width="fit-content"
          margin={0}
          paddingLeft="4"
          paddingRight="4"
          paddingTop="1.5"
          paddingBottom="1.5"
          borderRadius={50}
        >
          <Text
            color={isOpen ? "green.500" : "red.500"}
            fontSize="sm"
            fontWeight="bold"
          >
            {isOpen ? "Open" : "Closed"} today
          </Text>
        </Container>
      </CardBody>
    </Card>
  );
};
export default BreweryCard;
