import React, { useEffect, useState } from "react";
import { Button, Box, Alert, Paper, Grid, Switch, Snackbar, SnackbarCloseReason, AppBar, Toolbar, Typography, CircularProgress, Checkbox} from '@mui/material';
import { useParams } from 'react-router-dom';
import api from "../api";
import { Allergen } from "../interfaces/allergen";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ImagesAllergens from "../images/ImagesAllergens";
import NavigateBack from "./NavigateBack";

const UserFoodPreferences: React.FC<{ isAppBarVisible: boolean }> = ({ isAppBarVisible }) => {
    const { id } = useParams()
    const token = window.sessionStorage.getItem("token") || window.localStorage.getItem("token")
    // const [userFoodPrefs, setUserFoodPrefs] = useState<Allergen[]>([]) 
    const [allergens, setAllergens] = useState<Allergen[]>([])
    const [sending, setSending] = useState(false)
    const [noChanges, setNoChanges] = useState(true)
    const [successOpen, setSuccessOpen] = useState(false)
    const usedAllergens = ["en:gluten", "en:milk", "en:eggs", "en:nuts", "en:peanuts", "en:sesame-seeds", 
                            "en:soybeans", "en:celery", "en:mustard", "en:lupin", "en:fish", "en:crustaceans", 
                            "en:molluscs", "en:sulphur-dioxide-and-sulphites"]
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
                    if (usedAllergens.includes(allergen.id)){
                        newAllergens.push(allergen)
                    }
                    
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
                    flexDirection: "row",
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
                    color: "primary.contrastText",
                    boxSizing: "border-box"
                  }}
                >
                    <Box sx={{display: "flex", flex: 1}}>
                        <NavigateBack/>
                    </Box>
                    <Box sx={{display: "flex", flex: 6}}>
                        <Typography variant='h6' width="100%"  color="primary.contrastText" sx={{py:1}}>
                            Preferencias alimenticias
                        </Typography>
                    </Box>
                    <Box sx={{display: "flex", flex: 1}}></Box>
                </Box>
                {/* <Paper 
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

                </Paper> */}
                <Grid container display="flex" 
                flexDirection="column" 
                justifyContent="center"
                alignItems="flex-start"
                sx={{width: "100%", maxWidth: "500px", gap:"5px", flexWrap: "wrap"}}
                >
                    <Typography variant="h6" sx={{ml: 1, mt:1}}>
                        Prefiero alimentos:
                    </Typography>
                    {allergens.map(allergen => {
                        return (
                            <Box 
                                key={allergen.id} 
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    width: "100%",
                                    maxWidth: "400px",
                                    justifyContent: "flex-start",
                                    alignItems: "center", 
                                    py: 1
                                }}
                                >  
                                <Checkbox 
                                    id={allergen.id.toString()}
                                    checked={!!allergen.selected}
                                    onChange={handleSwitchChange}
                                    disabled={sending}
                                    size="small"
                                />
                                <Typography variant="subtitle1" textAlign={"left"}>
                                    Sin {allergen.name}
                                </Typography>
                                <Box
                                    component="img"
                                    sx={{
                                        height: "24px",
                                        width: "auto",
                                        pl: 1
                                    }}
                                    alt={allergen.name}
                                    src={ImagesAllergens[allergen.id] ? ImagesAllergens[allergen.id] : null}
                                />
                                </Box>           
                        );
                    })}
                    
                </Grid>
                    <Button 
                    variant="text" 
                    onClick={handleSubmit} 
                    disabled={noChanges || sending}
                    sx={{
                        position: "fixed", 
                        bottom: 0, 
                        left: 0, 
                        right: 0, 
                        bgcolor: noChanges || sending ? "gray" : "secondary.main", 
                        color: noChanges || sending ? "primary.main" : "secondary.contrastText",
                        fontWeight: "bold", 
                        fontSize: 16,
                        width: "100%", 
                        textAlign: "center",
                        borderRadius: 0,
                        py: 1, // Adds vertical padding
                    }}
                    >
                    {sending
                        ? <>Guardando...</>
                        : <>Guardar cambios</>
                    }
                    </Button>
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