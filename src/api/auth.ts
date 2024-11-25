import axios from "axios";
import { SERVER_URL } from "@/configs";

export type PartyResponse = {
  id: number;
  createdAt: string;
  name: string;
  queuePosition: number;
  size: number;
  status: string;
};

export const autoLogin = () => {
  return axios<PartyResponse>({
    method: "get",
    url: `${SERVER_URL}/parties/current`,
    withCredentials: true,
  });
};
