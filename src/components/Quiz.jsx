import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const navigateToResults = () => {
    const navigate = useNavigate();
    navigate("/results"); // Ici on utilise React Router
  };
  return <div></div>;
};

export default Quiz;
