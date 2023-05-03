import { useState } from "react";

const useLocationFinder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [result, setResult] = useState<{
    latitude: number;
    longitude: number;
  }>();

  const submit = () => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setResult({ latitude, longitude });
        setIsLoading(false);
      },
      () => {
        setError("There was an issue getting your location");
        setIsLoading(false);
      }
    );
  };

  const reset = () => {
    setIsLoading(false);
    setError(undefined);
  };

  return { isLoading, error, result, submit, reset };
};

export default useLocationFinder;
