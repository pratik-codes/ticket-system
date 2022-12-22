import axios from "axios";
import { useMutation } from "react-query";

export const apiCallService = async (args: any) => {
  const { apiUrl, body } = args;

  const res: any = await axios.patch(apiUrl, body);

  return res?.data?.data?.result;
};

export const useMutationCall = (args: any) => {
  const { apiUrl, reactQueryConfig } = args;

  return useMutation(
    (data: any) => {
      return apiCallService({ ...args, body: data });
    },
    {
      onError: (error) => {
        alert("Something went wrong.. Please try again");
      },
      ...reactQueryConfig,
    }
  );
};
