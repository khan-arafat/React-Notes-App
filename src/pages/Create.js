import React, { useEffect, useState } from 'react';
import {Typography,
        Button,
        Container,
        TextField,
        RadioGroup,
        Radio,
        FormControlLabel,
        FormControl,
        FormLabel
} from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  feild: { 
    display: 'block',
    marginTop: 20,
    marginBottom: 20
  }
})
const styledOnes = {
    display: 'block',
    marginTop: 20,
    marginBottom: 20
}
export default function Create() {
  const classes = useStyles();

  const [title,setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError,setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("todos");
  const [notes, setNotes] = useState([]);
  const [addNotes, setAddNotes] = useState(false);
  const navigate = useNavigate()

  const handleTitle = (e)=> {
    setTitle(e.target.value);
  }
  const handleDetails = (e)=> {
    setDetails(e.target.value);
    
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);
    if(title===''){
      setTitleError(true);
    }
    if(details===''){
      setDetailsError(true);
    }
    setAddNotes(curr=>!curr);
    
  }
  useEffect(()=>{
    if(!details || !title){
      return;
    }
    if(!localStorage.getItem('notes')){
        
      const tempObj = {
        title: title,
        details: details,
        category: category,
        id: 1
      }
      const tempArr = [...notes, tempObj];
      setNotes(tempArr);
      localStorage.setItem('notes', JSON.stringify(tempArr));
      navigate("/");
      return;
    }
      const tempArr = JSON.parse(localStorage.getItem('notes'));
      const tempObj = {
        title: title,
        details: details,
        category: category,
        id: tempArr.length+1
      }
      tempArr.push(tempObj)
      setNotes(tempArr);
      localStorage.setItem('notes', JSON.stringify(tempArr));
      navigate("/");
  }, [addNotes,titleError, detailsError])
  return (
    <Container>
      <Typography 
      variant='h6'
      component='h2'
      color='textSecondary'
      gutterBottom
      >
        Create a new Note
      </Typography>
      <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <TextField
        onChange={handleTitle}
        variant='outlined'
        label='Note Title'
        color='secondary'
        fullWidth
        required
        error={titleError}
        className={classes.feild}
        style={styledOnes}
        ></TextField>
        <TextField
        onChange={handleDetails}
        variant='outlined'
        label='Details'
        color='secondary'
        fullWidth
        multiline
        rows={4}
        required
        error={detailsError}
        className={classes.feild}
        style={styledOnes}
        ></TextField>
        <FormControl className={classes.feild} style={styledOnes}>
          <FormLabel>Note's Category</FormLabel>
          <RadioGroup value={category} onChange={(e)=>setCategory(e.target.value)}>
            <FormControlLabel control={<Radio color='secondary'/>} value='money' label="Money" />
            <FormControlLabel control={<Radio color='secondary'/>} value='todos' label="Todos" />
            <FormControlLabel control={<Radio color='secondary'/>} value='reminder' label="Reminders" />
            <FormControlLabel control={<Radio color='secondary'/>} value='work' label="Work" />
          </RadioGroup>
        </FormControl>
        <Button type='submit'
              variant='contained'
              color='secondary'
              endIcon={<KeyboardArrowRightIcon />}
      >SUBMIT</Button>
      </form>
    </Container>
  )
}
