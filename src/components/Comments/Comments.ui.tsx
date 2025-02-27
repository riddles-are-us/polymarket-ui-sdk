import React, { useState } from "react";

export interface CommentAuthor {
  name: string;
  avatar?: string;
  position?: string;
}

export interface CommentItem {
  id: string;
  author: CommentAuthor;
  content: string;
  timestamp: string;
  likes: number;
  userHasLiked?: boolean;
  replies?: CommentItem[];
}

export interface CommentsUIProps {
  title?: string;
  comments: CommentItem[];
  totalComments: number;
  sortOptions?: Array<{
    label: string;
    value: string;
  }>;
  selectedSort?: string;
  newCommentPlaceholder?: string;
  config?: {
    submitButtonText?: string;
    submitButtonColor?: string;
  };
  onAddComment: (content: string) => void;
  onLikeComment: (commentId: string) => void;
  onSortChange?: (value: string) => void;
  className?: string;
  onReply: (commentId: string, content: string) => void;
}

export const CommentsUI: React.FC<CommentsUIProps> = ({
  title = "Comments",
  comments,
  totalComments,
  sortOptions = [
    { label: "Newest", value: "newest" },
    { label: "Holders", value: "holders" },
  ],
  selectedSort = "newest",
  newCommentPlaceholder = "Add a comment",
  config = {
    submitButtonText: "Post",
    submitButtonColor: "bg-blue-500 hover:bg-blue-600",
  },
  onAddComment,
  onLikeComment,
  onSortChange,
  className = "",
  onReply,
}) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  const renderComment = (comment: CommentItem, isReply = false) => (
    <div key={comment.id} className={`${isReply ? "ml-8" : "border-b dark:border-gray-800"} py-4`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {comment.author.avatar && (
            <img src={comment.author.avatar} alt={comment.author.name} className="w-10 h-10 rounded-full" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-900 dark:text-white">{comment.author.name}</span>
            {comment.author.position && (
              <span className="text-xs text-gray-500 dark:text-gray-400">{comment.author.position}</span>
            )}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">{comment.timestamp}</span>
          <p className="mt-1 text-gray-800 dark:text-gray-200">{comment.content}</p>
          <div className="mt-2 flex items-center space-x-4">
            <button
              onClick={() => onLikeComment(comment.id)}
              className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <span className="mr-1">👍</span>
              {comment.likes}
            </button>
            <button
              onClick={() => onReply(comment.id, "")}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              Reply
            </button>
          </div>
        </div>
      </div>
      {comment.replies?.map((reply) => renderComment(reply, true))}
    </div>
  );

  return (
    <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {title || `Comments (${totalComments})`}
        </h2>
        {sortOptions && (
          <select
            value={selectedSort}
            onChange={(e) => onSortChange?.(e.target.value)}
            className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 
                     rounded-md text-gray-700 dark:text-gray-300 
                     bg-white dark:bg-gray-700"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <div className="flex-1">
            <textarea
              placeholder={newCommentPlaceholder || "Add a comment..."}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 
                       rounded-md text-gray-900 dark:text-white 
                       bg-white dark:bg-gray-700 focus:outline-none 
                       focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
            <button
              onClick={handleSubmit}
              className={`mt-2 px-4 py-2 rounded-md text-white font-medium ${
                config?.submitButtonColor || "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {config?.submitButtonText || "Submit"}
            </button>
          </div>
        </div>

        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-4">
            <img src={comment.author.avatar} alt={comment.author.name} className="w-10 h-10 rounded-full" />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-900 dark:text-white">{comment.author.name}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{comment.author.position}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">• {comment.timestamp}</span>
              </div>
              <p className="mt-1 text-gray-800 dark:text-gray-200">{comment.content}</p>
              <button
                onClick={() => onLikeComment?.(comment.id)}
                className={`mt-2 flex items-center space-x-1 text-sm ${
                  comment.userHasLiked
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                <svg
                  className="w-4 h-4"
                  fill={comment.userHasLiked ? "currentColor" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
                <span>{comment.likes}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
