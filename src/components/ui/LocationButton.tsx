import { Button } from "@chakra-ui/react";
import { useState } from "react";

interface LocationButtonProps {
  children: string;
  onUpdate?: (location: { latitude: number; longitude: number }) => void;
}

const LocationButton = ({ children, onUpdate }: LocationButtonProps) => {
  const [loading, setLoading] = useState(false);
  const handleRequestLocation = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        onUpdate && onUpdate({ latitude, longitude });
        setLoading(false);
      },
      () => setLoading(false)
    );
  };
  return (
    <Button
      colorScheme="primary"
      size="sm"
      disabled={loading}
      onClick={handleRequestLocation}
    >
      {children}
    </Button>
  );
};

export default LocationButton;
