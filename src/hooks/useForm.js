import { set } from "firebase/database";
import { useState } from "react";

export const useForm = ({ initialState = {} }) => {
    const [formState, setFormState ] = useState( initialState );

    const handleInputForm = ({ target }) => {
        const { name = '', value = '' } = target;

        setFormState({
            ...formState,
            [name]: value
        })
    }

    const handleImageForm =  ({ target }) => {
        if ( target.files.length === 0 ) return;
        const value = target.files[0];

        setFormState({
            ...formState,
            image: value,
            imageUrl: URL.createObjectURL(value),
        })
    }

    const handleResetForm = () => {
        setFormState( initialState );
    }

    const handleEmojiClick = ( emojiValue ) => {
        setFormState({
            ...formState,
            text: formState.text + emojiValue.emoji
        })
    }

    return {
        ...formState,
        formState,
        handleInputForm,
        handleImageForm,
        handleResetForm,
        handleEmojiClick
    }
}


