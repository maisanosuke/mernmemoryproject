import React from "react";
import {useDispatch} from 'react-redux';
import { useHistory, useLocation } from "react-router-dom";//useHistory to renavigate, uselocation to get current URL
import { Container, Grow, Grid, Paper, AppBar, Button, TextField } from "@material-ui/core"
import ChipInput from "material-ui-chip-input";

import useStyles from "./styles";


import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import {getPostsBySearch} from "../../actions/actions";
import Paginate from "../Pagination/Paginate";
  
function useQuery(){
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const query = useQuery();
    const [tags, setTags] = React.useState([]);
    const [search, setSearch] = React.useState('');

// const [currentEditingId, setCurrentEditingId] = React.useState(0);
    // React.useEffect(()=>{
    //     dispatch(getPosts());
    //   }, [dispatch])
    // React.useEffect(() => {
    //   console.log("you changed URL");
    // }, [history])

      const handleAddTag = (newTag) => setTags(tags => [...tags, newTag]);

      const handleDeleteTag = (tagToDelete) => setTags(tags => tags.filter(tag => tag!==tagToDelete));

      const handleKeyDown = (e) => e.which === 13 && handleSearch();//if user pressed ENTER, call handleSearch()
      
      const handleSearch = () => {
        if(tags.length !== 0 || search.trim()){
          dispatch(getPostsBySearch({search: search, tags: tags.join(',')}));
          history.push(`/posts/search?searchQuery=${search||'none'}&tags=${tags.join(',')}`);
        }
      }

  return (
    <Grow in>
      <Container maxWidth='xl'>
        <Grid
          className={classes.gridContainer}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}  sm={6} md={9}>
            <Posts /*currentEditingId={currentEditingId} setCurrentEditingId={setCurrentEditingId}*//>
          </Grid>
          <Grid item xs={12}  sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position='static' color='inherit'>
              <TextField name='search' variant='outlined' label='Search Memory' fullWidth value={search} onChange={(e)=>{setSearch(e.target.value)}} onKeyDown={handleKeyDown}/>
              <ChipInput style={{margin: '10px 0px'}}name='tags' variant='outlined' label='Search Tags' fullWidth value={tags} onAdd={handleAddTag} onDelete={handleDeleteTag}/>
              <Button onClick={handleSearch} fullWidth color='primary' variant='contained'>SEARCH</Button>
            </AppBar>
            {/* onDelete={(chip, index) => handleDeleteChip} */}
            <Form /*currentEditingId={currentEditingId} setCurrentEditingId={setCurrentEditingId}*//>
           {(!query.get('searchQuery') && !query.get('tags')) &&
            <Paper className={classes.pagination} elevation={6}>
              <Paginate className={classes.pagination} page={1} />
            </Paper>
            }
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
