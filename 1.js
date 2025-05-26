const searchInput = document.getElementById('search');
const autocomplete = document.getElementById('autocomplete');
const repoList = document.getElementById('repo-list');


searchInput.addEventListener('input', () => {
    const query = searchInput.value;


    fetch(`https://api.github.com/search/repositories?q=${(query)}&per_page=5`)
        .then(res => res.json())
        .then(data => {

            if (!data.items)  {
                alert('не найдено, либо нет ответа')
                return
            }


            data.items.forEach(repo => {
                const div = document.createElement('div')
                div.className = 'autocomplete-children'
                div.textContent = repo.name

                div.addEventListener('click', () => {
                    const container = document.createElement('div')
                    container.className = 'repo'

                    const info = document.createElement('div')
                    info.className = 'repo-info'
                    info.innerHTML = `Name: ${repo.name} <br> Owner: ${repo.owner.login}<br> Stars: ${repo.stargazers_count}`;

                    const delBtn = document.createElement('button')
                    delBtn.className = 'delete-btn'
                    delBtn.textContent = 'удалить'
                    delBtn.addEventListener('click', () => {
                        container.remove()
                    })


                    container.appendChild(info);
                    container.appendChild(delBtn)
                    repoList.appendChild(container);
                    autocomplete.innerHTML = ''
                    searchInput.value = ''

                })
                autocomplete.appendChild(div)
            })
        });
});