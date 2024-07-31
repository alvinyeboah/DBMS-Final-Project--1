// components/Discussions.tsx
"use client";
import { useEffect, useState } from 'react';

interface Discussion {
  discussion_id: number;
  course_id: number;
  title: string;
  content: string;
  created_by: number;
  created_at: string;
}

interface Reply {
  reply_id: number;
  discussion_id: number;
  staff_id: number;
  content: string;
  created_at: string;
}

export default function Discussions() {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [selectedDiscussion, setSelectedDiscussion] = useState<number | null>(null);
  const [replyText, setReplyText] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);

  // Fetch discussions
  const fetchDiscussions = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/discussions');
      const data = await response.json();
      setDiscussions(data);
    } catch (error) {
      console.error('Error fetching discussions:', error);
    }
  };

  // Fetch replies
  const fetchReplies = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/replies');
      const data = await response.json();
      setReplies(data);
    } catch (error) {
      console.error('Error fetching replies:', error);
    }
  };

  // Submit a reply
  const submitReply = async () => {
    if (selectedDiscussion === null) {
      setMessage('Please select a discussion.');
      return;
    }
    try {
      const response = await fetch('http://localhost:5001/api/replies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          discussion_id: selectedDiscussion,
          staff_id: 1, // Replace with actual staff ID
          content: replyText,
          created_at: new Date().toISOString().split('T')[0],
        }),
      });
      if (response.ok) {
        setMessage('Reply submitted successfully!');
        fetchReplies(); // Refresh replies
        setReplyText(''); // Clear input
        setSelectedDiscussion(null); // Reset selection
      } else {
        setMessage('Error submitting reply.');
      }
    } catch (error) {
      console.error('Error submitting reply:', error);
      setMessage('Error submitting reply.');
    }
  };

  useEffect(() => {
    fetchDiscussions();
    fetchReplies();
  }, []);

  return (
    <div className="p-6 z-40">
      <h1 className="text-2xl font-bold mb-4">Discussions</h1>
      {message && <p className="mb-4 text-green-500">{message}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {discussions.map((discussion) => (
          <div key={discussion.discussion_id} className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{discussion.title}</h2>
            <p className="text-sm text-gray-600 mb-4">{discussion.content}</p>
            <p className="text-sm text-gray-500">Created by: Staff ID {discussion.created_by}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
              onClick={() => setSelectedDiscussion(discussion.discussion_id)}
            >
              Reply
            </button>
          </div>
        ))}
      </div>

      {selectedDiscussion !== null && (
        <div className="bg-white p-6 shadow rounded-lg mt-8">
          <h2 className="text-xl font-semibold mb-4">Add Reply</h2>
          <textarea
            className="w-full p-2 border border-gray-300 rounded mb-4"
            rows={4}
            placeholder="Write your reply here..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={submitReply}
          >
            Submit Reply
          </button>
        </div>
      )}

      <h2 className="text-xl font-semibold mt-8 mb-4">Replies</h2>
      <div className="bg-white p-4 shadow rounded-lg">
        {replies.length > 0 ? (
          <ul>
            {replies.map((reply) => (
              <li key={reply.reply_id} className="mb-2">
                Discussion ID: {reply.discussion_id} - Staff ID: {reply.staff_id} - {reply.content}
              </li>
            ))}
          </ul>
        ) : (
          <p>No replies yet.</p>
        )}
      </div>
    </div>
  );
}
