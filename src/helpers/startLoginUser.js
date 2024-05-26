import { loginWithEmailAndPassword } from "../(services)/firebase/providers";

export const startLoginUser = async ({ email, password }) => {
    const result = await loginWithEmailAndPassword({
        email,
        password
    });

    return result;
}
