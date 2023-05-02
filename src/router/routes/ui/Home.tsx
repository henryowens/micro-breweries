import {
  Text,
  Flex,
  Switch,
  FormControl,
  FormLabel,
  Divider,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { breweriesService } from "../../../api";
import { Brewery, DaysOfTheWeek } from "../../../api/breweries/models";
import {
  BreweryCard,
  LocationButton,
  PostcodeFilter,
} from "../../../components";
import calculateDistance from "../../../helpers/calulateDistance";
import homeStyles from "../styles/home";

const dayOfTheWeekMap: Record<number, DaysOfTheWeek> = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  7: "Sunday",
};

const HomeRoute = () => {
  const [isOpenFilter, updateIsOpenFilter] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [closestLocations, setClosestLocations] = useState<Brewery[]>([]);
  const { data, error, isLoading } = useQuery(["breweries"], () =>
    breweriesService.getAll()
  );
  useEffect(() => {
    let sortedLocations = [...(data?.data.breweries || [])].sort(
      (loc1, loc2) => {
        // Calculate the distances from the current location to each location
        const distance1 = calculateDistance(currentLocation, {
          latitude: loc1.location.lat,
          longitude: loc1.location.lng,
        });
        const distance2 = calculateDistance(currentLocation, {
          latitude: loc2.location.lat,
          longitude: loc2.location.lng,
        });

        // Return the difference between the distances
        return distance1 - distance2;
      }
    );

    if (isOpenFilter)
      sortedLocations = sortedLocations.filter(({ open }) =>
        open.includes(dayOfTheWeekMap[new Date().getDay()])
      );

    setClosestLocations(sortedLocations);
  }, [currentLocation, data, isOpenFilter]);

  if (error) return <p>There was an error rendering the page</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="app">
      <Text>Search Breweries in your local area</Text>
      <Flex gap={3} marginTop="5" marginBottom="5" align-items="baseline">
        <PostcodeFilter onUpdate={(location) => setCurrentLocation(location)} />
        <Divider
          orientation="vertical"
          borderColor="whitesmoke.600"
          css={homeStyles.divider}
        />
        <LocationButton onUpdate={(location) => setCurrentLocation(location)}>
          Use Location
        </LocationButton>
        <Divider
          orientation="vertical"
          borderColor="whitesmoke.600"
          css={homeStyles.divider}
        />
        <FormControl
          as={Flex}
          gap={2}
          alignItems="center"
          css={homeStyles.toggleContainer}
        >
          <FormLabel htmlFor="IsOpenSwitch" margin="0">
            Open:
          </FormLabel>
          <Switch
            onChange={() => updateIsOpenFilter(!isOpenFilter)}
            id="IsOpenSwitch"
            size="md"
            colorScheme="green"
            placeholder="Open"
          />
        </FormControl>
      </Flex>

      <Flex flexWrap="wrap" justifyContent="center" gap={50}>
        {closestLocations.map((brewery, i) => (
          <BreweryCard
            isOpen={brewery.open.includes(dayOfTheWeekMap[new Date().getDay()])}
            {...brewery}
            key={i}
          />
        ))}
      </Flex>
    </div>
  );
};

export default HomeRoute;
