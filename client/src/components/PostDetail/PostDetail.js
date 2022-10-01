import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getPost, getPostsBySearch } from '../../actions/actions';
import CommentSection from './CommentSection';
import { CircularProgress, Paper, Typography, Divider} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';
import moment from 'moment';

const PostDetail = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();
    const {post, posts, isLoading} = useSelector(state => state.posts);

    React.useEffect(()=>{
      dispatch(getPost(id));
    }, [id])

    React.useEffect(()=>{
      if(post){
        dispatch(getPostsBySearch({search: 'none', tags: post.tags.join(',')}))
      }
      //history.push(`/posts/search?searchQuery=${search||'none'}&tags=${tags.join(',')}`);
    }, [post])

    const recommendedPosts = posts && post ? posts.filter(({_id}) => _id != post._id) : null;

    const openRecommendedPost = (id) =>{
      history.push(`/posts/${id}`);
    }

  return (
      (isLoading || !post) ? 
        <Paper className={classes.loadingPaper} elevation={6}>
          <CircularProgress size='7em'/> 
        </Paper>
        : 
        <Paper style={{padding: '20px', borderRadius: '15px'}} elevation={6}>
          <div className={classes.card}>
            <div className={classes.section}>
              <Typography variant="h3" component="h2">{post.title}</Typography>
              <Typography variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
              <Typography variant="body1" component="p">{post.message}</Typography>
              <Typography variant="h6">Created by: {post.creater}</Typography>
              <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
              <Divider style={{ margin: '20px 0' }} />
              <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
              <Divider style={{ margin: '20px 0' }} />
              <CommentSection post={post}/>
              <Divider style={{ margin: '20px 0' }} />
            </div>
            <div className={classes.imageSection}>
              <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
            </div>
          </div>
          {recommendedPosts && 
            <div className={classes.section}>
              <Typography variant='h5'>You might also like:</Typography>
              <Divider/>
              <div className={classes.recommendedPosts}>
                {recommendedPosts.map(({_id, title, message, creater, likeCount, selectedFile}) => 
                  <div style={{margin: '20px', cursor: 'pointer'}} key={_id} onClick={()=>openRecommendedPost(_id)}>
                    <Typography variant='h6'>{title}</Typography>
                    <Typography variant='subtitle2'>{creater}</Typography>
                    <Typography variant='subtitle2'>{message}</Typography>
                    <Typography variant='subtitle1'>{likeCount} Likes</Typography>
                    <img src={selectedFile} width='200px'/>
                  </div>)}
              </div>
            </div>
          }
        </Paper>
      )
}

export default PostDetail
