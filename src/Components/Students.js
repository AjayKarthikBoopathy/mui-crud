import React, { useState } from 'react'
import Base from '../Base/Base'
import data from '../Data/data';
import AddStudents from './AddStudents';
import UpdateStudents from './UpdateStudents';
import { useHistory } from 'react-router-dom';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



function Students({ students, setStudents }) {
    const history = useHistory();
    // delete functionality
    const deleteStudent = async (studId) => {

        const response = await fetch(`https://64577d930c15cb148209d986.mockapi.io/users/${studId}`, {
            method: "DELETE",
        });

        const data = await response.json()
        if (data) {
            const remainingStudents =
                students.filter((stud, idx) => stud.id !== studId)
            setStudents(remainingStudents)
        }
    }


    return (
        <Base
            title={"Students Dashboard"}
            description={"This page contains all students data"}
        >

            <div className='card-container'>
               
                {students.map((stud, idx) => (

                    <Card sx={{ maxWidth: 200, height: 220 }} key={idx}>

                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {stud.name}
                            </Typography>
                            <Typography variant="body2" color="text.primary">
                                {stud.batch}
                            </Typography>
                            <Typography variant="body2" color="text.primary">
                                {stud.gender}
                            </Typography>
                            <Typography variant="body2" color="text.primary">
                                {stud.qualification}
                            </Typography>
                        </CardContent>

                        <CardActions>
                            <Button
                                size="small"
                                onClick={() => history.push(`/edit/${stud.id}`)}
                            >

                            <EditIcon />

                            </Button>
                            <Button
                                size="small"
                                onClick={() => deleteStudent(stud.id)}
                            >
                            
                            <DeleteIcon />

                            </Button>
                        </CardActions>

                    </Card>

                ))}

            </div>

        </Base>
    )
}

export default Students


//crud
// read
//delete
//add
//update
// const arr = [1, 2, 3, 4, 5, 10, 15]

// function deleteFromArray(arr, num){
//   console.log(arr)
//   const removedArra = arr.filter((data, index)=>data != num)
//   console.log(removedArra)
// }

//deleteFromArray(arr, 4)