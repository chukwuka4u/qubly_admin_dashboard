import { storeToken, getToken } from "@/app/session";

async function req(method, uri, auth, params) {
    const headers = {}
    if (method == "POST" || method == "PATCH")
        headers["Content-Type"] = "application/json";
    try {
        const url = `https://queue-api-48vb.onrender.com/api/v1/admin/${uri}`
        const response = await fetch(url,
            {
                method: method,
                headers: {
                    ...headers,
                    ...auth,
                },
                body: params && JSON.stringify(params),
            }
        )
        const json = await response.json();
        console.log(json)
        return json
    }
    catch (e) {
        console.log("error -> " + e)
    }
}

async function new_admin(admin_name, organization, address, email, password, password_confirmation, ranking = "admin") {
    const params = { admin_name, organization, address, email, password, password_confirmation, ranking }
    const data = await req('POST', 'new_admin', undefined, params)
    storeToken((data.token))
    console.log(data)
    return data;
}
async function authenticate(email, password) {
    const params = { email, password }

    const data = await req('POST', 'authenticate', undefined, params)
    storeToken(data.token)
    console.log(data)
    return data ? true : false;
}
async function get_admin_pos_queues() {
    const token = getToken()
    console.log(getToken())
    console.log("token: ", token)
    const auth = {
        "Authorization": "Bearer " + token,
        "Seeker": "admin",
    }
    const data = await req('GET', 'pos_queues', auth, undefined)
    console.log(data)
    return data
}
async function create_new_pos_queue(form) {
    const token = getToken()
    const auth = {
        "Authorization": "Bearer " + token,
        "Seeker": "admin",
    }

    const params = { pos_queue: {} }
    params.pos_queue = form
    console.log(params)
    const data = await req('POST', 'pos_queues', auth, form)
    console.log(data)
    return data ? true : false;

}

export { new_admin, authenticate, get_admin_pos_queues, create_new_pos_queue }