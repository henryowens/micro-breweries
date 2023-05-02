import { Button } from "@chakra-ui/react";
import { useState } from "react";

interface LocationButtonProps {
  children: string;
  onUpdate?: (location: { latitude: number; longitude: number }) => void;
  onLoadingUpdate?: (loading: boolean) => void;
}

const LocationButton: React.FC<LocationButtonProps> = ({
  children,
  onUpdate,
  onLoadingUpdate,
}) => {
  const [loading, setLoading] = useState(false);
  const updateLoading = (isLoading: boolean) => {
    onLoadingUpdate && onLoadingUpdate(isLoading);
    setLoading(isLoading);
  };
  const handleRequestLocation = () => {
    updateLoading(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        onUpdate && onUpdate({ latitude, longitude });
        updateLoading(false);
      },
      () => updateLoading(false)
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
