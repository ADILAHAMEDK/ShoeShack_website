import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { addFavorite, removeFavorite } from '../redux/UserSlice';
import { auth, db } from '../firebase/Config';

export const handleFavorite = async (itemData, dispatch) => {
    const user = auth.currentUser;
    if (!user) {
        toast.error("Please login to add favorites.");
        return;
    }

    const userId = user.uid;

    try {
        const userDocRef = doc(db, "users", userId);

        // Fetch the current user's favorites
        const userDocSnapshot = await getDoc(userDocRef);
        const userData = userDocSnapshot.exists() ? userDocSnapshot.data() : { favorites: [] };

        // Check if the item is already in favorites
        const favorites = userData.favorites || [];

        if(favorites.some((itemId) => itemId.id === itemData.id)) {
            // Item is already a favorite; remove it
            const updatedFavorites = favorites.filter((itemId) => itemId.id !== itemData.id);
            await updateDoc(userDocRef, { favorites: updatedFavorites });
            dispatch(removeFavorite(itemData));
            toast.info("Removed from Favorites");
        }else {
            // Item is not a favorite; add it
            const updatedFavorites = [...favorites, itemData];
            await updateDoc(userDocRef, { favorites: updatedFavorites });
            dispatch(addFavorite(itemData));
            toast.success("Added to Favorites");
        }
    }catch (error) {
        console.error(error);
        toast.error("Failed to update favorites. Please try again.");
    }
};