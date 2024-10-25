import {useEffect, useState} from "react";
import {IPosts} from "../../types";
import axiosAPI from "../../axiosAPI.ts";
import {Box, Button, Card, CardContent, Typography} from "@mui/material";
import {Link} from "react-router-dom";


const ShowAllPosts = () => {
    const [posts, setPosts] = useState<IPosts[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axiosAPI.get('/posts.json');
                if (response.data) {
                    const loadedPosts = Object.keys(response.data).map(postKey => {
                        return {
                            ...response.data[postKey],
                            id: postKey
                        }
                    });
                    setPosts(loadedPosts)
                }
            } catch (error) {
                console.error(error);
            }
        };
       void fetchPosts();
    }, []);
    console.log(posts);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2, maxWidth: 1280, width: '100%', mx: 'auto' }}>
            <Typography variant="h4"  sx={{ width: '100%', textAlign: 'center' }}>
                All posts
            </Typography>
            {posts.map((post) => (
                <Box key={post.id} sx={{
                    flex: '1 1 30%',
                    display: 'flex'
                }}>
                    <Card sx={{ width: '100%' }}>
                        <CardContent>
                            <Typography color="textSecondary" sx={{ marginBottom: 2 }}>
                                <strong>Created on:</strong> {new Date(post.date).toLocaleDateString()}
                            </Typography>
                            <Typography variant="h5" sx={{ marginBottom: 2 }}>
                                <strong>Title:</strong> {post.title}
                            </Typography>
                            <Button sx={{ marginBottom: 2 }} variant="contained" color="primary" component={Link} to={`/posts/${post.id}`}>
                                Read More
                            </Button>
                        </CardContent>
                    </Card>
                </Box>
            ))}
        </Box>
    );
};
export default ShowAllPosts;