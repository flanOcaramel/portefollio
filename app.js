// Event listener for localStorage changes
window.addEventListener('storage', function(event) {
    if (event.key === 'projects') {
        loadRealisations();
    }
});

// Assuming loadRealisations function is defined to handle the updates when projects are modified.
// Additional code related to localStorage event handling can be included if necessary.