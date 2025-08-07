"use client";

import { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Stack,
  Divider,
  Box,
} from "@mui/material";

interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: string;
  replies?: Comment[];
}

export default function CommentsSection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      author: "Anonymous",
      content: newComment.trim(),
      timestamp: new Date().toLocaleString(),
      replies: [],
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  const handleAddReply = (parentId: number, replyContent: string) => {
    if (!replyContent.trim()) return;

    const addReplyRecursively = (comments: Comment[]): Comment[] => {
      return comments.map((comment) => {
        if (comment.id === parentId) {
          const reply: Comment = {
            id: Date.now(),
            author: "Anonymous",
            content: replyContent,
            timestamp: new Date().toLocaleString(),
            replies: [],
          };
          return {
            ...comment,
            replies: [reply, ...(comment.replies || [])],
          };
        }

        return {
          ...comment,
          replies: comment.replies ? addReplyRecursively(comment.replies) : [],
        };
      });
    };

    setComments((prev) => addReplyRecursively(prev));
  };
console.log(comments,'comments')
  return (
    <Stack spacing={2} sx={{ mt: 4 }}>
      <Typography variant="h6">{comments.length} Comments</Typography>

      <Stack direction="row" spacing={2}>
        <TextField
          fullWidth
          size="small"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddComment}>
          Comment
        </Button>
      </Stack>

      <Divider />

      <CommentList comments={comments} onReply={handleAddReply} />
    </Stack>
  );
}

// 🔁 Recursive Component
function CommentList({
  comments,
  onReply,
}: {
  comments: Comment[];
  onReply: (parentId: number, replyContent: string) => void;
}) {
  return (
    <Stack spacing={2}>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} onReply={onReply} />
      ))}
    </Stack>
  );
}

function CommentItem({
  comment,
  onReply,
}: {
  comment: Comment;
  onReply: (parentId: number, replyContent: string) => void;
}) {
  const [replying, setReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReply = () => {
    if (!replyText.trim()) return;
    onReply(comment.id, replyText);
    setReplying(false);
    setReplyText("");
  };

  return (
    <Box sx={{ pl: 2 }}>
      <Typography variant="subtitle2">
        {comment.author} • {comment.timestamp}
      </Typography>
      <Typography variant="body2">{comment.content}</Typography>

      <Button
        size="small"
        onClick={() => setReplying((prev) => !prev)}
        sx={{ textTransform: "none", mt: 1 }}
      >
        {replying ? "Cancel" : "Reply"}
      </Button>

      {replying && (
        <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
          <TextField
            size="small"
            fullWidth
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
          />
          <Button variant="outlined" onClick={handleReply}>
            Reply
          </Button>
        </Stack>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <Box sx={{ mt: 2, pl: 2, borderLeft: "1px solid #ccc" }}>
          <CommentList comments={comment.replies} onReply={onReply} />
        </Box>
      )}
    </Box>
  );
}
