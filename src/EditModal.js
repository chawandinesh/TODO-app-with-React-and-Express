import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import dbData from "./temp.json";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal(props) {
  const classes = useStyles();
  const [text, setText] = React.useState(dbData[props.index]);
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    props.closeModal(true);
  };

  const handleSubmit = async (e) => {
    await axios
      .put(`http://localhost:8000/update/${props.index}`, { updateData: text })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    props.closeModal(true);
  };

  React.useEffect(() => {
    setText(dbData[props.index]);
  },[props.index]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <TextField
              id="outlined-basic"
              size="small"
              label="Edit"
              variant="outlined"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              submit
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
