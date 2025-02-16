"use client"

export default function ErrorPage({ error, reset }) {
    console.error(error); // Log the error (optional)

    return (
        <div className="h-screen d-flex flex-column justify-content-center align-items-center">
            <h1>Oops! Something went wrong.</h1>
            <p>We apologize for the inconvenience. Please try again later.</p>
        </div>
    );
}
