import { CommentsUI } from "./Comments.ui";
import { useComments } from "./Comments.script";

export const CommentsWidget = () => {
  const commentsProps = useComments();
  return <CommentsUI {...commentsProps} />;
};
