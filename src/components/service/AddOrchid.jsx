import Http from "../utils/Http"

export const addOrchid = async(name,rating,isSpecial,img,color,origin,category) => {
    try {
        const res = await Http.httpRequest.post("Orchids", {
            name,
            rating,
            isSpecial,
            img,
            color,
            origin,
            category
        });
        return res.data;
    } catch (error) {
        return {
            errorCode: error.response ? error.response.status : 'NETWORK_ERROR',
            errorMessage: error.response ? error.response.data : error.message
        }
    }
}