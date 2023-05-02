export interface GetPostcodeByIdResponse {
  query: {
    codes: string[];
    country: string;
  };
  results: {
    [key: string]: {
      city: string;
      city_en: string;
      country_code: string;
      latitude: string;
      longitude: string;
      postal_code: string;
      province: string;
      province_code: string;
      state: string;
      state_code: string;
      state_en: string;
    }[];
  };
}
