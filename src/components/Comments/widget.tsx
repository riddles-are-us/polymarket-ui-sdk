import React from "react";
import { CommentsUI } from "./Comments.ui";
import { useComments } from "./Comments.script";

export const CommentsWidget: React.FC = () => {
  const commentsProps = useComments();
  return <CommentsUI {...commentsProps} />;
};
