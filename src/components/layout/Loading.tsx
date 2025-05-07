import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center backdrop-blur-md absolute top-0 left-0">
    <div className="w-12 h-12 border-4 border-pink-950 border-dashed rounded-full animate-spin" />
  </div>
  );
};

export default Loading;