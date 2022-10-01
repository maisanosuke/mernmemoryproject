import React from "react";
import useStyles from "./styles";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addPost, updatePost, updateId} from "../../actions/actions";
import {TextField, Button, Typography, Paper} from '@material-ui/core';
import FileBase from "react-file-base64";
import { useHistory } from "react-router-dom";

export default function Form(/*{currentEditingId, setCurrentEditingId}*/){
    const classes = useStyles();
    const dispatch = useDispatch();
    const editingId = useSelector(state => state.editingId);
    const user = useSelector(state => state.user);
    const post = useSelector(state => editingId ? state.posts.posts.find(post => post._id===editingId) : null);
    const history = useHistory();

    const initForm = () => ({
        title: '', 
        message: '', 
        selectedFile: '', 
        tags: [],
    })

    const [form, setForm] = useState(initForm);

    React.useEffect(()=>{
        if(editingId!==0){
            setForm(post);
        }
        else{
            setForm(initForm);
        }
    }, [post, editingId/*currentEditingId*/])

    function handleChange(e){
        const {name, value} = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: name==='tags'? value.split(',') : value
        }))
    }

    function handleSubmit(e){
        e.preventDefault();
        //if(currentEditingId===0){
        if(editingId===0){
            dispatch(addPost({...form, creater: user.name}, history));
            setForm(initForm);
        }else{
            dispatch(updatePost(editingId /*currentEditingId*/, {...form, creater: user.name}));
            dispatch(updateId(0));
            //setCurrentEditingId(0);
        }
    }

    function handleClearAndCancel(){
        if(/*currentEditingId*/editingId!==0){
            dispatch(updateId(0));
            //setCurrentEditingId(0);
        }
        else{setForm(initForm)};
    }
    
    return(
        <>
            {user ? <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{/*currentEditingId*/editingId ? "Editing" : "Creating"} a Memory</Typography>
                <TextField name='title' variant="outlined" label="Title" fullWidth onChange={handleChange} value={form.title}/>
                <TextField name='message' variant="outlined" label="Message" fullWidth row='5' col='30' onChange={handleChange} value={form.message}/>
                <TextField name='tags' variant="outlined"  label="Tags (comma separated)" fullWidth type='text' onChange={handleChange} value={form.tags}/>
                <div className={classes.fileInput}><FileBase name='selectedFile' type="file" onDone={({base64})=>setForm(prevForm=>({...prevForm, selectedFile: base64}))} multipleFile={false}/></div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type='submit' fullWidth>SUBMIT</Button>
                <Button variant="contained" color="secondary" size="small" fullWidth onClick={handleClearAndCancel}>{/*currentEditingId*/editingId===0? "CLEAR" : "CANCEL EDITING"}</Button>
            </form>
            </Paper>
            : <Paper className={classes.paper}>
                <Typography variant='h6' align='center'>Please Log in to create Memory or like post</Typography>
              </Paper>
            }
        </>
        )
}

// title: String,
// message: String,
// creater: String,
// tags: [String],
// selectedFile: String,
// likeCount: { //use object whenever you wanna set additional info. eg. default value
//     type: Number,
//     default: 0
// },
// createdAt: {
//     type: Date,
//     default: new Date()
// }