import axios from "axios";

import { GetPostcodeByIdResponse } from "./models";

const postcodesService = {
  getByPostcode: (postalCode: string) =>
    axios.get<GetPostcodeByIdResponse>(
      `/api/v1/search?apikey=681e0c60-e927-11ed-8b25-ffc2c83e81ed&codes=${postalCode}&country=NL`
    ),
};

export default postcodesService;
