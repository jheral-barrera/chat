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

    return {
        ...formState,
        formState,
        handleInputForm,
        handleResetForm
    }
}


