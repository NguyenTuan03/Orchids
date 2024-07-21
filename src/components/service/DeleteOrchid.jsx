import Http from "../utils/Http";

export const deleteOrchid = async (id) => {
    try {
        const res = await Http.httpRequest.delete(`Orchids/${id}`);
        return res.data;
    } catch (error) {
        return {
            errorCode: error.response ? error.response.status : 'NETWORK_ERROR',
            errorMessage: error.response ? error.response.data : error.message
        }
    }
};