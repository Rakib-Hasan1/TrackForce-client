// LoadingEffect.jsx
import React from "react";

const LoadingEffect = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col items-center space-y-4">
        {/* Animated Dots */}
        <div className="flex space-x-2">
          <span className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></span>
          <span className="w-4 h-4 bg-blue-600 rounded-full animate-bounce delay-150"></span>
          <span className="w-4 h-4 bg-blue-600 rounded-full animate-bounce delay-300"></span>
        </div>

        {/* Loading Text */}
        <p className="text-gray-600 dark:text-gray-300 font-medium text-lg tracking-wide">
          Loading <span className="font-bold text-blue-600">TrackForce</span>...
        </p>
      </div>
    </div>
  );
};

export default LoadingEffect;
