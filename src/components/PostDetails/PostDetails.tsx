import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {APIPost} from "../../types";
import axiosAPI from "../../axiosAPI.ts";
import {Box, Button, Card, CardContent, Typography} from "@mui/material";
import Loader from "../Loader/Loader.tsx";
import dayjs from "dayjs";

const PostDetails = () => {
    const [post, setPost] = useState<APIPost>();
    const [loading, setLoading] = useState(false);
    const { id } = useParams<{id: string}>();
    const navigate = useNavigate();

    const onDelete = async () => {
        try {
            setLoading(true);
            await axiosAPI.delete(`/posts/${id}.json`);
            navigate("/");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchPostById = async () => {
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
        };

        if (id) {
            void fetchPostById();
        }
    }, [id]);

    if (loading) return <Loader/>;

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            <Typography variant="h4"  sx={{ width: '100%', textAlign: 'center', mb: 4 }}>
                Post details
            </Typography>
            <Card>
                {post ?
                    <CardContent>
                        <Typography color="textSecondary" sx={{ marginBottom: 2 }}>
                            <strong>Created on:</strong> {dayjs(post.date).format('DD.MM.YYYY HH:mm')}
                        </Typography>
                        <Typography variant="h4" gutterBottom sx={{ marginBottom: 2, fontSize: 28 }}>
                            <strong>Title: </strong>
                            {post.title}
                        </Typography>
                        <Typography variant="body1" sx={{ marginBottom: 2, fontSize: 22 }}>
                            {post.body}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button variant="contained" color="primary" component={Link} to={`/posts/edit/${id}`}>
                                Edit
                            </Button>
                            <Button variant="outlined" color="error" onClick={onDelete}>
                                Delete
                            </Button>
                        </Box>
                    </CardContent>
                : null}
            </Card>
        </Box>
    );
};

export default PostDetails;