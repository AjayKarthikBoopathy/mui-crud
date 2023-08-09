import React, { useState } from 'react'
import Base from '../Base/Base'
import { useHistory } from 'react-router-dom'
import { Button, IconButton, Snackbar, TextField } from '@mui/material'


function AddStudents({ students, setStudents }) {
  const history = useHistory()
  const [name, setName] = useState("")
  const [batch, setBatch] = useState("")
  const [gender, setGender] = useState("")
  const [qualification, setQualification] = useState("")

//Snack Bar
const [open, setOpen] = useState(false);

const handleClick = () => {
  setOpen(true);
};

const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
  history.push("/students")
};

const action = (
  <React.Fragment>
    <Button color="warning" size="small" onClick={handleClose}>
      UNDO
    </Button>
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
    Close
    </IconButton>
  </React.Fragment>
);
//Snack Bar Ends


  const createStudent = async () => {
    // creating object from input states
    const newStudents = {
      name: name,
      batch: batch,
      qualification: qualification,
      gender: gender,
    }

    const response = await fetch("https://64577d930c15cb148209d986.mockapi.io/users", {
      method: "POST",
      body: JSON.stringify(newStudents),
      headers: {
        "Content-Type": "application/json"
      },
    })
    const data = await response.json()
    setStudents([...students, data])
    
    handleClick()
  }

  return (
    <Base
      title={"Add New Student"}
      description={"We can able to add new students data here"}
    >

      <div className='text-area-col'>

        <TextField
          id="filled-basic"

          fullWidth sx={{ m: 1 }}

          label="Name"
          variant="filled"

          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          id="filled-basic"
          fullWidth sx={{ m: 1 }}
          label="Batch"
          variant="filled"
          type="text"
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
        />

        <TextField
          id="filled-basic"
          fullWidth sx={{ m: 1 }}
          label="Gender"
          variant="filled"
          type="text"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />

        <TextField
          id="filled-basic"
          fullWidth sx={{ m: 1 }}
          label="Qualification"
          variant="filled"
          type="text"
          value={qualification}
          onChange={(e) => setQualification(e.target.value)}
        />

        <Button
          variant="contained"
          onClick={createStudent}
        >Add Student</Button>

        {/* Snack Bar */}
        <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Added Successfully"
        action={action}
      />

      </div>
      
    </Base>
  )
}

export default AddStudents