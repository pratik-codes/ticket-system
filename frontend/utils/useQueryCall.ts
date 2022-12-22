import axios from "axios";
import { useQuery } from "react-query";

interface QueryCallArgs {
  apiUrl: string;
  key: string;
  reactQueryConfig: any;
}

export const apiCallService = async (args: QueryCallArgs) => {
  const { apiUrl } = args;

  const res = await axios({
    method: "get",
    url: apiUrl,
  });

  return res?.data?.data?.result;
};

/**
 * @param args:args - { key, apiUrl, reactQueryConfig}
 * @param key:string - key for react-query to store the data on.
 * @param apiUrl:string - base url of the api
 * @param reactQueryConfig:object - config for react-query
 * @returns useQuery
 **/
export const useQueryCall = (args: QueryCallArgs) => {
  const { apiUrl, key, reactQueryConfig } = args;

  return useQuery([key], () => apiCallService({ ...args }), {
    onError: (error) => {
      alert("Something went wrong.. Please try again");
    },
    ...reactQueryConfig,
  });
};
