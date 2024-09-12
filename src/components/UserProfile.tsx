import React from "react";
import { Button, Box, Alert, Paper, Grid, Typography} from '@mui/material';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import FoodPrefsIcon from "../../public/icons/food-prefs.png"
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


    const handleFoodPrefs = () => {
        navigate("food-prefs")
    }

    const handleFoodHistory = () => {
        navigate("food-history")
    }

    const handleFoodDiary = () => {
        navigate("food-diary")
    }

    const optionsUser = [
        {name: "Preferencias alimenticias", function: handleFoodPrefs, icon: FoodPrefsIcon},
        {name: "Historial de alimentos", function: handleFoodHistory, icon: FoodHistoryIcon},
        {name: "Diario alimenticio", function: handleFoodDiary, icon: FoodDiaryIcon},
    ]

    return <Grid container display="flex" 
                flexDirection="row" 
                justifyContent="space-evenly"
                alignItems="stretch"
                sx={{width: "100vw", maxWidth:"500px", gap:"5px", flexWrap: "wrap", pb: 7}}
            >
                {optionsUser.map((option) => (
                <Button variant='dashed' onClick={option.function} 
                sx={{display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center", 
                    justifyContent: "stretch",
                    width: "45%", 
                    fontWeight: "bold",
                }}
                > 
                    <Box width="70%">
                    <Box
                        component="img"
                        sx={{
                            width: "100%"
                        }}
                        alt={option.name}
                        src={option.icon}
                    />
                    </Box>
                    
                    <Typography   fontFamily={"Montserrat"} color={"primary.dark"}>
                        {option.name}
                    </Typography>
                </Button>
            ))}
                
            
            </Grid>
  
}

export default UserProfile