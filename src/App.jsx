import { useState } from "react";
import Welcome from "./components/Welcome";

const App = () => {
  const [currentStep, setCurrentStep] = useState("welcome"); // 'welcome', 'quiz', 'results'
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);

  return <Welcome />;
};

export default App;
