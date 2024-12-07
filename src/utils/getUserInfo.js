export async function getUserInfo() {
    const response = await fetch('/api/info')
    const data = await response.json()
    return data
}