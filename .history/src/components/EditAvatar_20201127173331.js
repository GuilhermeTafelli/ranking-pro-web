import React, { useState, useRef } from 'react'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import FileInput from './input/FileInput'


const useStyles = makeStyles((theme) => ({       
    avatar: {
        width: "230px",
        height: "230px",
        [theme.breakpoints.up("sm")]: {
            width: "300px",
            height: "300px"
        },
    },
    editAvatar: {
        width: "53px",
        height: "53px",
        [theme.breakpoints.up("sm")]: {
            width: "70px",
            height: "70px"
        },
        border: `2px solid ${theme.palette.background.paper}`
    },
    editIcon: {
        width: "32px",
        height: "32px",
        [theme.breakpoints.up("sm")]: {
            width: "40px",
            height: "40px"
        },
    },
}))

export default function editAvatar() {

    const classes = useStyles()
    const [file, setFile] = useState(null);

    const handleChange = function loadFile(event) {
        if (event.target.files.length > 0) {
            const file = URL.createObjectURL(event.target.files[0]);
            setFile(file);
        }
    }

    return (
        <>
        <label htmlFor="upload">
            <IconButton color="primary" aria-label="upload picture" component="span">
            <Badge
                overlap="circle"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                badgeContent={
                    <Avatar className={classes.editAvatar}>
                        <EditIcon className={classes.editIcon}/>
                    </Avatar>
                }
            >
                <Avatar className={classes.avatar} id="avatar" src={file}/>
            </Badge>

            </IconButton>
        </label>
        <FileInput name="foto" type="file" onChange={handleChange} id="upload" accept="image/*" style={{display: "none"}}/>    
        </>
    )
}
