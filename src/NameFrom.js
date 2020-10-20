import React from "react";
import axios from "axios";
import data from "./temp.json";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function NameFrom() {
  const [changedData, setChangedData] = React.useState("");
  const [openEditModal, setOpenEditModal] = React.useState({
    status: false,
    index: "",
  });
  const [openDeleteModal, setOpenDeleteModal] = React.useState({
    status: false,
    index: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:8000/send", { data: changedData })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (e) => {
    setOpenDeleteModal({ ...openDeleteModal, status: true, index: e });
  };

  const handleEdit = (e) => {
    setOpenEditModal({ ...openEditModal, status: true, index: e });
  };

  const handleCloseModal = (e) => {
    setOpenEditModal({ ...openEditModal, status: !e });
  };

  const handleDeleteCloseModal = (e) => {
    setOpenDeleteModal({ ...openDeleteModal, status: !e });
  };

  return (
    <div className="container">
      <TextField
        id="outlined-basic"
        size="small"
        label="Enter here.."
        variant="outlined"
        onChange={(e) => setChangedData(e.target.value)}
      /> &nbsp;
      <Button
        variant="contained"
        color="primary"
        onClick={(e) => handleSubmit(e)}
      >
        submit
      </Button>

      {data.map((e, idx) => {
        return (
          <div
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h3>{e}</h3>{" "}
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => handleDelete(idx)}
              >
                Delete
              </Button>
              &nbsp;
              <Button
                variant="contained"
                color="secondary"
                onClick={(e) => handleEdit(idx)}
              >
                Edit
              </Button>
            </div>
          </div>
        );
      })}
      {openEditModal.status ? (
        <EditModal index={openEditModal.index} closeModal={handleCloseModal} />
      ) : null}

      {openDeleteModal.status ? (
        <DeleteModal
          index={openDeleteModal.index}
          closeModal={handleDeleteCloseModal}
        />
      ) : null}
    </div>
  );
}

export default NameFrom;
