const DifficultySelect = ({ selectedDifficulty, onChange, quizStarted }) => {
  return (
    <div className="mb-4 w-1/3">
      <select
        id="difficultySelect"
        value={selectedDifficulty}
        onChange={(e) => onChange(e.target.value)}
        className={`border rounded px-3 py-2 w-full  ${
          quizStarted ? "cursor-not-allowed" : ""
        }`}
        disabled={quizStarted}
      >
        <option value="" disabled>
          Select a difficulty
        </option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  );
};

export default DifficultySelect;
