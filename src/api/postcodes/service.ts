import axios from "axios";

import { GetPostcodeByIdResponse } from "./models";

const postcodesService = {
  getByPostcode: (postalCode: string) =>
    axios.get<GetPostcodeByIdResponse>(
      `/api/v1/search?apikey=${process.env.REACT_APP_POSTCODE_API_KEY}&codes=${postalCode}&country=NL`
    ),
};

export default postcodesService;
