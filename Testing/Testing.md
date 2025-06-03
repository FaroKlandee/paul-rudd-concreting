Test ID	Requirement	Test Description	Test Steps	Expected Result	Actual Result	Notes
TC_Mobile_001	FR-001	Landing Page	"1.Navigate to landing page
2. Inspect each section for legibility.
3. Interact with buttons for navigation.
4. Inspect visual and animations flow.
5. Inspect all elements in dark mode."	"1. Successfully loaded the landing page.
2. All texts and content are legible.
3. Buttons correctly navigate to predetermined destinations.
4.  Dark mode correctly displays all content in a darker theme with no conflict."	"1. Landing page successully loaded with no errors.
2. All texts and content are legible, gramatically correct.
3. All buttons correctly navigate users to stated destination.
4. Dark mode darkens the header logo (should stay the same similar to the footer logo)
5. Theme selection button too small and close to the contact us button.
6. Hero content still displays the scroll indicator even though the user is using mobile device.
7. Header of all pages is too large and obstructs all pages heading."	"Advice for errors.
#4 should not change the logo colour when in dark mode.
#5 Recommend centering the contact us button. Enlarging the theme selection button. Removing the contact number for mobile devices. 
#6 Remove the scroll indicator for mobile users.
#7  reduce the size and its container div for all pages.
Additional changes:
1. Automatically close the hamburger navigation menu once user selects another link in the menu."
