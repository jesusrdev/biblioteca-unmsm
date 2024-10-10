import axios from "axios"

export const createLoan = async (loan) => {
  const response = axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/loans/create`,
    loan
  )
  return response.data
}

export const getLoans = async (id) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/loans/${id}`)
  return response.data._embedded.loans
}