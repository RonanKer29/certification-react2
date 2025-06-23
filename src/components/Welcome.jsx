import CategorySelect from "./CategorySelect";
import DifficultySelect from "./DifficultySelect";

const Welcome = ({
  onStart,
  isLoading,
  selectedCategory,
  setSelectedCategory,
  selectedDifficulty,
  setSelectedDifficulty,
  quizStarted,
}) => {
  const handleStart = () => {
    if (!isLoading) {
      onStart(selectedCategory, selectedDifficulty);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Welcome to the Quiz
      </h1>
      <div className="flex mt-4 gap-4 w-full items-center">
        <CategorySelect
          selectedCategory={selectedCategory}
          onChange={setSelectedCategory}
          quizStarted={quizStarted}
        />
        <DifficultySelect
          selectedDifficulty={selectedDifficulty}
          onChange={setSelectedDifficulty}
          quizStarted={quizStarted}
        />
        <div className="w-1/3 mb-4">
          <button
            id="createBtn"
            onClick={handleStart}
            disabled={isLoading || quizStarted}
            className={`w-full h-full font-semibold py-2 px-4 rounded transition-colors duration-200 ${
              quizStarted
                ? "bg-gray-200 text-white cursor-not-allowed"
                : isLoading
                ? "bg-indigo-400 text-white opacity-50 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 cursor-pointer"
            }`}
          >
            {isLoading
              ? "Loading..."
              : quizStarted
              ? "Quiz in progress"
              : "Start Quiz"}
          </button>
        </div>
      </div>
      {quizStarted && (
        <p className="mt-2 text-sm text-amber-600 text-center font-medium">
          Quiz started — answer all questions below and click on the submit
          button to verify your answers
        </p>
      )}
    </div>
  );
};

export default Welcome;
