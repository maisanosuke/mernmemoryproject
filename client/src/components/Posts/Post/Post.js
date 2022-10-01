import React from "react";
import useStyles from "./styles";
import {useDispatch, useSelector} from "react-redux";
import { removePost, likePost, updateId} from "../../../actions/actions";
import {Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import {useHistory} from "react-router-dom";
import { ThumbUpAltOutlined } from "@material-ui/icons";

export default function Post({post/*, currentEditingId, setCurrentEditingId*/}){
    const {creater, createrId, title, message, tags, _id, selectedFile, createdAt, likeCount, likedUsers} = post;
    const classes = useStyles();
    const tagString = tags.map(tag => '#' + tag + ' ');
    const dispatch = useDispatch();
    const editingId = useSelector(state => state.editingId);
    const user = useSelector(state => state.user);
    const history = useHistory();

    const [time, setTime] = React.useState(moment(createdAt).fromNow());
    const [likes, setLikes] = React.useState(likedUsers); //likes state to give user instanteneous feedback (no need to wait for bakcend res)
    
    React.useEffect(()=>{
        const interval = setInterval(()=>{setTime(moment(createdAt).fromNow())}, 60000);//update time every min
        return () => clearInterval(interval); //need a clean-up function to remove setInterval timer to avoid memory leaks
    }, [createdAt]);
    

    function handleDelete(){
        //if(currentEditingId===_id){
        if(editingId===_id){
            //setCurrentEditingId(0);
            dispatch(updateId(0))
        }
        dispatch(removePost(_id));
    }

    //React Component <Likes /> defined within another component
    function Likes(){
        if(user && likes.includes(user._id))
            return <ThumbUpAltIcon fontSize="small"/>
        else return <ThumbUpAltOutlined fontSize="small"/>
    }

    const handleLikePost = () =>{
        if(likes.includes(user._id)){
            setLikes(likes => likes.filter(like=>like!==user._id))
        }else {
            setLikes(likes => [...likes, user._id]);
        }

        dispatch(likePost(_id, history))
    }

    const openPost = () => {
        history.push(`/posts/${_id}`)
    }

    return(
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase className={classes.cardAction} onClick={openPost}>
                <CardMedia className={classes.media} image={selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={title}/>
                <div className={classes.overlay}>
                    <Typography variant="h6">{creater}</Typography>
                    <Typography variant="body2">{time}</Typography>
                </div>
                {user && user._id === createrId && 
                <div className={classes.overlay2}>
                    <Button style={{color: 'white'}} size='small' onClick={()=>{/*setCurrentEditingId(_id);*/dispatch(updateId(_id))}}>
                        <MoreHorizIcon fontSize="medium"/>
                    </Button>
                </div>}
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary">{tagString}</Typography>
                </div>
                <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{message}</Typography>
                </CardContent>
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                <Button onClick={handleLikePost} color="primary" size="small" disabled={user?false:true}><Likes/>&nbsp; Like &nbsp;{likes.length}</Button>
                {user && user._id === createrId && <Button onClick={handleDelete} color="primary" size="small"><DeleteIcon fontSize="small"/>&nbsp; Delete</Button>}
            </CardActions>
            
            <hr/>
        </Card>
    )
}