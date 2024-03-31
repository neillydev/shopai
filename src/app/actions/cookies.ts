'use server';
import { cookies } from "next/headers";

export const set = (key: string, value: string) => {
    cookies().set(key, value, { path: '/', httpOnly: true, sameSite: 'strict' });
};

export const get = (key: string) => {
    return cookies().get(key);
};