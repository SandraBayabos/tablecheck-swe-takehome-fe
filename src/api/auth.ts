import axios from "axios";
import { SERVER_URL } from "@/configs";

export const autoLogin = () => {
  return axios({
    method: "get",
    url: `${SERVER_URL}/parties/current`,
    withCredentials: true,
  });
};
