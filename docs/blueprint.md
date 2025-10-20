# **App Name**: Diwali Lights Showcase

## Core Features:

- Diya Submission: Allow users to submit their Diwali light designs, including name, message, HTML path, and optional PR URL for review.
- Unique HTML Path Validation: Validate that the submitted HTML path is unique to prevent duplicate entries in the Supabase database.
- Real-time Diya Grid Display: Display all submitted diyas in a responsive grid that updates in real-time using Supabase subscriptions.
- PR Merge Status Checker: Periodically check the merge status of submitted PR URLs using the GitHub API and update the corresponding diya's status.
- Interactive Diya Display: Allow users to click on diyas to view the associated HTML design, with a visual indication of whether the PR has been merged.
- Glowing Diya Animation: Implement a subtle glow and flicker animation for each diya to enhance the festive visual appeal, triggered on successful submission of the Diya.
- Festive UI/UX: Implement particles and floating sparkles and a tool that plays soft soundscapes on user's system while displaying diyas and updating status. Sound volume control included

## Style Guidelines:

- Primary color: Deep Indigo (#3F51B5), evoking a night sky filled with festive lights.
- Background color: Dark slate gray (#2C3E50) providing a sophisticated and dark background.
- Accent color: Amber (#FFC107) bright and festive color.
- Headline font: 'Poppins', sans-serif, for a modern and clean look.
- Body font: 'PT Sans', sans-serif, for readability and accessibility.
- Use glowing diya icons and festive symbols related to Diwali, keeping them consistent with the overall design.
- Subtle fade-in and scale animations for new diyas added to the grid, enhancing user engagement.