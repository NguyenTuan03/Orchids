import Http from "../utils/Http";

export const updateOrchid = async (id, updatedOrchidData) => {
    try {
        const res = await Http.httpRequest.put(`Orchids/${id}`,updatedOrchidData);
        return res.data;
    } catch (error) {
        return {
            errorCode: error.response ? error.response.status : 'NETWORK_ERROR',
            errorMessage: error.response ? error.response.data : error.message
        }
    }
};