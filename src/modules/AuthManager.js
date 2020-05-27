const baseUrl = "http://127.0.0.1:8000/"

const authManager = {
    loginUser(user) {
        return fetch(`${baseUrl}login/`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json", 
                "Accept": "application/json"
            }, 
            body: JSON.stringify(user)
        }).then(resp => resp.json())
    }, 
    registerUser(user) {
        return fetch(`${baseUrl}register/`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json", 
                "Accept": "application/json"
            }, 
            body: JSON.stringify(user)
        }).then(resp => resp.json())
    }
}

export default authManager;