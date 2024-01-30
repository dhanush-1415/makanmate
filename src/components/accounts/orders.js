import React from 'react';
import { Grid, TextField, Typography ,Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './common.css';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#ff4d04',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),

];


function Orders() {
  return (
    <>
      <Grid container sx={{padding:'30px'}}>
        <Typography sx={{fontWeight:'bold'}}>My Orders</Typography>
        <Grid container justifyContent="space-between" sx={{padding:'30px 0px'}}>
          <TableContainer component={Paper} sx={{ maxHeight: 540 }}>
            <Table stickyHeader  aria-label="customized table">
              <TableHead>
                <TableRow >
                  <StyledTableCell>Order Id</StyledTableCell>
                  <StyledTableCell>Order Date</StyledTableCell>
                  <StyledTableCell>Order Status</StyledTableCell>
                  <StyledTableCell>Order Total</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell>{row.calories}</StyledTableCell>
                    <StyledTableCell>{row.fat}</StyledTableCell>
                    <StyledTableCell>{row.carbs}</StyledTableCell>
                    <StyledTableCell>{row.protein}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
     
      </Grid>
    </>
  );
}

export default Orders;
