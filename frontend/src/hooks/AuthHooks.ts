/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';

export default function useAuthHooks() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [captchaInput, setCaptchaInput] = useState<any>('');
    const [captchaCode, setCaptchaCode] = useState<any>('');

    const generateCaptcha = () => {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let captcha = '';
        for (let i = 0; i < 5; i++) {
            captcha += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return captcha;
    };

    const refreshCaptcha = (): void => {
        setCaptchaCode(generateCaptcha());
        setCaptchaInput('');
    };

    useEffect(() => {
        setCaptchaCode(generateCaptcha());
    }, []);

    const handleLogin = (): void => {
        if (captchaInput !== captchaCode) {
            alert('Kode CAPTCHA salah!');
            refreshCaptcha();
            return;
        }

        alert('Form siap diproses! Silakan tambahkan logic login Anda.');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "email") return setEmail(value);
        if (name === "password") return setPassword(value);
    }

    return {
        email,
        password,
        handleChange,
        handleLogin,
        captchaCode,
        refreshCaptcha,
        captchaInput,
        setCaptchaInput
    }
}
