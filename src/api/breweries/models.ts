export interface Brewery {
  address: string;
  city: string;
  location: {
    lat: number;
    lng: number;
  };
  open:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
  name: string;
  zipcode: string;
}

export interface GetAllResponse {
  breweries: Brewery[];
}
