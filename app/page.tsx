import Location from "./components/icons/Location";
import IconBulletText from "./components/home/IconBulletText";
import User from "./components/icons/User";
import { projects } from "app/constants/project";
import ProjectCard from "./components/home/ProjectCard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 sm:p-24 bg-neutral-900 text-neutral-100">
      <div className="z-10 w-full max-w-5xl font-mono text-sm">
        <h1 className="text-3xl mb-4">Jerry Lee</h1>
        <div className="flex gap-6 mb-4">
          <IconBulletText icon={<Location />} text="San Francisco, CA" />
          <IconBulletText icon={<User />} text="Software Engineer" />
        </div>
        <div className="mb-12">
          <span>Building products to make businesses better.</span>
        </div>
        <div className="mb-4">
          <span>Here are the products I worked on...</span>
        </div>
        <div className="flex flex-col gap-4">
          {projects.map((project) => (
            <ProjectCard project={project} key={project.title} />
          ))}
        </div>
      </div>
    </main>
  );
}
