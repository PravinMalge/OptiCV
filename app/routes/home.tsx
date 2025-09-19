import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "constants";
import ResumeCard from "~/components/ResumeCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "OptiCV" },
    { name: "description", content: "Welcome to OptiCV!" },
  ];
}

export default function Home() {
  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">

    <Navbar />
    <section className="main-section">
      <div className="page-heading">
        <h1>Track Your Applications & Resume Rating</h1>
        <h2>Review your submissions and check AI-powered feedback.</h2>
      </div>

  {resumes?.length > 0 && (
    <div className="resumes-section">
    {resumes.map((resume, index) => (
      <div key={index}>
        <ResumeCard resume={resume} />
      </div>
    ))}
  </div>
)}
</section>
  </main>
}
