import axios from "axios"

export const createLoan = async (loan) => {
  const response = axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/loans/create`,
    loan
  )
  return response.data
}

export const getLoans = async (projection) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/loans?projection=${projection}`)
  return response.data._embedded.loans
}

export const updaStateLoan = async (id, status) => {
  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/loans/${id}`,
    {
      loanStatus: status,
    }
  )
  return response.data
}