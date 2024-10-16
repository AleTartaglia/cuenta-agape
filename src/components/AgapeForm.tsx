import { Button, MenuItem, TextField } from "@mui/material";
import { Entrada } from "../App";

// Función para capitalizar la primera letra de cada palabra
const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

interface AgapeFormProps {
  formData: Entrada;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleAddOrEditEntry: () => void;
  editIndex: number | null;
  errors: { nombre?: string; metodoPago?: string }; // Prop para errores
}

const AgapeForm = ({
  formData,
  handleInputChange,
  handleAddOrEditEntry,
  editIndex,
  errors,
}: AgapeFormProps) => {
  return (
    <form noValidate autoComplete="off">
      <TextField
        key="nombre"
        id="nombre"
        name="nombre"
        label="Nombre"
        type="text"
        value={formData.nombre}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        error={!!errors.nombre} // Indica si hay un error
        helperText={errors.nombre} // Muestra el mensaje de error
      />

      <TextField
        id="menu"
        name="menu"
        label="Menú"
        value={formData.menu}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        sx={{ color: "#FFF" }}
      />

      <TextField
        id="importeMenu"
        name="importeMenu"
        label="Importe Menú"
        type="number"
        value={formData.importeMenu}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        sx={{ color: "#FFF" }}
      />

      <TextField
        name="bebida"
        id="bebida"
        label="Bebida"
        select
        value={formData.bebida}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        sx={{ color: "#FFF" }}
      >
        <MenuItem value="Agua">Agua</MenuItem>
        <MenuItem value="Gaseosa">Gaseosa</MenuItem>
        <MenuItem value="Vino">Vino</MenuItem>
      </TextField>

      <TextField
        id="importeBebida"
        name="importeBebida"
        label="Importe Bebida"
        type="number"
        value={formData.importeBebida}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        sx={{ color: "#FFF" }}
      />

      <TextField
        id="postre"
        name="postre"
        label="Postre"
        value={formData.postre}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        sx={{ color: "#FFF" }}
      />

      <TextField
        id="importePostre"
        name="importePostre"
        label="Importe Postre"
        type="number"
        value={formData.importePostre}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        sx={{ color: "#FFF" }}
      />

      <TextField
        key="metodoPago"
        id="metodoPago"
        name="metodoPago"
        label="Método de Pago"
        type="text"
        value={formData.metodoPago}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        select
        error={!!errors.metodoPago} // Indica si hay un error
        helperText={errors.metodoPago} // Muestra el mensaje de error
      >
        <MenuItem value="Efectivo">Efectivo (15% descuento)</MenuItem>
        <MenuItem value="Tarjeta">Tarjeta</MenuItem>
        <MenuItem value="Otro">Otro</MenuItem>
      </TextField>
      <TextField
        id="estado"
        name="estado"
        label="Estado"
        select
        value={formData.estado}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        sx={{ color: "#FFF" }}
      >
        <MenuItem value="Abono">Abono</MenuItem>
        <MenuItem value="No Abono">No Abono</MenuItem>
      </TextField>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddOrEditEntry}
        fullWidth
      >
        {editIndex !== null ? "Guardar Cambios" : "Añadir"}
      </Button>
    </form>
  );
};

export default AgapeForm;
