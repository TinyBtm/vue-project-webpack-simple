import axios from "@/utils/AxiosRequsest";

// eslint-disable-next-line import/prefer-default-export
export const main = (data) =>
  axios.request({
    url: "/",
    method: "get",
    data,
  });
