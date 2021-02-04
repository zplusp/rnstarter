export const getCoOrdinates = async () => {
    return await new Promise(resolve => setTimeout(() => { resolve({ lat: 37.78825, lng: -122.4324 }) }, 1000));
}