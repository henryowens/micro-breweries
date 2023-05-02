import {
  Heading,
  Text,
  Card,
  CardHeader,
  CardBody,
  Container,
  Link,
} from "@chakra-ui/react";
import { Brewery } from "../../api/breweries/models";
import cardStyles from "..//styles/breweryCard";

interface BreweryCardProps extends Brewery {
  isOpen: boolean;
}

const BreweryCard: React.FC<BreweryCardProps> = ({
  city,
  name,
  zipcode,
  isOpen,
  address,
}) => (
  <Card width={300} borderColor="whitesmoke" css={cardStyles.card}>
    <CardHeader css={cardStyles.header}>
      <Heading as="h2" fontSize="2xl">
        {name}
      </Heading>
      <Text color="gray.500" fontSize="xs" fontWeight="bold" marginTop={2}>
        {city}, {zipcode}
      </Text>
    </CardHeader>
    <CardBody css={cardStyles.body}>
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
      <Link
        href={`http://maps.google.com/?q=${address}, ${city}, ${zipcode}`}
        target="_blank"
      >
        View in maps
      </Link>
    </CardBody>
  </Card>
);

export default BreweryCard;
