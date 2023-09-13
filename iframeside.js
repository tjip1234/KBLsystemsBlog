document.addEventListener('DOMContentLoaded', function() {
    // Define possible subfolders
    const subfolders = ['openwrtSamba', 'Stm32'];

    const iframeContainer = document.getElementById("sidebar");

    // Loop through each subfolder and try to fetch the Preview.html
    subfolders.forEach(subfolder => {
        const previewPath = `../${subfolder}/${subfolder}Preview.html`;
        const dataTagsPath = `../${subfolder}/dataTags.txt`;

        // Fetch data tags first
        fetch(dataTagsPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch dataTags for ${subfolder}`);
                }
                return response.text();
            })
            .then(dataTags => {
                // Now try to fetch the preview file
                return fetch(previewPath, { method: 'HEAD' })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`No preview found for ${subfolder}`);
                        }
                        return { previewPath, dataTags };
                    });
            })
            .then(({ previewPath, dataTags }) => {
                // Create an iframe and add it to the container
                const iframe = document.createElement('iframe');
                iframe.src = previewPath;
                iframe.frameBorder = "0";
                iframe.className = "iframe-thing";
                iframe.setAttribute('data-tags', dataTags.trim());
                const currentTheme = localStorage.getItem('theme');
                iframe.onload = function() {
                    const currentTheme = localStorage.getItem('theme');
                    if (currentTheme === 'dark') {
                        iframe.contentWindow.document.body.classList.add('dark-mode');
                    }
                };
                iframeContainer.appendChild(iframe);
            })
            .catch(error => {
                console.error(error);
            });
    });
});
