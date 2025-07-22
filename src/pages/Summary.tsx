import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { Service } from "../types";
import { useAppContext } from "../context/AppContext";

const Summary = () => {
  const navigate = useNavigate();
  const { services } = useAppContext();

  return (
    <div className="summary">
      <h2>Summary</h2>

      <ul>
        {services.map((service: Service) => (
          <li key={service.id}>
            {service.name} - {service.description} - ${service.price} - {service.duration} mins
          </li>
        ))}
      </ul>

      <Button onClick={() => navigate('/')} >Done</Button>
    </div>
  )
};

export default Summary;