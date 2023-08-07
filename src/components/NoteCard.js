import React, {useState, useEffect} from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { Avatar, IconButton, Typography } from '@mui/material';
import {DeleteOutlined} from '@mui/icons-material'
import {makeStyles} from '@mui/styles'
import { blue, green, pink, yellow } from '@mui/material/colors';



export default function NoteCard({note, setNotes, setEmptyNote}) {
  const [del, setDel] = useState(false);
  const [item, setItem] = useState(0);
  const handleDelete = (e)=>{
    setItem(parseInt(e.target.id));
    setDel(curr=>!curr);
    
  }
  useEffect(()=>{
    const tempArr = JSON.parse(localStorage.getItem('notes'));
    const filteredArr = tempArr.filter((elem)=>elem.id!==item);
    filteredArr.forEach(el=>{
      el.id -= 1;
    })
    localStorage.setItem('notes', JSON.stringify(filteredArr));
    setNotes(filteredArr);
    if(JSON.parse(localStorage.getItem('notes')).length===0){
      setEmptyNote(true);
    }
  }, [del, item])
  return (
    <div>
      <Card elevation={3}>
        <CardHeader
        avatar = {
          <Avatar style={{color:"black", backgroundColor: note.category[0]=="w" ?
          "skyblue" : note.category[0]=='m' ? "green" : note.category[0]=='t' ?
          "goldenrod" : "pink"}}
          >{note.category.charAt(0).toUpperCase()}</Avatar>
        }
        action={
        <IconButton aria-label="settings">
          <DeleteOutlined onClick={handleDelete} id={note.id}/>
        </IconButton>}
        title={note.title.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}
        subheader={note.category}
        />
        <CardContent>
          <Typography
          variant='body2'
          >{note.details}</Typography>
        </CardContent>
      </Card>
    </div>
  )
}
