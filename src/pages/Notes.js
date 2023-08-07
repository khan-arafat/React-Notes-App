import {  
  Typography,
  Grid,
  Paper,
  Container
} from '@mui/material';
import React, { useState, useEffect } from 'react'
import NoteCard from '../components/NoteCard';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [emptyNote, setEmptyNote] = useState(false);
  useEffect(()=>{
    if(!localStorage.getItem('notes')){
      setEmptyNote(true);
      return;
    }
    const tempArr = JSON.parse(localStorage.getItem('notes'));
    if(tempArr.length===0){
      setEmptyNote(true);
    }
    setNotes(tempArr);
  }, [emptyNote])
  return (
    <Container>
      {emptyNote ? <Typography 
                    variant='h6'
                    component='h2'
                    color='textSecondary'
                    >Add some notes to see.</Typography>:<Container><Grid container spacing={3}>
                    {
                      notes.map((note, idx)=>{
                        return <Grid key={idx} xs={12} sm={6} md={4} lg={4} item>
                          <NoteCard note={note} setNotes={setNotes} setEmptyNote={setEmptyNote}/>
                        </Grid>
                      })
                    }</Grid></Container>
                    }
    </Container>
  )
}
