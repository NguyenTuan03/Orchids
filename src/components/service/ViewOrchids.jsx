import Http from "../utils/Http"

export const viewOrchids = async() => {
    try {
        const res = await Http.httpRequest.get("Orchids");
        return res.data;
    } catch (error) {
        return {
            errorCode: error.response ? error.response.status : 'NETWORK_ERROR',
            errorMessage: error.response ? error.response.data : error.message
        }
    }
}