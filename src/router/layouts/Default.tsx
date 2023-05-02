import { Image, Text, Flex } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

const DefaultLayout = ({ children }: PropsWithChildren) => (
  <div className="default-layout">
    <Flex alignItems="center" gap={2} paddingBottom={7}>
      <Image src="/logo.png" width="40px" height="40px" alt="Logo for site" />
      <Text color="gray.700" fontWeight="bold">
        MICRO BREWERIES
      </Text>
    </Flex>
    {children}
  </div>
);

export default DefaultLayout;
