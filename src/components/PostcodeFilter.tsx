import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";

import { postcodesService } from "../api";

interface PostcodeFilterProps {
  onUpdate: (location: { latitude: number; longitude: number }) => void;
}

const PostcodeFilter = ({ onUpdate }: PostcodeFilterProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const handlePostCodeSumbit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
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
          onUpdate({
            latitude: Number(results[0].latitude),
            longitude: Number(results[0].longitude),
          });
      })
      .catch((e) => {
        console.error(e);
        setError("Postcode not found");
      })
      .finally(() => setLoading(false));
  };

  return (
    <form onSubmit={handlePostCodeSumbit}>
      <FormControl
        as={Flex}
        gap={2}
        flexDirection="column"
        isInvalid={!!error}
      >
        <Flex gap={2}>
          <Input
            id="PostCodeInput"
            size="sm"
            placeholder="Postcode"
            disabled={loading}
            onInput={() => setError(undefined)}
          />
          <Button type="submit" size="sm" disabled={loading}>
            Search
          </Button>
        </Flex>
        {!!error ? (
          <FormErrorMessage>{error}</FormErrorMessage>
        ) : (
          <FormHelperText
            style={{
              minHeight: "1em",
            }}
          ></FormHelperText>
        )}
      </FormControl>
    </form>
  );
};

export default PostcodeFilter;
