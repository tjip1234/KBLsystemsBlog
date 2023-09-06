document.addEventListener('DOMContentLoaded', function() {

    let tagButtons = document.querySelectorAll('.tag-button');
    let selectedTags = [];

    tagButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            let tagName = this.textContent.trim();

            if(selectedTags.includes(tagName)) {
                selectedTags = selectedTags.filter(tag => tag !== tagName);
                this.classList.remove('selected');
            } else {
                selectedTags.push(tagName);
                this.classList.add('selected');
            }

            console.log('Selected tags: ', selectedTags);

            filterPosts();
        });
    });

    function filterPosts() {
        console.log("Filtering posts");
        
        // Get all the post elements
        let posts = document.querySelectorAll('.iframe-thing');
        console.log("Number of .post-body elements: " + posts.length);

        // Loop over each post
        posts.forEach(function(post) {
            // Get the tags for this post
            let postTags = post.getAttribute('data-tags').split(',');
            console.log("Post tags: ", postTags);

            // If there are no selected tags, show the post
            if(selectedTags.length === 0) {
                post.style.display = '';
            } else {
                // Otherwise, hide the post and check if it should be shown
                post.style.display = 'none';

                // If any of the selected tags is in this post's tags, show the post
                for(let tag of selectedTags) {
                    if(postTags.includes(tag)) {
                        post.style.display = '';
                        break; // No need to check the other tags
                    }
                }
            }
        });
    }
});

function applyDarkModeToIframes() {
    const iframes = document.querySelectorAll('iframe.iframe-thing');

    iframes.forEach(iframeElement => {
        iframeElement.onload = () => {
            try {
                const iframeContent = iframeElement.contentDocument || iframeElement.contentWindow.document;
                const body = iframeContent.body;

                if (localStorage.getItem('theme') === 'dark') {
                    body.classList.add('dark-mode');
                } else {
                    body.classList.remove('dark-mode');
                }
            } catch (error) {
                console.error("Failed to apply dark mode to an iframe:", error);
            }
        };

        // Force reload the iframe content to clear any cached versions
        iframeElement.src = iframeElement.src;
    });
}

function toggleDarkMode() {
    const bodyDocu = document.body;
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'dark') {
        bodyDocu.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    } else {
        bodyDocu.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    }

    applyDarkModeToIframes(currentTheme); // This ensures dark mode is applied to iframes when toggling
}

document.addEventListener('DOMContentLoaded', (event) => {
    const bodyDocu = document.body;
    const currentTheme = localStorage.getItem('theme');

    // Apply dark mode to the main document
    if (currentTheme === 'dark') {
        bodyDocu.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        bodyDocu.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }

    applyDarkModeToIframes(currentTheme); // Apply dark mode to iframes once the document loads
});



