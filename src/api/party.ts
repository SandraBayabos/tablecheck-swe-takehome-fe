import axios from "axios";
import { SERVER_URL } from "@/configs";
import { PartyResponse } from "./auth";

export const createParty = async (data: { name: string; size: number }) => {
  return axios.post<PartyResponse>(`${SERVER_URL}/parties`, data, {
    withCredentials: true,
  });
};

export const checkInParty = async () => {
  return axios.put(
    `${SERVER_URL}/parties/check_in`,
    {},
    { withCredentials: true }
  );
};

export const deleteParty = async () => {
  return axios.delete(`${SERVER_URL}/parties/delete`, { withCredentials: true });
};
