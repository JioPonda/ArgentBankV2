function recordOfTokenInLocalStorage(token,rememberMe) {

    if(rememberMe === true){        
        localStorage.setItem('token',token)
    }
    else {
        sessionStorage.setItem('token',token)
    }
}

function deleteTokenInLocalStorage() {
    
    //localStorage.removeItem('token')
    localStorage.clear();    
    sessionStorage.clear()
}

export {recordOfTokenInLocalStorage,deleteTokenInLocalStorage}