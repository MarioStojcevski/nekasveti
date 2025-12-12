import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppContext } from "../context/AppContext";
import type { Service } from "../types";

interface CartModalProps {
  open: boolean;
  onClose: () => void;
}

const CartModal = ({ open, onClose }: CartModalProps) => {
  const { services, setServices } = useAppContext();

  const updateServiceQuantity = (serviceId: string, increment: boolean) => {
    const existingService = services.find((s: Service) => s.id === serviceId);
    
    if (existingService) {
      if (increment) {
        setServices(
          services.map((s: Service) =>
            s.id === serviceId
              ? { ...s, quantity: (s.quantity || 0) + 1 }
              : s
          )
        );
      } else {
        if (existingService.quantity && existingService.quantity > 1) {
          setServices(
            services.map((s: Service) =>
              s.id === serviceId
                ? { ...s, quantity: (s.quantity || 1) - 1 }
                : s
            )
          );
        } else {
          setServices(services.filter((s: Service) => s.id !== serviceId));
        }
      }
    }
  };

  const removeService = (serviceId: string) => {
    setServices(services.filter((s: Service) => s.id !== serviceId));
  };

  const totalPrice = services.reduce(
    (total, service) => total + service.price * (service.quantity || 1),
    0
  );

  const totalItems = services.reduce(
    (total, service) => total + (service.quantity || 1),
    0
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "20px",
          maxHeight: "90vh",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 2,
          borderBottom: "1px solid #ecf0f1",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#2c3e50",
            fontSize: { xs: "1.25rem", sm: "1.5rem" },
          }}
        >
          Кошничка ({totalItems})
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            color: "#7f8c8d",
            "&:hover": {
              background: "#f8f9fa",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        {services.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 8,
              px: 3,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#7f8c8d",
                mb: 1,
                fontSize: { xs: "1rem", sm: "1.125rem" },
              }}
            >
              Кошничката е празна
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#95a5a6",
                textAlign: "center",
              }}
            >
              Додадете услуги за да продолжите
            </Typography>
          </Box>
        ) : (
          <Box sx={{ p: { xs: 2, sm: 3 } }}>
            {services.map((service, index) => (
              <Box key={service.id}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    py: 2,
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        fontSize: { xs: "1rem", sm: "1.125rem" },
                        color: "#2c3e50",
                        mb: 0.5,
                      }}
                    >
                      {service.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#7f8c8d",
                        fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                        mb: 1.5,
                      }}
                    >
                      {service.price} ден. × {service.quantity || 1}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => updateServiceQuantity(service.id, false)}
                        sx={{
                          border: "1px solid #ecf0f1",
                          color: "#2c3e50",
                          width: "32px",
                          height: "32px",
                          "&:hover": {
                            background: "#f8f9fa",
                            borderColor: "#bdc3c7",
                          },
                        }}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>

                      <Typography
                        sx={{
                          minWidth: "40px",
                          textAlign: "center",
                          fontWeight: 600,
                          color: "#2c3e50",
                          fontSize: "0.875rem",
                        }}
                      >
                        {service.quantity || 1}
                      </Typography>

                      <IconButton
                        size="small"
                        onClick={() => updateServiceQuantity(service.id, true)}
                        sx={{
                          border: "1px solid #ecf0f1",
                          color: "#2c3e50",
                          width: "32px",
                          height: "32px",
                          "&:hover": {
                            background: "#f8f9fa",
                            borderColor: "#bdc3c7",
                          },
                        }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>

                      <IconButton
                        size="small"
                        onClick={() => removeService(service.id)}
                        sx={{
                          ml: "auto",
                          color: "#e74c3c",
                          "&:hover": {
                            background: "#fee",
                          },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#2c3e50",
                      fontSize: { xs: "1rem", sm: "1.125rem" },
                      minWidth: "80px",
                      textAlign: "right",
                    }}
                  >
                    {service.price * (service.quantity || 1)} ден.
                  </Typography>
                </Box>
                {index < services.length - 1 && <Divider />}
              </Box>
            ))}
          </Box>
        )}
      </DialogContent>

      {services.length > 0 && (
        <>
          <Divider />
          <DialogActions
            sx={{
              p: { xs: 2, sm: 3 },
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "#2c3e50",
                  fontSize: { xs: "1.125rem", sm: "1.25rem" },
                }}
              >
                Вкупно:
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  color: "#2c3e50",
                  fontSize: { xs: "1.25rem", sm: "1.5rem" },
                }}
              >
                {totalPrice} ден.
              </Typography>
            </Box>
            <Button
              variant="contained"
              fullWidth
              onClick={onClose}
              sx={{
                background: "#2c3e50",
                borderRadius: "12px",
                padding: { xs: "14px", sm: "16px" },
                fontSize: { xs: "1rem", sm: "1.125rem" },
                fontWeight: 700,
                textTransform: "none",
                color: "white",
                "&:hover": {
                  background: "#34495e",
                },
              }}
            >
              Затвори
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default CartModal;

