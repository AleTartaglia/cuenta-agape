import React, { useState, useEffect } from "react";
import { Button, Container, Typography } from "@mui/material";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import localforage from "localforage";
import AgapeHeader from "./components/AgapeHeader";
import AgapeForm from "./components/AgapeForm";
import AgapeTable from "./components/AgapeTable";
import AgapeFooter from "./components/AgapeFooter";

// Definir estructura de una entrada
export interface Entrada {
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

const defaultFormData: Entrada = {
  nombre: "",
  menu: "",
  importeMenu: 0, // Asegúrate que sea numérico
  bebida: "",
  importeBebida: 0, // Asegúrate que sea numérico
  postre: "",
  importePostre: 0, // Asegúrate que sea numérico
  metodoPago: "",
  estado: "",
  total: 0, // Asegúrate que sea numérico
};

const App = () => {
  const [entradas, setEntradas] = useState<Entrada[]>([]);
  const [formData, setFormData] = useState<Entrada>(defaultFormData);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [totalMesa, setTotalMesa] = useState<number>(0);
  const [errors, setErrors] = useState<{
    nombre?: string;
    metodoPago?: string;
  }>({});

  // Función para actualizar el estado del formulario
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Convertir los campos de importe a número
    const newValue = name.includes("importe") ? Number(value) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  // Función para añadir o editar una entrada en la tabla
  const handleAddOrEditEntry = () => {
    // Resetear errores antes de validar
    setErrors({});

    const total =
      formData.importeMenu + formData.importeBebida + formData.importePostre;
    const totalConDescuento =
      formData.metodoPago === "Efectivo" ? total * 0.85 : total;

    // Validaciones
    let newErrors: { nombre?: string; metodoPago?: string } = {};
    if (!formData.nombre) {
      newErrors.nombre = "El nombre es requerido.";
    }
    if (!formData.metodoPago) {
      newErrors.metodoPago = "El método de pago es requerido.";
    }

    // Si hay errores, actualizar el estado y salir
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const nuevaEntrada: Entrada = {
      ...formData,
      total: totalConDescuento,
    };

    setEntradas((prev) => {
      const nuevasEntradas =
        editIndex !== null
          ? prev.map((item, idx) => (idx === editIndex ? nuevaEntrada : item))
          : [...prev, nuevaEntrada];
      calcularTotalMesa(nuevasEntradas);
      localforage.setItem("entradas", nuevasEntradas).catch(console.error);
      return nuevasEntradas;
    });

    // Limpiar los campos del formulario
    setFormData(defaultFormData);
    setEditIndex(null);
  };

  // Función para eliminar una entrada
  const handleDeleteEntry = (index: number) => {
    setEntradas((prev) => {
      const nuevasEntradas = prev.filter((_, i) => i !== index);
      localforage.setItem("entradas", nuevasEntradas).catch(console.error);
      calcularTotalMesa(nuevasEntradas);
      return nuevasEntradas;
    });
  };

  // Función para editar una entrada
  const handleEditEntry = (index: number) => {
    const entrada = entradas[index];
    setFormData(entrada);
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
      .catch(console.error);

    // Aplicar el color de fondo oscuro al body
    document.body.style.backgroundColor = "#1e272e";
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
        <AgapeHeader />
        <AgapeForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleAddOrEditEntry={handleAddOrEditEntry}
          editIndex={editIndex}
          errors={errors}
        />
        <AgapeTable
          entradas={entradas}
          handleEditEntry={handleEditEntry}
          handleDeleteEntry={handleDeleteEntry}
        />

        <Typography
          variant="h4"
          gutterBottom
          color="#FFF"
          sx={{ marginTop: 3, display: "flex", alignItems: "center" }}
        >
          <img
            style={{ marginRight: "5px" }}
            alt="agapeLogo"
            src={`${process.env.PUBLIC_URL}/agape.png`}
            width="54"
          />
          Total de la Mesa: ${totalMesa.toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          onClick={handleClearEntries}
          fullWidth
          sx={{
            marginTop: 2,
            marginBottom: 2,
            fontWeight: "bold",
            backgroundColor: "crimson",
          }}
        >
          Limpiar Todo
        </Button>
      </Container>
      <AgapeFooter />
    </ThemeProvider>
  );
};

export default App;
