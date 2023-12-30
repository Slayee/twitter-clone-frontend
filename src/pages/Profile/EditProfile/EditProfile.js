import React, { useState } from 'react'
import './EditProfile.css'
import Modal from '@mui/material/Modal'
import { Box, Button, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import axios from 'axios';

const style = {
  postion: 'absolute',
  top: '50%',
  left: '50%',
  // transform: "translate(-50%,-50%)",
  width: '600px',
  height: '600px',
  bgcolor: 'white',
  boxShadow: '24px',
  borderRadius: '8px'
}

function EditeChild({dob, setDob}){
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      <div className='birthdate-section' onClick={handleOpen}>
        <text>Edit</text>
      </div>
      <Modal hideBackdrop open={open} onClose={handleClose} aria-labelledby="child-modal-title" aria-describedby="child-modal-description">
        <Box sx={{...style, width: 300, height: 300}}>
          <div className="text">
            <h2>Edit date of birth</h2>
            <p>This can only be changed a few times. <br />
              make sure you enter the age of the <br/>
              person using account</p>
            <input type='date' onChange={e=> setDob(e.target.value)}/>
            <Button className='e-button' onClick={()=>setOpen(false)}>Cancel</Button>
          </div>
        </Box>
      </Modal>
    </>
  )
}

function EditProfile({user, loggedInUser}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  const [dob, setDob] = useState('');

  const handleSave = async () =>{
    const editedInfo ={
      name,
      bio,
      location,
      website,
      dob
    }
    if(editedInfo){
      axios.patch(`https://twitter-clone-backend-ftuv.onrender.com/userUpdates/${user?.email}`, editedInfo)
      setOpen(false);
    }
  }

  return (
    <div>
      <button className='edit-profile-button' onClick={()=>setOpen(true)}>Edit Profile</button>

      <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style} className='modal'>
          <div className='header'>
            <IconButton><CloseIcon onClick={()=>setOpen(false)}/></IconButton>
            <h2 className="header-title">Edit Profile</h2>
            <button className="save-button" onClick={handleSave}>Save</button>
          </div>
          <form className='fill-content'>
            <TextField className='text-field' fullWidth label='Name' is='fullWidth' variant='filled' onChange={(e) => setName(e.target.value)} defaultValue={loggedInUser[0]?.name ? loggedInUser[0]?.name : ''} />
            <TextField className='text-field' fullWidth label='Bio' is='fullWidth' variant='filled' onChange={(e) => setBio(e.target.value)} defaultValue={loggedInUser[0]?.bio ? loggedInUser[0]?.bio : ''} />
            <TextField className='text-field' fullWidth label='Location' is='fullWidth' variant='filled' onChange={(e) => setLocation(e.target.value)} defaultValue={loggedInUser[0]?.location ? loggedInUser[0]?.location : ''} />
            <TextField className='text-field' fullWidth label='Website' is='fullWidth' variant='filled' onChange={(e) => setWebsite(e.target.value)} defaultValue={loggedInUser[0]?.website ? loggedInUser[0]?.website : ''} />
          </form>
          <div className='birthdate-section'>
            <p>Birth Date</p>
            <p>.</p>
            <EditeChild dob={dob} setDob={setDob}/>
          </div>
          <div className='last-section'>
            {
              loggedInUser[0]?.dob ? 
                <h2>{loggedInUser[0]?.dob}</h2>:
                <h2>
                  {
                    dob? dob : 'Add your date of birth'
                  }
                </h2>
            }
            <div className="last-button">
              <h2>Switch to Professional</h2>
              <ChevronRightIcon/>
            </div>
          </div>
        </Box>

      </Modal>
    </div>
  )
}

export default EditProfile