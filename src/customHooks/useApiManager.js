import { useState } from "react";

export default function useApiManager() {

    const [isLoading, setIsLoading] = useState(false);

    const fnGetApi =async({url = "https://itunes.apple.com/search?term=star&country=au&media=movie&all"} = {})=>{
        try {

            setIsLoading(true);
            const response = await fetch(url);
            const responseJson = await response.json();
            setIsLoading(false);
            return responseJson;

        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    };
    
    return { 
        isLoading,
        fnGetApi
    }
}