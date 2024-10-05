// Container element for post displaying
const postsSection = document.getElementById('posts-section');

// current page number, starting on 1
let page = 1;

// Number of posts per page
const postsToShow = 12; 

// Indicator for loading state - prevent multiple fetches
let isLoading = false; 

// Fetch posts from the fake API
async function fetchPosts(page, limit) {
    if (isLoading) return;
    isLoading = true;
    const url = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`;

    try {
        const response = await fetch(url);
        if (response.ok) {
            const posts = await response.json();
            displayPosts(posts);
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
    }

    isLoading = false;
}

// Function for displaying posts
function displayPosts(posts) {
    posts.forEach(post => {
        postsSection.insertAdjacentHTML('beforeend', `
            <div class="post-box">
                <h2>${post.title}</h2>
                <p>${post.body}</p>
            </div>
        `);
    });
}

// Initial fetch 
fetchPosts(page, postsToShow);

// Eventlistener for when you scroll to the bottom
window.addEventListener('scroll', () => {
    const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
    if (isBottom && !isLoading) {
        page++;
        fetchPosts(page, postsToShow); // Fetch the next set of posts
    }
});