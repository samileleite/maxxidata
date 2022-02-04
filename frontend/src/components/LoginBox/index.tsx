import { useEffect } from 'react';
import { api } from '../../sevices/api';
import styles from './styles.module.scss';

type AuthResponse = {
    token: string;
}

export function LoginBox() {
    const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=5abcd31b393c2e06a2d1&redirect_uri=http://localhost:3000`;

    async function signIn(githubCode: string) {
        const response = await api.post<AuthResponse>('authenticate', {
            code: githubCode,
        })
        const { token } = response.data;

        localStorage.setItem('@maxxidataTeste: token', token);


    }

    useEffect(() => {
        const url = window.location.href;
        const hasGithubCode = url.includes('?code=')

        if (hasGithubCode) {
            const [urlWithoutCode, githubCode] = url.split('?code=');

            window.history.pushState({}, '', urlWithoutCode);
            signIn(githubCode);
        }
    }, [])

    return (
        <div className={styles.loginBoxWrapper}>
            <strong>Faça Login com o Github</strong>
            <a href={signInUrl} className={styles.signInWithGithub}>
                Entrar com Gitub
            </a>
        </div>
    )
}