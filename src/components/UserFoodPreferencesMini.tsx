import React, { useEffect } from "react";
import api from "../api";

const UserFoodPreferencesMini: React.FC = () => {
    const id = window.localStorage.id
    const url = "/profile/" + id + "/allergens"
    useEffect(()=>{
        api.get(url, {
            withCredentials: true,
             headers: {
                 Authorization: "Bearer " + window.localStorage.token
             }
        })
        .then((response)=>{
            //setUserFoodPrefs(response.data)   
            let userPrefs = []
            for (let allergen of response.data){
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