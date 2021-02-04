export const getHomeScreenData = () => new Promise(async (resolve: (data: ApiResponse) => void, reject: any) => {
    try {

        const response = await fetchData();

        if (response.ok) {
            response.json().then((data: ApiResponse) => resolve(data));

        } else {
            reject(response)
        }

    } catch (exception) {
        reject(exception)
    }
})

export const fetchData = async () => {
    try {
        const response = await fetch('https://run.mocky.io/v3/2b067794-7df5-4b1a-8ea2-c30309349c2b');
        return response;

    } catch (exception) {
        return exception;
    }
}