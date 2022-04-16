import { Link, Typography } from "@mui/material";

export default function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://www.linkedin.com/in/krasimir-shontov/"
        rel="noopener"
        target="_blank"
      >
        Krasimir Shontov
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
