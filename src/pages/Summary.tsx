import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Summary = () => {
  const navigate = useNavigate();

  return (
    <div className="summary">
      <h2>Summary</h2>
      <Button onClick={() => navigate('/')} >Done</Button>
    </div>
  )
};

export default Summary;