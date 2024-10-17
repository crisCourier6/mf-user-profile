import React from "react";
import { useNavigate } from 'react-router-dom';
import api from "../api";
import { useEffect, useState } from 'react';
import { Allergen } from "../interfaces/allergen";

const UserFoodPreferencesMini: React.FC = () => {
    const navigate = useNavigate()
    const id = window.localStorage.id
    const [userFoodPrefs, setUserFoodPrefs] = useState<Allergen[]>([]) 
    const url = "/profile/" + id + "/allergens"
    useEffect(()=>{
        api.get(url, {
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