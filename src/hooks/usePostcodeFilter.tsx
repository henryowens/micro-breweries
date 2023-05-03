import { FormEvent, useEffect, useState } from "react";
import { postcodesService } from "../api";

const usePostcodeFilter = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [result, setResult] = useState<{
    latitude: number;
    longitude: number;
  }>();

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("islpoading");
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
          setError("Postcode not found");
        else
          setResult({
            latitude: Number(results[0].latitude),
            longitude: Number(results[0].longitude),
          });
      })
      .catch((e) => {
        console.error(e);
        setError("Postcode not found");
      })
      .finally(() => setIsLoading(false));
  };

  const reset = () => {
    setIsLoading(false);
    setError(undefined);
  };

  return { isLoading, error, result, submit, reset };
};

export default usePostcodeFilter;
