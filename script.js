
document.querySelectorAll('.blog-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const articleUrl = this.getAttribute('href');  
        window.open(articleUrl, '_blank');

    });
});

window.onload = function() {
        const inIframe = window !== window.top;
        console.log(inIframe)
        if (inIframe) {
            document.querySelectorAll('.blog-link').forEach(link => {
                const fullArticle = link.parentNode.nextElementSibling;
                fullArticle.style.display = 'none';
            });
        }
        if (!inIframe){
            document.querySelectorAll('.blog-link').forEach(link => {
                link.remove()
            }); 
        }
};

     


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


