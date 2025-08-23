/**
 * Smoothly scrolls to a section by ID
 * @param sectionId The ID of the section to scroll to
 * @param offset Optional offset from the top of the section (default: 0)
 */
export function scrollToSection(sectionId: string, offset: number = 0): void {
    const section = document.getElementById(sectionId);
    
    if (section) {
        const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
        
        window.scrollTo({
            top: sectionTop - offset,
            behavior: 'smooth'
        });
        
        // Update URL hash without triggering a scroll
        updateUrlHash(sectionId);
    }
}

/**
 * Updates the URL hash without triggering a scroll
 * @param sectionId The ID to set as the URL hash
 */
export function updateUrlHash(sectionId: string): void {
    const newUrl = window.location.pathname + (sectionId !== 'home' ? `#${sectionId}` : '');
    window.history.pushState({ path: newUrl }, '', newUrl);
}

/**
 * Scrolls to the section specified in the URL hash on page load
 * @param headerOffset Offset to account for fixed header height
 */
export function scrollToHashSection(headerOffset: number = 0): void {
    const hash = window.location.hash;
    
    if (hash) {
        // Remove the # character
        const sectionId = hash.substring(1);
        
        // Delay slightly to ensure the page is fully loaded
        setTimeout(() => {
            scrollToSection(sectionId, headerOffset);
        }, 100);
    }
}
