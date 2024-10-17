import { Button, MenuItem, TextField } from "@mui/material";
import { Entrada } from "../App";

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
        error={!!errors.nombre} // Indica si hay un error
        fullWidth
        helperText={errors.nombre} // Muestra el mensaje de error
        id="nombre"
        key="nombre"
        label="Nombre H∴H∴"
        margin="normal"
        name="nombre"
        onChange={handleInputChange}
        sx={{ color: "#FFF" }}
        type="text"
        value={formData.nombre}
      />

      <TextField
        fullWidth
        id="menu"
        label="Menú"
        margin="normal"
        name="menu"
        onChange={handleInputChange}
        sx={{ color: "#FFF" }}
        value={formData.menu}
      />

      <TextField
        fullWidth
        id="importeMenu"
        label="Importe Menú"
        margin="normal"
        name="importeMenu"
        onChange={handleInputChange}
        sx={{ color: "#FFF" }}
        type="number"
        value={formData.importeMenu || ""}
      />

      <TextField
        fullWidth
        id="bebida"
        label="Bebida"
        margin="normal"
        name="bebida"
        onChange={handleInputChange}
        select
        sx={{ color: "#FFF" }}
        value={formData.bebida}
      >
        <MenuItem value="Agua">Agua</MenuItem>
        <MenuItem value="Gaseosa">Gaseosa</MenuItem>
        <MenuItem value="Vino">Vino</MenuItem>
      </TextField>

      <TextField
        fullWidth
        id="importeBebida"
        label="Importe Bebida"
        margin="normal"
        name="importeBebida"
        onChange={handleInputChange}
        sx={{ color: "#FFF" }}
        type="number"
        value={formData.importeBebida || ""}
      />

      <TextField
        fullWidth
        id="postre"
        label="Postre"
        margin="normal"
        name="postre"
        onChange={handleInputChange}
        sx={{ color: "#FFF" }}
        value={formData.postre}
      />

      <TextField
        fullWidth
        id="importePostre"
        label="Importe Postre"
        margin="normal"
        name="importePostre"
        onChange={handleInputChange}
        sx={{ color: "#FFF" }}
        type="number"
        value={formData.importePostre || ""}
      />

      <TextField
        error={!!errors.metodoPago} // Indica si hay un error
        fullWidth
        helperText={errors.metodoPago} // Muestra el mensaje de error
        id="metodoPago"
        key="metodoPago"
        label="Método de Pago"
        margin="normal"
        name="metodoPago"
        onChange={handleInputChange}
        select
        sx={{ color: "#FFF", fontWeight: "bold" }}
        type="text"
        value={formData.metodoPago}
      >
        <MenuItem value="Efectivo">Efectivo (15% descuento)</MenuItem>
        <MenuItem value="Tarjeta">Tarjeta</MenuItem>
        <MenuItem value="Otro">Otro</MenuItem>
      </TextField>
      <TextField
        fullWidth
        id="estado"
        label="Estado"
        margin="normal"
        name="estado"
        onChange={handleInputChange}
        select
        sx={{ color: "#FFF" }}
        value={formData.estado}
      >
        <MenuItem value="Abono">Abono</MenuItem>
        <MenuItem value="No Abono">No Abono</MenuItem>
      </TextField>
      <Button
        color="primary"
        fullWidth
        onClick={handleAddOrEditEntry}
        sx={{ fontWeight: "bold" }}
        variant="contained"
      >
        {editIndex !== null ? "Guardar Cambios" : "Añadir"}
      </Button>
    </form>
  );
};

export default AgapeForm;
