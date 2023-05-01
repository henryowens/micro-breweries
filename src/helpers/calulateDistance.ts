import { toRadians } from "./";

interface Location {
  latitude: number;
  longitude: number;
}

const calculateDistance = (location1: Location, location2: Location) => {
  const earthRadius = 6371; // km
  const latDiff = toRadians(location2.latitude - location1.latitude);
  const lonDiff = toRadians(location2.longitude - location1.longitude);
  const a =
    Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
    Math.cos(toRadians(location1.latitude)) *
      Math.cos(toRadians(location2.latitude)) *
      Math.sin(lonDiff / 2) *
      Math.sin(lonDiff / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;
  return distance;
};

export default calculateDistance;
