import AsyncStorage from "@react-native-async-storage/async-storage"

export default function useLocalStorage() {

    const fnSetStorage =async(key, data)=>{
        await AsyncStorage.setItem(key, JSON.stringify(data));
    };

    const fnGetStorage =async(key)=>{
        const data = await AsyncStorage.getItem(key);
        const optimizeData = await JSON.parse(data);
        return optimizeData;
    };

    return {
        fnSetStorage,
        fnGetStorage,
    }
}