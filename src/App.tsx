import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import localforage from "localforage";

// Definir estructura de una entrada
interface Entrada {
  nombre: string;
  menu: string;
  importeMenu: number;
  bebida: string;
  importeBebida: number;
  postre: string;
  importePostre: number;
  metodoPago: string;
  total: number;
  estado: string;
}

const App: React.FC = () => {
  const [entradas, setEntradas] = useState<Entrada[]>([]);
  const [formData, setFormData] = useState({
    nombre: "",
    menu: "",
    importeMenu: 0,
    bebida: "",
    importeBebida: 0,
    postre: "",
    importePostre: 0,
    metodoPago: "",
    estado: "",
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [totalMesa, setTotalMesa] = useState<number>(0);

  // Función para actualizar el estado del formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Función para añadir o editar una entrada en la tabla
  const handleAddOrEditEntry = () => {
    const importeMenu = +formData.importeMenu || 0;
    const importeBebida = +formData.importeBebida || 0;
    const importePostre = +formData.importePostre || 0;

    const total = importeMenu + importeBebida + importePostre;
    const totalConDescuento =
      formData.metodoPago === "Efectivo" ? total * 0.85 : total;

    const nuevaEntrada: Entrada = {
      nombre: formData.nombre,
      menu: formData.menu,
      importeMenu: importeMenu,
      bebida: formData.bebida,
      importeBebida: importeBebida,
      postre: formData.postre,
      importePostre: importePostre,
      metodoPago: formData.metodoPago,
      total: totalConDescuento,
      estado: formData.estado,
    };

    const nuevasEntradas = [...entradas];
    if (editIndex !== null) {
      nuevasEntradas[editIndex] = nuevaEntrada;
      setEditIndex(null);
    } else {
      nuevasEntradas.push(nuevaEntrada);
    }

    setEntradas(nuevasEntradas);
    localforage.setItem("entradas", nuevasEntradas).catch(console.error); // Manejar errores
    calcularTotalMesa(nuevasEntradas);

    // Limpiar los campos del formulario
    setFormData({
      nombre: "",
      menu: "",
      importeMenu: 0,
      bebida: "",
      importeBebida: 0,
      postre: "",
      importePostre: 0,
      metodoPago: "",
      estado: "",
    });
  };

  // Función para eliminar una entrada
  const handleDeleteEntry = (index: number) => {
    const nuevasEntradas = entradas.filter((_, i) => i !== index);
    setEntradas(nuevasEntradas);
    localforage.setItem("entradas", nuevasEntradas).catch(console.error);
    calcularTotalMesa(nuevasEntradas);
  };

  // Función para editar una entrada
  const handleEditEntry = (index: number) => {
    const entrada = entradas[index];
    setFormData({
      nombre: entrada.nombre,
      menu: entrada.menu,
      importeMenu: entrada.importeMenu,
      bebida: entrada.bebida,
      importeBebida: entrada.importeBebida,
      postre: entrada.postre,
      importePostre: entrada.importePostre,
      metodoPago: entrada.metodoPago,
      estado: entrada.estado,
    });
    setEditIndex(index);
  };

  // Función para limpiar todas las entradas
  const handleClearEntries = () => {
    setEntradas([]);
    localforage.setItem("entradas", []).catch(console.error);
    setTotalMesa(0);
  };

  // Función para calcular el total de la mesa
  const calcularTotalMesa = (entradas: Entrada[]) => {
    const total = entradas.reduce((acc, entrada) => acc + entrada.total, 0);
    setTotalMesa(total);
  };

  // Cargar entradas al iniciar la app
  useEffect(() => {
    localforage
      .getItem<Entrada[]>("entradas")
      .then((savedEntries) => {
        if (savedEntries) {
          setEntradas(savedEntries);
          calcularTotalMesa(savedEntries);
        }
      })
      .catch(console.error); // Manejar errores de carga

    // Aplicar el color de fondo oscuro al body
    document.body.style.backgroundColor = "#171F24";
  }, []);

  // Tema oscuro por defecto
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "#1e272e",
        paper: "#1e272e",
      },
      text: {
        primary: "#ffffff",
        secondary: "#FFF",
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <Typography
          variant="h4"
          gutterBottom
          color="#FFF"
          sx={{ display: "flex", alignItems: "center", paddingTop: "10px" }}
        >
          Cuenta Ágape
          <img
            style={{ marginLeft: "5px" }}
            alt="agapeLogo"
            src={`${process.env.PUBLIC_URL}/agape.png`}
            width="52"
          />
        </Typography>

        <form noValidate autoComplete="off">
          <TextField
            id="nombre"
            name="nombre"
            label="Nombre HH"
            value={formData.nombre}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            sx={{ color: "#FFF" }}
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
            id="metodoPago"
            name="metodoPago"
            label="Método de Pago"
            select
            value={formData.metodoPago}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            sx={{ color: "#FFF" }}
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

        <TableContainer component={Paper} sx={{ marginTop: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Menú</TableCell>
                <TableCell>Importe Menú</TableCell> {/* Nueva columna */}
                <TableCell>Bebida</TableCell>
                <TableCell>Importe Bebida</TableCell> {/* Nueva columna */}
                <TableCell>Postre</TableCell>
                <TableCell>Importe Postre</TableCell> {/* Nueva columna */}
                <TableCell>Método de Pago</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entradas.map((entrada, index) => (
                <TableRow key={index}>
                  <TableCell>{entrada.nombre}</TableCell>
                  <TableCell>{entrada.menu}</TableCell>
                  <TableCell>{entrada.importeMenu.toFixed(2)}</TableCell>{" "}
                  {/* Mostrar importe menú */}
                  <TableCell>{entrada.bebida}</TableCell>
                  <TableCell>{entrada.importeBebida.toFixed(2)}</TableCell>{" "}
                  {/* Mostrar importe bebida */}
                  <TableCell>{entrada.postre}</TableCell>
                  <TableCell>{entrada.importePostre.toFixed(2)}</TableCell>{" "}
                  {/* Mostrar importe postre */}
                  <TableCell>{entrada.metodoPago}</TableCell>
                  <TableCell>{entrada.total.toFixed(2)}</TableCell>
                  <TableCell>{entrada.estado}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditEntry(index)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteEntry(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography
          variant="h4"
          gutterBottom
          color="#FFF"
          sx={{ marginTop: 3 }}
        >
          Total de la mesa: ${totalMesa.toFixed(2)}
        </Typography>

        <Button
          variant="contained"
          color="warning"
          onClick={handleClearEntries}
          fullWidth
          sx={{ marginTop: 2, marginBottom: 2 }}
        >
          Limpiar Todo
        </Button>
      </Container>
      <Typography
        gutterBottom
        color="#FFF"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          fontSize: "12px",
        }}
      >
        <p>Copyright &copy; Giordano Bruno Nº 38 </p>
        <p> Powered by Alejandro Tartaglia M∴M∴</p>
      </Typography>
    </ThemeProvider>
  );
};

export default App;
