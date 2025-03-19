'use server'

export const loginAction = async (formData: FormData) => {
    try {
        const fd = {
            email: formData.get('email'),
            password: formData.get('password')
        }

        const res = await fetch('https://clean-n-click-production.up.railway.app/api/auth/user/login', {
            method: 'POST',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(fd)
        })

        const response = await res.json()
        return response
    } catch (error) {
        throw error
    }
}