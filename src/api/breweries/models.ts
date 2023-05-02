export type DaysOfTheWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface Brewery {
  address: string;
  city: string;
  location: {
    lat: number;
    lng: number;
  };
  open: DaysOfTheWeek[];
  name: string;
  zipcode: string;
}

export interface GetAllResponse {
  breweries: Brewery[];
}
