/* eslint-disable react-hooks/exhaustive-deps */
import {
  Typography,
  Table,
  TableContainer,
  TableBody,
  TableHead,
  Paper,
  TableRow,
  TableCell,
  Button,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import { useEffect, useState } from "react";
import { connect } from "react-redux";
import CustimizeCategoryModifyForm from "./CategoryModifyForm";

import { FetchCategory, DeleteCategory, EditCategory } from "../data/action";

function CategoryTable(props) {
  useEffect(() => {
    props.fetchCategory();
  }, []);

  const [categoryName, setCategoryName] = useState("");
  const [open, setOpne] = useState("");
  const [id, setId] = useState("");

  return (
    <TableContainer component={Paper}>
      <CustimizeCategoryModifyForm
        openDialog={open}
        onClose={() => setOpne(false)}
        onChange={(event) => setCategoryName(event.target.value)}
        CategotyModify={() => {
          props.editCategory(id, { categoryName: categoryName });
          setOpne(false);
          setCategoryName('')
          setId("");
        }}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6">Category Name</Typography>
            </TableCell>
            <TableCell size="small"></TableCell>
            <TableCell size="small"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.contentData.category.length !== 0
            ? props.contentData.category.map((item) => {
                return (
                  <TableRow>
                    <TableCell>{item.categoryName}</TableCell>
                    <TableCell size="small" style={{ width: 200 }}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                        onClick={() => props.deleteCategory(item.id)}
                        fullWidth
                      >
                        Delete
                      </Button>
                    </TableCell>
                    <TableCell size="small" style={{ width: 200 }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<EditIcon />}
                        onClick={()=>{
                          setId(item.id);
                          setOpne(true);
                        }}
                        fullWidth
                      >
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
    fetchCategory: () => dispatch(FetchCategory()),
    deleteCategory: (id) => dispatch(DeleteCategory(id)),
    editCategory: (id, data) => dispatch(EditCategory(id, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryTable);
