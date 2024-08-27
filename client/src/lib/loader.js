import { defer } from "react-router-dom"
import apiRequest from "./apiRequest"

export const postLoader = async ({ request, params }) => {
    try {
        const result = await apiRequest.get(`/post/${params.id}`)

        return result.data?.data
    } catch (e) {
        console.log(e)
    }
}

export const listLoader = ({ request, params }) => {
    try {
        const query = request.url.split("?")[1];

        const promise = apiRequest.get(`/post?${query}`)

        return defer({
            postResponse: promise
        })
    } catch (e) {
        console.log(e)
    }
}