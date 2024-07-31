import { HoverEffect } from "@/components/ui/card-hover-effect";

export function Cards() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}

export const projects = [
  {
    title: "Dashboard",
    description: "Access your student dashboard to view your activities and progress.",
    link: "/student/dashboard",
    icon: "IconBrandTabler",
  },
  {
    title: "Courses",
    description: "View and manage your enrolled courses.",
    link: "/student/courses",
    icon: "IconUserBolt",
  },
  {
    title: "Enrollments",
    description: "Manage your course enrollments.",
    link: "/student/enrollments",
    icon: "IconUserPlus",
  },
  {
    title: "Assessments",
    description: "View and complete your assessments.",
    link: "/student/assessments",
    icon: "IconFileText",
  },
  {
    title: "Grades",
    description: "Check your grades and academic performance.",
    link: "/student/grades",
    icon: "IconCertificate",
  },
  {
    title: "Discussions",
    description: "Participate in course discussions.",
    link: "/student/discussions",
    icon: "IconMessageCircle",
  },
];
