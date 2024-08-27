import apiRequest from "./apiRequest"

export const postLoader = async ({ request, params }) => {
    try {
        const result = await apiRequest.get(`/post/${params.id}`)

        return result.data?.data
    } catch (e) {
        console.log(e)
    }

}