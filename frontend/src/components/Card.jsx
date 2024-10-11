import { Card } from "@mui/material";
import { clsx } from "clsx";

export default function CustomCard({ children, className, ...props }) {
  const style = clsx("p-4 rounded-2xl shadow-xl bg-white", className);

  return (
    <Card className={style} {...props}>
      {children}
    </Card>
  );
}
