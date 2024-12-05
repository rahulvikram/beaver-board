export async function getUserInfo() {
    const response = await fetch('/info')
    const data = await response.json()
    return data
}