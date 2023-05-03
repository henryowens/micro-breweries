import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";
import { FormEvent } from "react";

import postcodeFilterStyles from "../styles/postcodeFilter";

interface PostcodeFilterProps {
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  onReset?: () => void;
  loading?: boolean;
  error?: string;
}

const PostcodeFilter: React.FC<PostcodeFilterProps> = ({
  onSubmit,
  loading = false,
  error,
  onReset,
}) => (
  <form onSubmit={onSubmit}>
    <FormControl as={Flex} gap={2} flexDirection="column" isInvalid={!!error}>
      <Flex gap={2}>
        <Input
          id="PostCodeInput"
          size="sm"
          placeholder="Postcode"
          disabled={loading}
          onInput={onReset}
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

export default PostcodeFilter;
