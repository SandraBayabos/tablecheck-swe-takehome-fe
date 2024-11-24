import axios from "axios";
import { SERVER_URL } from "@/configs";

export const createParty = async (data: { name: string; size: number }) => {
  return axios.post(`${SERVER_URL}/parties`, data, { withCredentials: true });
};

export const checkInParty = async () => {
  return axios.put(
    `${SERVER_URL}/parties/check_in`,
    {},
    { withCredentials: true }
  );
};
