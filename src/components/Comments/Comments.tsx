import React, { useState } from "react";

export interface Comment {
  id: string;
  author: {
    name: string;
    avatar?: string;
    position?: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  userHasLiked?: boolean;
}

export interface CommentsProps {
  comments: Comment[];
  onAddComment: (content: string) => void;
  onLikeComment: (commentId: string) => void;
  totalComments: number;
}

export const Comments: React.FC<CommentsProps> = ({ comments, onAddComment, onLikeComment, totalComments }) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">Comments ({totalComments})</h2>
        <div className="flex space-x-2">
          <button className="text-gray-400 hover:text-white">Newest</button>
          <button className="text-gray-400 hover:text-white">Holders</button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment"
            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="absolute right-2 top-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Post
          </button>
        </div>
      </form>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-4">
            {comment.author.avatar ? (
              <img src={comment.author.avatar} alt={comment.author.name} className="w-10 h-10 rounded-full" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white">
                {comment.author.name[0]}
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-medium text-white">{comment.author.name}</span>
                {comment.author.position && <span className="text-gray-400 text-sm">{comment.author.position}</span>}
                <span className="text-gray-500 text-sm">{comment.timestamp}</span>
              </div>
              <p className="text-gray-300 mb-2">{comment.content}</p>
              <button
                onClick={() => onLikeComment(comment.id)}
                className={`flex items-center space-x-1 ${
                  comment.userHasLiked ? "text-blue-500" : "text-gray-400"
                } hover:text-blue-500`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
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
          </div>
        ))}
      </div>
    </div>
  );
};
