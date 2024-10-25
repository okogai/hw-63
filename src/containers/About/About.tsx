import { useState, useEffect } from 'react';
import { Typography, Button, TextField, Box, Avatar } from '@mui/material';
import axiosAPI from "../../axiosAPI.ts";
import authorPhoto from "../../assets/author.jfif";
import Loader from "../../components/Loader/Loader.tsx";

const About = () => {
    const [content, setContent] = useState<string>('');
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAboutContent = async () => {
            try {
                setLoading(true);
                const response = await axiosAPI.get('/about.json');
                setContent(response.data?.content || 'Welcome to our blog! Here you will find interesting articles.');
            } catch (error) {
                console.error("Error fetching About page content:", error);
            } finally {
                setLoading(false);
            }
        };

        void fetchAboutContent();
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        try {
            setLoading(true);
            await axiosAPI.put('/about.json', { content });
            setIsEditing(false);
        } catch (error) {
            console.error("Error saving About page content:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader/>;

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, p: 2 }}>
            <Typography variant="h4" gutterBottom>About Us</Typography>

            <Box display="flex" alignItems="center" mb={3} flexDirection="row">
                <Avatar
                    alt="Author"
                    src={authorPhoto}
                    sx={{ width: 150, height: 150}}
                />

            </Box>

            {isEditing ? (
                <>
                    <TextField
                        fullWidth
                        multiline
                        rows={6}
                        label="About Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        variant="outlined"
                        margin="normal"
                    />
                    <Box mt={2} display="flex" justifyContent="center">
                        <Button variant="contained" color="primary" onClick={handleSaveClick}>Save</Button>
                    </Box>
                </>
            ) : (
                <>
                    <Typography variant="body1">{content}</Typography>
                    <Box mt={2} display="flex" justifyContent="center">
                        <Button variant="outlined" color="primary" onClick={handleEditClick}>Edit</Button>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default About;