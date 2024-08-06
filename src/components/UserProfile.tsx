import React from "react";
import { Button, Box, Alert, Paper, Grid} from '@mui/material';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import FoodPrefsIcon from "../../public/icons/preference.png"
import FoodDiaryIcon from "../../public/icons/diary.png"
import CommentsIcon from "../../public/icons/comments.png"
import FoodEditionIcon from "../../public/icons/edit.png"
import MeasurementsIcon from "../../public/icons/graph.png"
import LikesIcon from "../../public/icons/thumbs_up.png"
import DislikesIcon from "../../public/icons/thumbs_down.png"
import FoodHistoryIcon from "../../public/icons/history.png"


const UserProfile: React.FC = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    

    return <Grid container display="flex" 
            flexDirection="column" 
            justifyContent="space-between" 
            alignItems="center" 
            sx={{width: "100vw", maxWidth:"500px", gap:"10px"}}>
                <Box sx={{
                    display: "flex",
                    width: "75%",
                    justifyContent: "space-between",
                }}>
                    <Button component={Link} to={"food-prefs"} 
                        sx={{display: "flex", 
                            flexDirection: "column", 
                            alignItems: "center", 
                            width: "50%", 
                            textTransform: "none", 
                            fontWeight: "bold"}}
                    >
                        <Box
                            component="img"
                            sx={{
                            maxHeight: { xs: 90, md: 150 },
                            }}
                            alt="preferencias alimenticias"
                            src={FoodPrefsIcon}
                        />
                        Preferencias alimenticias
                    </Button>
                    <Button sx={{display: "flex", 
                        flexDirection: "column", 
                        alignItems: "center", 
                        width: "50%", 
                        textTransform: "none", 
                        fontWeight: "bold"}}>
                        <Box
                            component="img"
                            sx={{
                            maxHeight: { xs: 90, md: 150 },
                            }}
                            alt="Historial de alimentos"
                            src={FoodHistoryIcon}
                        />
                        Historial de alimentos
                    </Button>
                    
                </Box>
            
            </Grid>
  
}

export default UserProfile