import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { breweriesService } from "./api";
import { Brewery } from "./api/breweries/models";
import "./app.scss";
import calculateDistance from "./helpers/calulateDistance";

const App = () => {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [loadingLocation, updateLoadingLocation] = useState(false);
  const [closestLocations, setClosestLocations] = useState<Brewery[]>([]);
  const { data, error, isLoading } = useQuery(["breweries"], () =>
    breweriesService.getAll()
  );

  useEffect(() => {
    const sortedLocations = [...(data?.data.breweries || [])].sort(
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

    setClosestLocations(sortedLocations);
  }, [currentLocation, data]);

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

  if (error) return <p>There was an error rendering the page</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="app">
      <header>Micro Breweries Search</header>
      <p>Search Breweries in your local area</p>

      <button disabled={loadingLocation} onClick={handleRequestLocation}>
        Use Current Location
      </button>

      <div>
        {closestLocations.map(({ name, city, zipcode }) => (
          <div>
            <h2>{name}</h2>
            <p>
              {city}, {zipcode}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
