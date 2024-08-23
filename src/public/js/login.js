const form = document.getElementById("form");
form.addEventListener("submit",(e)=>{
    const email = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;
    const data = {email,password}
    fetch("api/sessions/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type":"application/json"
            ,"Authorization": `Bearer ${localStorage.getItem("authToken")}`
        }
    })
    .then(result => result.json())
    .then(json => {
        localStorage.setItem("authToken", json.token)
    })
    e.preventDefault()
})
