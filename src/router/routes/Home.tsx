import {
  Button,
  Text,
  Flex,
  Switch,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Divider,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FormEvent, useEffect, useState } from "react";

import { breweriesService, postcodesService } from "../../api";
import { Brewery, DaysOfTheWeek } from "../../api/breweries/models";
import { BreweryCard } from "../../components";
import calculateDistance from "../../helpers/calulateDistance";

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
  const [loadingLocation, updateLoadingLocation] = useState(false);

  const [loadingPostCode, updatePostCodeLoading] = useState(false);
  const [postCodeError, updatePostCodeError] = useState<string>();

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

  const handleRequestLocation = () => {
    updateLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCurrentLocation({ latitude, longitude });
        updateLoadingLocation(false);
      },
      () => updateLoadingLocation(false)
    );
  };

  const handlePostCodeSumbit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updatePostCodeLoading(true);
    postcodesService
      .getByPostcode((e.target as any)[0].value as string)
      .then(({ data }) => {
        const results = data.results[(e.target as any)[0].value as string];
        if (
          !results ||
          results.length === 0 ||
          !results[0].longitude ||
          !results[0].latitude
        )
          updatePostCodeError("Postcode not found");
        else
          setCurrentLocation({
            latitude: Number(results[0].latitude),
            longitude: Number(results[0].longitude),
          });
      })
      .catch((e) => {
        console.error(e);
        updatePostCodeError("Postcode not found");
        return;
      })
      .finally(() => updatePostCodeLoading(false));
  };

  if (error) return <p>There was an error rendering the page</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="app">
      <span>{JSON.stringify(currentLocation)}</span>
      <Text>Search Breweries in your local area</Text>

      <Flex gap={3} marginTop="5" marginBottom="5" align-items="baseline">
        <form onSubmit={handlePostCodeSumbit}>
          <FormControl
            as={Flex}
            gap={2}
            flexDirection="column"
            isInvalid={!!postCodeError}
          >
            <Flex gap={2}>
              <Input
                id="PostCodeInput"
                size="sm"
                placeholder="Postcode"
                disabled={loadingPostCode}
                onInput={() => updatePostCodeError(undefined)}
              />
              <Button type="submit" size="sm" disabled={loadingPostCode}>
                Search
              </Button>
            </Flex>
            {!!postCodeError ? (
              <FormErrorMessage>{postCodeError}</FormErrorMessage>
            ) : (
              <FormHelperText
                style={{
                  minHeight: "1em",
                }}
              ></FormHelperText>
            )}
          </FormControl>
        </form>
        <Divider
          orientation="vertical"
          borderLeftWidth="1px"
          height="inherit"
          borderColor="whitesmoke.600"
        />
        <Button
          colorScheme="primary"
          size="sm"
          disabled={loadingLocation}
          onClick={handleRequestLocation}
        >
          Use Location
        </Button>
        <Divider
          orientation="vertical"
          borderLeftWidth="1px"
          height="inherit"
          borderColor="whitesmoke.600"
        />
        <FormControl
          as={Flex}
          gap={2}
          alignItems="center"
          width="auto"
          height="fit-content"
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
