import React from "react";

const Loading: React.FC = React.memo(() => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
      <div className="w-12 h-12 border-4 border-pink-950 border-dashed rounded-full animate-spin" />
    </div>
  );
});

export default Loading;
