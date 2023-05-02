import { Image, Text, Flex } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { PropsWithChildren } from "react";

const DefaultLayout = ({ children }: PropsWithChildren) => (
  <Flex
    className="default-layout"
    flexDirection="column"
    css={css({
      minHeight: "calc(100vh - 50px)",
    })}
  >
    <Flex alignItems="center" gap={2} paddingBottom={7}>
      <Image src="/logo.png" width="40px" height="40px" alt="Logo for site" />
      <Text color="gray.700" fontWeight="bold">
        MICRO BREWERIES
      </Text>
    </Flex>
    {children}
  </Flex>
);

export default DefaultLayout;
