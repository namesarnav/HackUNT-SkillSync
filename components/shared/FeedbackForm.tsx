'use client';

import { useState } from 'react';

interface FeedbackFormProps {
  sessionId: string;
  role: 'teacher' | 'student';
}

export function FeedbackForm({ sessionId, role }: FeedbackFormProps) {
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');

  const submitFeedback = () => {
    // In a real app, send feedback to the server
    console.log({ sessionId, rating, feedback });
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {role === 'teacher' ? 'Student Feedback' : 'Session Feedback'}
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl ${
                    star <= rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Comments
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
              placeholder="Share your thoughts about the session..."
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={submitFeedback}
            className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
}