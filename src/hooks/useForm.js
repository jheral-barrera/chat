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
        handleResetForm,
        handleEmojiClick
    }
}


