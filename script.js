// Check if the page exists
async function checkPage(repoName) {
    try {
        const response = await fetch(`https://prashantstha308.github.io/${repoName}/`);
        return response.status;
    } catch (error) {
        console.log(`Error checking page for repo "${repoName}":`, error);
        return null;
    }
}

// Create text tile element
function createTextTile(repo) {
    const textContainer = document.createElement('section');
    textContainer.classList.add('tileText');

    const link = document.createElement('a');
    link.href = `${repo.html_url}`;
    link.target = '_blank';

    const heading = document.createElement('h3');
    heading.classList.add('repoName');
    heading.textContent = repo.name;
    link.appendChild(heading);
    
    const description = document.createElement('p');
    description.classList.add('repoDescription');
    description.textContent = repo.description || 'No description available';

    const language = document.createElement('p');
    language.classList.add('language');
    language.textContent = repo.language || 'Language not specified';

    textContainer.appendChild(link);
    textContainer.appendChild(description);
    textContainer.appendChild(language);

    return textContainer;
}

// Create a tile element for a repository and append it to the DOM
async function createTile(repo) {
    const container = document.querySelector(".project-list-main");

    const tile = document.createElement('div');
    tile.classList.add("project-tile");

    const textTile = createTextTile(repo);

    const pageStatus = await checkPage(repo.name);

    if (pageStatus === 200) {
        const projectBtn = document.createElement('button');
        projectBtn.classList.add('project-btn');
        projectBtn.textContent = 'Visit Webpage';
        projectBtn.onclick = () => {
            window.open(`https://prashantstha308.github.io/${repo.name}/`, '_blank');
        };
        tile.appendChild(projectBtn);
    }

    tile.appendChild(textTile);
    container.appendChild(tile);
}

// Fetch repositories for a user
async function fetchUserRepos() {
    const token = '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';

    try {
        const response = await fetch(`https://api.github.com/users/prashantStha308/repos`, {
            headers: {
                Authorization: `token ${token}`,
                Accept: 'application/vnd.github.v3+json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching repositories: ${response.statusText}`);
        }

        const repos = await response.json();
        for (let i = 0; i < 4; i++) {
            await createTile(repos[i]);
        }
    } catch (error) {
        console.error(error);
    }
}

fetchUserRepos();
