

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
