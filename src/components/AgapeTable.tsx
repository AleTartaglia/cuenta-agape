import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Entrada } from "../App";

interface AgapeTableProps {
  entradas: Entrada[];
  handleEditEntry: (index: number) => void;
  handleDeleteEntry: (index: number) => void;
}

const AgapeTable = ({
  entradas,
  handleEditEntry,
  handleDeleteEntry,
}: AgapeTableProps) => (
  <TableContainer component={Paper} sx={{ marginTop: 3 }}>
    <Table>
      <TableHead>
        <TableRow>
          {[
            "Nombre",
            "Menú",
            "Importe Menú",
            "Bebida",
            "Importe Bebida",
            "Postre",
            "Importe Postre",
            "Método Pago",
            "Total",
            "Estado",
            "Acciones",
          ].map((header) => (
            <TableCell key={header}>{header}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {entradas.map((entrada, index) => (
          <TableRow key={index}>
            <TableCell>{entrada.nombre}</TableCell>
            <TableCell>{entrada.menu}</TableCell>
            <TableCell>{entrada.importeMenu.toFixed(2)}</TableCell>
            <TableCell>{entrada.bebida}</TableCell>
            <TableCell>{entrada.importeBebida.toFixed(2)}</TableCell>
            <TableCell>{entrada.postre}</TableCell>
            <TableCell>{entrada.importePostre.toFixed(2)}</TableCell>
            <TableCell>{entrada.metodoPago}</TableCell>
            <TableCell>{entrada.total.toFixed(2)}</TableCell>
            <TableCell>{entrada.estado}</TableCell>
            <TableCell>
              <IconButton onClick={() => handleEditEntry(index)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDeleteEntry(index)}>
                <DeleteIcon color="error" />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default AgapeTable;
