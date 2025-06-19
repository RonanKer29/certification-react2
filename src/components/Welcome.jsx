const Welcome = ({ onStartQuiz }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-2xl border border-gray-300 max-w-xl w-full p-8 space-y-6">
        <h1 className="text-4xl font-extrabold text-indigo-600 text-center">
          Welcome to the Quiz
        </h1>
      </div>
    </div>
  );
};

export default Welcome;
