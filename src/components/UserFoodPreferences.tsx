import React from "react";
import { Button, Box, Alert, Paper, Grid, Switch, Snackbar, SnackbarCloseReason, AppBar, Toolbar, Typography} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Allergen } from "../interfaces/allergen";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ImagesAllergens from "../images/ImagesAllergens";

const UserFoodPreferences: React.FC = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [userFoodPrefs, setUserFoodPrefs] = useState<Allergen[]>([]) 
    const [allergens, setAllergens] = useState<Allergen[]>([])
    const [sending, setSending] = useState(false)
    const [noChanges, setNoChanges] = useState(true)
    const [successOpen, setSuccessOpen] = useState(false)
    const url = "http://192.168.100.6:8080/profile/" + id + "/allergens"
    const url2 = "http://192.168.100.6:8080/profile/allergens"
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
            axios.get(url2, {
                withCredentials: true,
                headers: {
                    Authorization: "Bearer " + window.localStorage.token
                }
            })
            .then((response2)=>{
                setAllergens(response2.data)     
                let newAllergens:Allergen[] = []
                for (var allergen of response2.data){
                    for (var pref of response.data){
                        if (allergen.name === pref.name){
                            allergen.selected = true
                        }
                        
                    }
                    newAllergens.push(allergen)
                }
                console.log(newAllergens)
                setAllergens(newAllergens)
            }) 
        })

        

    },[id])  

    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAllergens(list => list.map((allergen) => {
                if (allergen.id=== event.target.id){
                    setNoChanges(false)
                    return {...allergen, selected: !allergen.selected}
                }
                return allergen
            })
        )
      };
      
    
    const handleSuccessClose = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
      ) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSuccessOpen(false);
      }

    const handleSubmit = () => {
        setSending(true)
        let allergenIdList = []
        for (var allergen of allergens){
            if(allergen.selected){
                allergenIdList.push(allergen.id)
            }
            
        }
        axios.post(url, { allergenIdList: allergenIdList }, {
            withCredentials: true,
             headers: {
                 Authorization: "Bearer " + window.localStorage.token
             }
        })
        .then(response => {
            window.localStorage.setItem("food-prefs", allergenIdList.toString())
            setSending(false)
            setSuccessOpen(true)
            setNoChanges(true)
            
        })
        .catch(error => {
            console.log(error)
            setSending(false)
        })
    }

    return <Grid container display="flex" 
            flexDirection="row" 
            justifyContent="center"
            alignItems="stretch"
            sx={{width: "100vw", maxWidth:"500px", gap:"5px", flexWrap: "wrap", pb: 7}}>
                <Paper 
                sx={{display: "flex", 
                    flexDirection: "row", 
                    alignItems: "center",
                    width: "90%", 
                    border: "5px solid",
                    borderColor: "primary.dark",
                    bgcolor: "primary.main",
                    color: "primary.contrastText"}}>
                        <InfoOutlinedIcon sx={{height:"100%", bgcolor: "white", color:"primary.main", px:"5px"}}/>
                        <Typography textAlign="justify" fontWeight="bold" fontSize={13} sx={{padding:1}}>
                            Selecciona los alérgenos que deseas evitar 
                            para que te alertemos de su presencia cuando 
                            veas el perfil de un alimento.
                        </Typography>

                </Paper>
                
                {allergens.map(allergen => {
                        return (
                            <Box key={allergen.id} sx={{
                                display: "flex",
                                flexDirection: "column",
                                width: "30%",
                                justifyContent: "stretch",
                                alignItems: "center", 
                                py:1
                            }}>  
                                <Box
                                    component="img"
                                    sx={{
                                    maxHeight: { xs: 40, md: 80, flexGrow: 1},
                                    }}
                                    alt={allergen.name}
                                    src={ImagesAllergens[allergen.id]?ImagesAllergens[allergen.id]:null}
                                />
                                <Box key={allergen.id} sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-evenly",
                                    alignItems: "center", 
                                    height: "100%"
                                }}> 
                                    <Typography fontSize={14}>
                                        {allergen.name}
                                    </Typography>
                                    
                                    <Switch id={allergen.id} 
                                            checked={!!allergen.selected} 
                                            sx={{color: "red", alignItems: "center", alignContent: "flex-end"}} 
                                            size="small"
                                            onChange={handleSwitchChange}
                                            disabled={sending}></Switch>
                                </Box>
                                
                            </Box>           
                        )

                })}
                <AppBar position="fixed" 
                        sx={{
                        // display: "flex",
                        // flexDirection: "row",
                        // flexWrap: "nowrap",
                        // justifyContent: "space-around",
                        // alignItems: "center",
                        bgcolor: noChanges?"gray":"secondary.main",
                        color: noChanges?"primary.main":"secondary.main",
                        width: "100%",
                        top: 'auto', 
                        bottom: 0 
                        }}
                        >
                        <Toolbar sx={{display: "flex", justifyContent: "center"}}>
                            <Button variant="text" 
                                    onClick={handleSubmit} 
                                    disabled={noChanges}
                                    sx={{
                                        fontWeight: "bold",
                                        fontSize: 16,
                                        color:"secondary.contrastText"
                                    }}
                            >
                                Guardar cambios
                            </Button> 
                        </Toolbar>
                </AppBar> 

                <Snackbar
                    open = {successOpen}
                    autoHideDuration={3000}
                    onClose={handleSuccessClose}
                    sx={{bottom: 60}}
                    >
                    <Alert
                        severity="success"
                        variant="filled"
                        
                        sx={{ width: '100%',
                            color: "secondary.main",
                            bgcolor: "secondary.contrastText"
                         }}
                    >
                        Preferencias actualizadas!
                    </Alert>
                </Snackbar>  
                
            </Grid>
  
}

export default UserFoodPreferences