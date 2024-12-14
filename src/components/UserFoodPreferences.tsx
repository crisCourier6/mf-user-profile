import React, { useEffect, useState } from "react";
import { Button, Box, Alert, Paper, Grid, Switch, Snackbar, SnackbarCloseReason, AppBar, Toolbar, Typography} from '@mui/material';
import { useParams } from 'react-router-dom';
import api from "../api";
import { Allergen } from "../interfaces/allergen";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ImagesAllergens from "../images/ImagesAllergens";

const UserFoodPreferences: React.FC<{ isAppBarVisible: boolean }> = ({ isAppBarVisible }) => {
    const { id } = useParams()
    const token = window.sessionStorage.getItem("token") || window.localStorage.getItem("token")
    // const [userFoodPrefs, setUserFoodPrefs] = useState<Allergen[]>([]) 
    const [allergens, setAllergens] = useState<Allergen[]>([])
    const [sending, setSending] = useState(false)
    const [noChanges, setNoChanges] = useState(true)
    const [successOpen, setSuccessOpen] = useState(false)
    const url = "/profile/" + id + "/allergens"
    const url2 = "/profile/allergens"
    useEffect(()=>{
        document.title = "Mis preferencias alimenticias - EyesFood";
        api.get(url, {
            withCredentials: true,
             headers: {
                 Authorization: "Bearer " + token
             }
        })
        .then((response)=>{
            // setUserFoodPrefs(response.data)   
            let userPrefs = []
            for (let allergen of response.data){
                userPrefs.push(allergen.id)
            }
            if (window.sessionStorage.getItem("token")){
                window.sessionStorage.setItem("food-prefs", userPrefs.toString())
            }
            else{
                window.localStorage.setItem("food-prefs", userPrefs.toString())
            }
            api.get(url2, {
                withCredentials: true,
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            .then((response2)=>{
                setAllergens(response2.data)     
                let newAllergens:Allergen[] = []
                for (let allergen of response2.data){
                    for (let pref of response.data){
                        if (allergen.name === pref.name){
                            allergen.selected = true
                        }
                        
                    }
                    newAllergens.push(allergen)
                }
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
        for (let allergen of allergens){
            if(allergen.selected){
                allergenIdList.push(allergen.id)
            }
            
        }
        api.post(url, { allergenIdList: allergenIdList }, {
            withCredentials: true,
             headers: {
                 Authorization: "Bearer " + token
             }
        })
        .then(response => {
            if (window.sessionStorage.getItem("token")){
                window.sessionStorage.setItem("food-prefs", allergenIdList.toString())
            }
            else{
                window.localStorage.setItem("food-prefs", allergenIdList.toString())
            }
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
            flexDirection="column" 
            justifyContent="center"
            alignItems="center"
            sx={{width: "100vw", maxWidth:"1000px", gap:"5px", flexWrap: "wrap", pb: 7}}>
                <Box 
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    maxWidth: "500px",
                    position: 'sticky',
                    top: isAppBarVisible?"50px":"0px",
                    width:"100%",
                    transition: "top 0.3s",
                    backgroundColor: 'primary.dark',
                    zIndex: 100,
                    boxShadow: 3,
                    overflow: "hidden", 
                    borderBottom: "5px solid",
                    borderLeft: "5px solid",
                    borderRight: "5px solid",
                    borderColor: "secondary.main",
                    boxSizing: "border-box"
                  }}
                >
                    <Typography variant={isAppBarVisible?'h5':"h6"} width="100%" sx={{py:0.5}} color= "primary.contrastText">
                        Mis preferencias alimenticias
                    </Typography>
                    <Typography variant="subtitle1"  width="100%" sx={{py:0.5, display: isAppBarVisible?"none":"block"}} color= "warning.main">
                        Selecciona los alérgenos que deseas evitar
                    </Typography>
                </Box>
                <Paper 
                sx={{display: "flex", 
                    flexDirection: "row", 
                    alignItems: "center",
                    width: "90%", 
                    maxWidth: "500px",
                    border: "5px solid",
                    borderColor: "primary.dark",
                    bgcolor: "white",
                    color: "primary.contrastText"}}>
                        <InfoOutlinedIcon sx={{height:"100%", bgcolor: "white", color:"primary.main", px:"5px"}}/>
                        <Typography textAlign="justify" fontWeight="bold" fontSize={13} fontFamily="Montserrat" sx={{padding:1, bgcolor:"primary.main"}}>
                            Selecciona los <span style={{color: "orange"}}> alérgenos que deseas evitar </span> 
                            para que te alertemos de su presencia cuando 
                            veas el perfil de un alimento.
                        </Typography>

                </Paper>
                <Grid container display="flex" 
                flexDirection="row" 
                justifyContent="space-around"
                alignItems="stretch"
                sx={{width: "100%", gap:"5px", flexWrap: "wrap"}}
                >
                    {allergens.map(allergen => {
                        return (
                            <Box key={allergen.id} sx={{
                                display: "flex",
                                flexDirection: "column",
                                width: "25%",
                                maxWidth: "150px",
                                justifyContent: "stretch",
                                alignItems: "center", 
                                py:1
                            }}>  
                                <Box
                                    component="img"
                                    sx={{
                                    width: "50%"
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
                                            disabled={sending}
                                    />
                                </Box>
                                
                            </Box>           
                        )

                    })}
                </Grid>
                
                
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
                    sx={{bottom: "10vh"}}
                    >
                    <Alert
                        severity="success"
                        variant="filled"
                        action={
                            <Button color="inherit" size="small" onClick={handleSuccessClose}>
                              OK
                            </Button>
                        }
                        sx={{ width: '100%',
                            bgcolor: "secondary.main",
                            color: "secondary.contrastText",
                            
                         }}
                    >
                        Preferencias actualizadas!
                    </Alert>
                </Snackbar>  
                
            </Grid>
  
}

export default UserFoodPreferences