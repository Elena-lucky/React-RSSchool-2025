import Link from 'next/link';

export default function ErrorPage() {
  return (
    <div>
      <h1>500 - Server-side error occurred</h1>
      <p>Sorry, something went wrong. Please try again later.</p>
      <Link href="/">Go back home</Link>
    </div>
  );
}
