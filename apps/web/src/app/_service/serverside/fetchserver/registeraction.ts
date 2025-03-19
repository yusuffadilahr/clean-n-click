'use server'

export const registerAction = async (formData: FormData) => {
    try {
        const data = {
            email: formData.get('email'),
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            phoneNumber: formData.get('phoneNumber')
        }

        const res = await fetch('https://clean-n-click-production.up.railway.app/api/auth/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            cache: 'no-store',
            body: JSON.stringify(data)
        })

        const response = await res.json()

        return response
    } catch (error) {
        throw error
    }
}