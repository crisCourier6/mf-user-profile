import React from "react";
import { Button, Box, Alert, Paper, Grid, Switch, Snackbar, SnackbarCloseReason, AppBar, Toolbar, Typography} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Allergen } from "../interfaces/allergen";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ImagesAllergens from "../images/ImagesAllergens";

const UserFoodPreferencesMini: React.FC = () => {
    const navigate = useNavigate()
    const id = window.localStorage.id
    const [userFoodPrefs, setUserFoodPrefs] = useState<Allergen[]>([]) 
    const url = "http://192.168.100.6:8080/profile/" + id + "/allergens"
    useEffect(()=>{
        axios.get(url, {
            withCredentials: true,
             headers: {
                 Authorization: "Bearer " + window.localStorage.token
             }
        })
        .then((response)=>{
            setUserFoodPrefs(response.data)   
            let userPrefs = []
            for (var allergen of response.data){
                userPrefs.push(allergen.id)
            }
            window.localStorage.setItem("food-prefs", userPrefs.toString())
        })
    },[])
    return (
        <></>
    )
}

export default UserFoodPreferencesMini