import React, { useEffect } from "react";
import api from "../api";

const UserFoodPreferencesMini: React.FC = () => {
    const token = window.sessionStorage.getItem("token") || window.localStorage.getItem("token")
    const currentUserId = window.sessionStorage.getItem("id") || window.localStorage.getItem("id")
    const url = "/profile/" + currentUserId + "/allergens"
    useEffect(()=>{
        api.get(url, {
            withCredentials: true,
             headers: {
                 Authorization: "Bearer " + token
             }
        })
        .then((response)=>{
            //setUserFoodPrefs(response.data)   
            let userPrefs = []
            for (let allergen of response.data){
                userPrefs.push(allergen.id)
            }
            if (window.sessionStorage.getItem("token")){
                window.sessionStorage.setItem("food-prefs", userPrefs.toString())
            }
            else {
                window.localStorage.setItem("food-prefs", userPrefs.toString())
            }
        })
    },[])
    return (
        <></>
    )
}

export default UserFoodPreferencesMini