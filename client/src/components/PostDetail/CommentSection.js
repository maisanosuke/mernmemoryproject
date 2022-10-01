import React from 'react';
import { Typography,TextField, Button} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../../actions/actions';
import useStyles from './styles';

const CommentSection = ({post}) => {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const [commentSec, setCommentSec] = React.useState();
    const [comments, setComments] = React.useState([]);
    const commentsRef = React.useRef();

    React.useEffect(()=>{
        setComments(post.comments.map(comment => `${comment.user}: ${comment.commentText}`))
    }, [])

    const handleChange = (e) =>{setCommentSec(e.target.value);}

    const handleKeyDown = (e) => {(e.which===13) && handleAddComment()};//if user press ENTER, submit comment

    const handleAddComment = (e) =>{
        setComments(comments => [...comments,`${user.name}: ${commentSec}`]);
        dispatch(addComment(post._id, user.name, commentSec));
        setCommentSec('');
        commentsRef.current.scrollIntoView();
    }
 
    return (
        <div className={classes.commentOuterContainer}>
            <div className={classes.commentInnerContainer}>
                        {comments.map((comment) => (
                            <Typography key={comment._id} variant="subtitle2">{comment}</Typography>
                        ))}
                        <div ref={commentsRef}/>
            </div>
            {user && <div style={{width: '70%'}}>
                <Typography variant="h6">Write a Comment</Typography>
                <TextField onKeyDown={handleKeyDown} multiline minRows={4} placeholder='Comment' value={commentSec} onChange={handleChange}label='Comment' variant='outlined' fullWidth/>
                <Button onClick={handleAddComment} disabled={!commentSec} style={{marginTop: '7px'}} fullWidth color='primary' variant='contained'>COMMENT</Button>
            </div>}
        </div>
  );
}

export default CommentSection
