import { object, string } from 'yup'

export const registerUserValidationSchema = object().shape({
    email: string()
        .required('Email harap diisi!')
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Format email tidak valid')
        .test('no-whitespace', 'Email tidak boleh hanya terdiri dari spasi', (value: string | undefined) => !!value && !/^\s+$/.test(value))
        .trim(),

    firstName: string()
        .required('Nama depan harap diisi!')
        .matches(/^[A-Za-z]+$/, 'Format nama tidak valid')
        .test('no-whitespace', 'Harap diisi terlebih dahulu', (value: string | undefined) => !!value && !/^\s+$/.test(value))
        .trim(),

    lastName: string()
        .required('Nama belakang harap diisi!')
        .matches(/^[A-Za-z]+$/, 'Format nama tidak valid')
        .test('no-whitespace', 'Harap diisi terlebih dahulu', (value: string | undefined) => !!value && !/^\s+$/.test(value))
        .trim(),

    phoneNumber: string()
        .required('Nomor telepon harap diisi!')
        .matches(/^[0-9]+$/, 'Nomor telepon hanya boleh berisi angka')
        .min(10, 'Minimal 10 angka')
        .max(15, 'Maximal 15 angka')
        .test('no-whitespace', 'Nomor telepon tidak boleh hanya terdiri dari spasi', (value: string | undefined) => !!value && !/^\s+$/.test(value))
        .trim(),
});