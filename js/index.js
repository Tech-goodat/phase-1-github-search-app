Accept: application/vnd.github.v3+json
const form = document.querySelector("#github-form")
const userList =document.querySelector("#user-list")
const repoList =document.querySelector("#repos-list")

form.addEventListener("submit", (event) => {
    event.preventDefault()
    const search = event.target.search.value
    fetch(`https://api.github.com/search/users?q=${search}`)
    .then(response => response.json())
    .then(data => {
        data.items.forEach(user => {
            const userLi = document.createElement("li")
            userLi.innerHTML = `
            <h3>${user.login}</h3>
            <img src="${user.avatar_url}">
            <a href="${user.html_url}">Profile</a>
            `
            userList.append(userLi)
        })
    })
})

userList.addEventListener("click", (event) => {
    if (event.target.tagName === "H3") {
        const username = event.target.innerText
        fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(data => {
            repoList.innerHTML = ""
            data.forEach(repo => {
                const repoLi = document.createElement("li")
                repoLi.innerHTML = `
                <h3>${repo.name}</h3>
                <a href="${repo.html_url}">Repo Link</a>
                `
                repoList.append(repoLi)
            })
        })
    }
})



