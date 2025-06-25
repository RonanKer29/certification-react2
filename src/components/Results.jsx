import decodeHTML from "../utils/decodeHTML";

const Results = ({ score, questionsData, userAnswers, onRestart }) => {
  return (
    <div>
      {questionsData.map((question, index) => (
        <div key={index} className="mb-8">
          <h3 className="mb-4 font-semibold text-lg">
            {decodeHTML(question.question)}
          </h3>
          <div className="flex flex-wrap gap-3">
            {question.allAnswers.map((answer, i) => {
              const isUserAnswer = userAnswers[index] === answer;
              const isCorrectAnswer = question.correct_answer === answer;

              let buttonClass = `
                px-4 py-3 min-w-[140px] rounded-lg border-2 font-medium
                transition-all duration-200 ease-in-out cursor-not-allowed
              `;

              if (isCorrectAnswer) {
                buttonClass +=
                  " bg-green-600 border-green-600 text-white shadow-lg";
              } else if (isUserAnswer) {
                buttonClass +=
                  " bg-red-600 border-red-600 text-white shadow-lg";
              } else {
                buttonClass += " bg-gray-100 border-gray-200 text-gray-500";
              }

              return (
                <button key={i} className={buttonClass} disabled>
                  {decodeHTML(answer)}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="text-center my-12">
        <p
          className={`
          inline-block px-8 py-4 rounded-lg font-bold text-lg text-white  shadow-lg
          ${
            score <= 1
              ? "bg-gradient-to-r from-red-600 to-red-700"
              : score <= 3
              ? "bg-gradient-to-r from-yellow-500 to-yellow-600"
              : "bg-gradient-to-r from-green-600 to-green-700"
          }
        `}
        >
          Your scored {score} out of {questionsData.length}
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onRestart}
          className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white
                     px-8 py-4 rounded-lg font-semibold text-lg
                     hover:from-indigo-700 hover:to-indigo-800
                     transform hover:scale-105 transition-all duration-200
                     shadow-lg hover:shadow-xl active:scale-95 cursor-pointer"
        >
          Create a new quiz
        </button>
      </div>
    </div>
  );
};

export default Results;
