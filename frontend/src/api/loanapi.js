import axios from "axios";
import { getAxiosConfig } from "./axios-config";

export const createLoan = async (loan) => {
  const response = axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/loans/create`,
    loan,
    getAxiosConfig()
  );
  return response.data;
};

export const getLoans = async (projection) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/loans?projection=${projection}`,
    getAxiosConfig()
  );
  return response.data._embedded.loans;
};

export const getMyLoans = async (code) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/loans/user/${code}`,
    getAxiosConfig()
  );
  return response.data;
};

export const updaStateLoan = async (id, status) => {
  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/loans/${id}`,
    {
      loanStatus: status,
    },
    getAxiosConfig()
  );
  return response.data;
};
