import React, { useState, useRef } from 'react'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import FileInput from './input/FileInput'


const useStyles = makeStyles((theme) => ({       
    mainContainer: {
        flexDirection: 'row',
        backgroundColor: "#BEB6AE",
        justifyContent: 'center',
    },
    container2: {
        flexDirection: 'row',
        backgroundColor: "#BEB6AE",
        justifyContent: 'center',
    },
    profileContainer: {
        backgroundColor: "#BEB6AE",
        marginTop: "50px",
        marginBottom: "50px",
        alignItems: "flex-start"
    }, 
    profileItem: {
        backgroundColor: "#FFFFFF",
        marginRight: "10px",
        marginLeft: "10px",
        marginBottom: "15px",
        borderRadius: "7px",
        padding: "10px",
        width: "100%"
    },
    mainItemContainer: {
        marginRight: "10px",
        marginLeft: "10px",
    },
    container: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        padding: "20px",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
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
