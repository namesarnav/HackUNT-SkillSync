"use client";

import { useState } from "react";

export function AvailabilityCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
  ];

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">Availability</h2>
        <div className="flex space-x-2">
          <button className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm">
            Week
          </button>
          <button className="bg-white text-gray-600 px-3 py-1 rounded-md text-sm">
            Month
          </button>
        </div>
      </div>

      <div className="grid grid-cols-8 gap-2">
        {/* Time slots column */}
        <div className="col-span-1">
          <div className="h-10"></div> {/* Header spacing */}
          {timeSlots.map((time) => (
            <div
              key={time}
              className="h-12 flex items-center justify-end pr-2 text-sm text-gray-500"
            >
              {time}
            </div>
          ))}
        </div>

        {/* Days columns */}
        {Array.from({ length: 7 }).map((_, dayIndex) => (
          <div key={dayIndex} className="col-span-1">
            <div className="h-10 flex items-center justify-center font-medium text-gray-900">
              {new Date(
                selectedDate.getTime() + dayIndex * 24 * 60 * 60 * 1000
              ).toLocaleDateString("en-US", { weekday: "short" })}
            </div>
            {timeSlots.map((time, timeIndex) => (
              <div
                key={`${dayIndex}-${timeIndex}`}
                className="h-12 border border-gray-100 rounded-md hover:bg-blue-50 cursor-pointer"
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
