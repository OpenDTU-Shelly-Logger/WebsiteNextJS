import React from "react";

type Props = {
  text: string;
};

export default function SectionHeadline({ text }: Props) {
  return <div style={{ fontSize: "24px", marginTop: 80 }}>{text}</div>;
}
