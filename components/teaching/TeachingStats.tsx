// components/teaching/TeachingStats.tsx
"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface TeachingStatsProps {
  timeFrame?: "week" | "month" | "year";
}

export function TeachingStats({ timeFrame = "month" }: TeachingStatsProps) {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState(timeFrame);

  // Sample data - in a real app, this would come from your API
  const earningsData = [
    { date: "Oct 20", amount: 120 },
    { date: "Oct 21", amount: 180 },
    { date: "Oct 22", amount: 150 },
    { date: "Oct 23", amount: 200 },
    { date: "Oct 24", amount: 160 },
    { date: "Oct 25", amount: 140 },
    { date: "Oct 26", amount: 190 },
  ];

  const stats = [
    {
      name: "Total Students",
      value: "45",
      change: "+5%",
      changeType: "increase",
      description: "Active students this month",
    },
    {
      name: "Hours Taught",
      value: "128",
      change: "+12%",
      changeType: "increase",
      description: "Teaching hours this month",
    },
    {
      name: "Avg. Rating",
      value: "4.8",
      change: "+0.2",
      changeType: "increase",
      description: "Based on student feedback",
    },
    {
      name: "Earnings",
      value: "$1,280",
      change: "+15%",
      changeType: "increase",
      description: "Total earnings this month",
    },
  ];

  const timeFrameOptions = [
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
    { value: "year", label: "Year" },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
          >
            <dt>
              <div className="absolute rounded-md p-3">
                {/* You can add icons here */}
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                {stat.name}
              </p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  stat.changeType === "increase"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {stat.change}
              </p>
              <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm text-gray-500">{stat.description}</div>
              </div>
            </dd>
          </div>
        ))}
      </div>

      {/* Earnings Chart */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">
            Earnings Overview
          </h3>
          <div className="flex space-x-2">
            {timeFrameOptions.map((option) => (
              <button
                key={option.value}
                onClick={() =>
                  setSelectedTimeFrame(
                    option.value as "week" | "month" | "year"
                  )
                }
                className={`px-3 py-1 text-sm rounded-md ${
                  selectedTimeFrame === option.value
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={earningsData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Reviews */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Recent Reviews
        </h3>
        <div className="space-y-4">
          {[
            {
              student: "Alice Johnson",
              rating: 5,
              comment: "Excellent teacher, very patient and knowledgeable!",
              date: "2 days ago",
            },
            {
              student: "Bob Smith",
              rating: 4,
              comment:
                "Great session, helped me understand React hooks better.",
              date: "5 days ago",
            },
          ].map((review, index) => (
            <div
              key={index}
              className="border-b border-gray-200 last:border-0 pb-4 last:pb-0"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center">
                    <span className="text-lg font-medium text-gray-900">
                      {review.student}
                    </span>
                    <span className="ml-2 text-yellow-400">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{review.comment}</p>
                </div>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
