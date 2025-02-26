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
}) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  return (
    <div className={`bg-gray-900 p-6 rounded-lg ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">
          {title} ({totalComments})
        </h2>
        {sortOptions.length > 0 && (
          <div className="flex space-x-2">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onSortChange?.(option.value)}
                className={`text-gray-400 hover:text-white ${selectedSort === option.value ? "text-white" : ""}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={newCommentPlaceholder}
            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className={`absolute right-2 top-2 px-4 py-1 ${config.submitButtonColor} text-white rounded`}
          >
            {config.submitButtonText}
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                {comment.author.avatar && (
                  <img src={comment.author.avatar} alt={comment.author.name} className="w-10 h-10 rounded-full" />
                )}
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-white">{comment.author.name}</span>
                    {comment.author.position && (
                      <span className="text-sm text-gray-400">{comment.author.position}</span>
                    )}
                  </div>
                  <span className="text-sm text-gray-400">{comment.timestamp}</span>
                </div>
              </div>
              <button
                onClick={() => onLikeComment(comment.id)}
                className={`flex items-center space-x-1 ${
                  comment.userHasLiked ? "text-blue-500" : "text-gray-400 hover:text-blue-500"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill={comment.userHasLiked ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
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
            <p className="mt-2 text-white">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
