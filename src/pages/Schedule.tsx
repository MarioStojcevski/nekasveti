import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Schedule = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Schedule Page</h1>
      <p>This is the schedule page content.</p>
      <Button onClick={() => navigate('/summary')} >Next</Button>
    </div>
  );
};

export default Schedule;