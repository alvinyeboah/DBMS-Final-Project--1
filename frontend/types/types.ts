import { IconType } from "react-icons";
export interface Department {
    department_id: number;
    department_name: string;
    department_description: string;
    updated_at: Date;
}

export interface Student {
    student_id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    date_of_birth: Date;
    created_at: Date;
    updated_at: Date;
}

export interface Staff {
    staff_id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    date_of_birth: Date;
    created_at: Date;
    updated_at: Date;
}

interface HoverEffectItem {
    title: string;
    description: string;
    link: string;
    icon: IconType;
  }
export type User = Student | Staff; // Combined type for convenience

export interface Course {
    course_id: number;
    course_name: string;
    course_description: string;
    assigned_staff: number;
    updated_at: Date;
    department_id: number;
}

export interface Module {
    module_id: number;
    course_id: number;
    module_name: string;
    module_description: string;
    updated_at: Date;
}

export interface Lesson {
    lesson_id: number;
    module_id: number;
    lesson_title: string;
    lesson_content: string;
    material_link?: string;
    updated_at: Date;
}

export interface Enrollment {
    enrollment_id: number;
    course_id: number;
    student_id: number;
    enrollment_date: Date;
    status: string;
}

export interface Assessment {
    assessment_id: number;
    course_id: number;
    assessment_type: string;
    title: string;
    description: string;
    due_date: Date;
    created_at: Date;
    updated_at: Date;
}

export interface Question {
    question_id: number;
    assessment_id: number;
    question_text: string;
    question_type: string;
    created_at: Date;
    updated_at: Date;
}

export interface Answer {
    answer_id: number;
    question_id: number;
    answer_text: string;
    is_correct: boolean;
    created_at: Date;
    updated_at: Date;
}

export interface Submission {
    submission_id: number;
    assessment_id: number;
    student_id: number;
    submission_date: Date;
    submission_grade: number;
    feedback?: string;
}

export interface Feedback {
    feedback_id: number;
    submission_id: number;
    feedback_text: string;
    created_at: Date;
    updated_at: Date;
}

export interface Discussion {
    discussion_id: number;
    course_id: number;
    title: string;
    content: string;
    created_by: number;
    created_at: Date;
    updated_at: Date;
}

export interface DiscussionReply {
    reply_id: number;
    discussion_id: number;
    staff_id: number;
    content: string;
    created_at: Date;
    updated_at: Date;
}

export interface Gradebook {
    gradebook_id: number;
    course_id: number;
    student_id: number;
    assessment_id: number;
    final_grade: number;
    graded_at: Date;
}

export interface CourseRegistration {
    registration_id: number;
    student_id: number;
    course_id: number;
    department_id: number;
    registration_date: Date;
}
