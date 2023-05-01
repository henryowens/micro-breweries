import axios from "axios";
import { GetAllResponse } from "./models";

const breweriesService = {
  getAll: () => axios.get<GetAllResponse>("/opdracht/breweries.json"),
};

export default breweriesService;
