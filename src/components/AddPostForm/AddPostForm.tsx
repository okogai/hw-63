import React, {useEffect, useState} from "react";
import {IPost} from "../../types";
import {useNavigate, useParams} from "react-router-dom";
import axiosAPI from "../../axiosAPI.ts";
import {Box, Button, TextField, Typography} from "@mui/material";
import Loader from "../Loader/Loader.tsx";

const initialForm = {title: '', body: '', date: ''};

const AddPostForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState<IPost>(initialForm);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPost({...post, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
       e.preventDefault();
       try {
           setLoading(true);
           if (id) { try {
               await axiosAPI.put(`/posts/${id}.json`, post);
           } catch (error) {
               console.error(error);
           } finally {
               navigate(`/posts/${id}`)
           }
           } else {
               try {
                 await axiosAPI.post(`/posts.json`, {...post, date: new Date().toISOString()});
               } catch (error) {
                   console.error(error);
               } finally {
                   setPost({...initialForm});
               }
           }
       } catch (error) {
           console.error(error);
       } finally {
           setLoading(false);
       }
    };

    useEffect(() => {
        const getPostToEdit = async () => {
            if (id) {
                try {
                    setLoading(true);
                    const response = await axiosAPI.get(`/posts/${id}.json`);
                    if (response.data) {
                        setPost({ ...response.data });
                    }
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            } else {
                setPost(initialForm);
            }
        };
        void getPostToEdit();
    }, [id]);

    if (loading) return <Loader/>;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                maxWidth: 400,
                mx: 'auto',
                mt: 4,
                p: 3,
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            }}
        >
            <Typography variant="h5" gutterBottom>{id ? 'Edit Post' : 'Add a New Post'}</Typography>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <TextField
                    id="outlined-title"
                    label="Title"
                    multiline
                    maxRows={4}
                    type="text"
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="body"
                    value={post.body}
                    onChange={handleChange}
                    label="Body"
                    placeholder="Enter post content"
                    multiline
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    />
                <Box display="flex" justifyContent="center" mt={2}>
                    <Button type="submit" variant="contained" color="primary">{id ? 'Save' : 'Add'}</Button>
                </Box>
            </form>
        </Box>
    );
};

export default AddPostForm;