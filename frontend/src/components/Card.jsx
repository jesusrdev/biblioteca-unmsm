import { Paper } from '@mui/material'
import { clsx } from 'clsx'

export default function Card({ children, className, ...props }) {
  const style = clsx("p-4 rounded-2xl shadow-xl bg-white", className)

  return (
    <Paper className={style} {...props}>
      {children}
    </Paper>
  )
}
