import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites, selectedFavoriteSelector } from "../redux/FavoriteReducer";

export default function useFavoriteManager() {

    const dispatch = useDispatch();
    const favoritesList = useSelector(selectedFavoriteSelector);

    const fnIsAlreadyInFavorite =(id)=> favoritesList?.find((item) => item?.id == id);

    const fnAddOrRemoveFromFavorites = (item, id) => {

        const isAlreadyInFavorite = favoritesList?.find((item) => item?.id == id);

        if (isAlreadyInFavorite) {
            dispatch(removeFromFavorites(id));
        } else {
            dispatch(addToFavorites({ ...item, id: id }));
        }
    };

    return {
        favoritesList,

        fnIsAlreadyInFavorite,
        fnAddOrRemoveFromFavorites
    }
}