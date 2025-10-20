// This page is intentionally left blank.
// It acts as a catch-all route for submissions.
// The actual HTML content will be served by Next.js from the `public/submissions` directory
// if you place your files there.

// For this to work, you would typically place your static HTML files
// inside the `public/submissions/` directory.
// For example, if a user submits `ada/diwali.html`, you would place the file at
// `public/submissions/ada/diwali.html`, and Next.js would serve it.

// Since I cannot add files to the `public` directory, this route handler ensures
// that navigating to a submission URL doesn't result in a 404 error.

export default function SubmissionPage() {
  return null;
}
