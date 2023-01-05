import { style, globalStyle } from "@vanilla-extract/css";

export namespace AppCss {
  export const container = style({
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridGap: 10,
  });
  export const card = style({
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    border: "1px solid #000",
  });
  export const btn = style({
    backgroundColor: "green",
    color: "#fff",
    padding: 10,
    borderRadius: 5,
    border: "none",
    cursor: "pointer",
  });
  export const secondaryText = style({
    color: "#999",
    fontSize: 14,
  });
}

globalStyle("html, body", {
  margin: 0,
  padding: 0,
  backgroundColor: "#ccc",
});
