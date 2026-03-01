const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="w-12 h-12 border-4 border-t-yellow-400 border-blue-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
