/* eslint-disable react-hooks/exhaustive-deps */
import {
  Typography,
  Table,
  TableContainer,
  TableBody,
  TableHead,
  Paper,
  TableRow,
  Button,
  TableCell,
} from "@material-ui/core";

import { connect } from "react-redux";

import { DeleteProduct } from "../data/action";

function ProductTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6">Product Name</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Description</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Product Que.</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Expire At</Typography>
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.contentData.product.length !== 0
            ? props.contentData.product.map((item) => {
                return (
                  <TableRow>
                    <TableCell>{item.productName}</TableCell>
                    <TableCell size="small" style={{ maxWidth: 300 }}>
                      {item.description}
                    </TableCell>
                    <TableCell size="small">{item.productQuentaty}</TableCell>
                    <TableCell size="small">
                      {new Date(item.expireDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell style={{ maxWidth: 100 }}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => props.deleteProduct(item.id)}
                        fullWidth
                      >
                        Delete
                      </Button>
                    </TableCell>
                    <TableCell style={{ maxWidth: 100 }}>
                      <Button variant="outlined" color="primary" fullWidth>
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    contentData: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteProduct: (id) => dispatch(DeleteProduct(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductTable);
