import React from "react";
import { Button, Box, Grid, Typography} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import FoodPrefsIcon from "../svgs/FoodPrefsIcon";
import HistoryIcon from "../svgs/HistoryIcon";
import FoodEditIcon from "../svgs/FoodEditIcon";
import DiaryIcon from "../svgs/DiaryIcon";


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

    const handleFoodEdits = () => {
        navigate("food-edits")
    }

    const optionsUser = [
        {name: "Preferencias alimenticias", function: handleFoodPrefs, icon: <FoodPrefsIcon width={"100%"} height={"auto"}/>},
        {name: "Historial de alimentos", function: handleFoodHistory, icon: <HistoryIcon width={"100%"} height={"auto"}/>},
        {name: "Diario alimenticio", function: handleFoodDiary, icon: <DiaryIcon width={"100%"} height={"auto"}/>},
        {name: "Aportes", function: handleFoodEdits, icon: <FoodEditIcon width={"100%"} height={"auto"}/>},
    ]

    return <Grid container display="flex" 
                flexDirection="row" 
                justifyContent="space-around"
                alignItems="stretch"
                sx={{width: "100vw", maxWidth:"600px", gap:"5px", flexWrap: "wrap", pb: 7}}
            >
                {optionsUser.map((option) => (
                <Button variant='dashed' key={option.name} onClick={option.function} 
                sx={{display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center", 
                    justifyContent: "stretch",
                    width: "40%", 
                    maxWidth: "200px", 
                    fontWeight: "bold",
                }}
                > 
                    <Box width="70%">
                        {option.icon}
                    </Box>
                    
                    <Typography variant='subtitle1' sx={{fontSize:{xs: 12, sm:18}, fontStyle: "bold"}}>
                        {option.name}
                    </Typography>
                </Button>
            ))}
                
            
            </Grid>
  
}

export default UserProfile