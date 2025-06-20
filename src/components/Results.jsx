import decodeHTML from "../utils/decodeHTML";

const Results = ({ score, questionsData, userAnswers, onRestart }) => {
  return (
    <div>
      {questionsData.map((question, index) => (
        <div key={index} className="mb-6">
          <h3 className="mb-2 font-semibold">
            {decodeHTML(question.question)}
          </h3>
          <div className="flex flex-wrap gap-2">
            {question.allAnswers.map((answer, i) => {
              const isUserAnswer = userAnswers[index] === answer;
              const isCorrectAnswer = question.correct_answer === answer;

              let buttonStyle =
                "border p-2 min-w-[120px] min-h-[40px] rounded transition-colors duration-150";

              if (isCorrectAnswer) {
                buttonStyle += " bg-green-500 text-white";
              } else if (isUserAnswer) {
                buttonStyle += " bg-red-500 text-white";
              } else {
                buttonStyle += " bg-gray-100";
              }

              return (
                <button key={i} className={buttonStyle} disabled>
                  {decodeHTML(answer)}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <p
        className={`text-center font-bold text-lg max-w-2xl ${
          score <= 1
            ? "bg-red-600"
            : score <= 3
            ? "bg-yellow-500"
            : "bg-green-600"
        }`}
      >
        Your score: {score} / {questionsData.length}
      </p>

      <button
        onClick={onRestart}
        className="mt-10 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded  font-semibold cursor-pointer"
      >
        Create a new quiz
      </button>
    </div>
  );
};

export default Results;
