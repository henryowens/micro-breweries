import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";

import { postcodesService } from "../../api";
import postcodeFilterStyles from "../styles/postcodeFilter";

interface PostcodeFilterProps {
  onUpdate?: (location: { latitude: number; longitude: number }) => void;
  onLoadingUpdate?: (loading: boolean) => void;
}

const PostcodeFilter: React.FC<PostcodeFilterProps> = ({
  onUpdate,
  onLoadingUpdate,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const updateLoading = (isLoading: boolean) => {
    onLoadingUpdate && onLoadingUpdate(isLoading);
    setLoading(isLoading);
  };

  const handlePostCodeSumbit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateLoading(true);
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
          onUpdate &&
            onUpdate({
              latitude: Number(results[0].latitude),
              longitude: Number(results[0].longitude),
            });
      })
      .catch((e) => {
        console.error(e);
        setError("Postcode not found");
      })
      .finally(() => updateLoading(false));
  };

  return (
    <form onSubmit={handlePostCodeSumbit}>
      <FormControl as={Flex} gap={2} flexDirection="column" isInvalid={!!error}>
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
          <FormHelperText css={postcodeFilterStyles.error}></FormHelperText>
        )}
      </FormControl>
    </form>
  );
};

export default PostcodeFilter;
