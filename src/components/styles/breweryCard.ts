import { css } from "@emotion/react";

const cardStyles = {
  card: css({
    borderWidth: "1px",
  }),
  header: css({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  }),
  body: css({
    flex: "inherit",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
};

export default cardStyles;
