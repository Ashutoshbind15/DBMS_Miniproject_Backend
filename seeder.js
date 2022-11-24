export const initQueries = `DROP TABLE IF EXISTS Teacher;
DROP TABLE IF EXISTS Student;
DROP TABLE IF EXISTS Teaches;
DROP TABLE IF EXISTS Studies;
DROP TABLE IF EXISTS Department;
DROP TABLE IF EXISTS Subject;
DROP TABLE IF EXISTS Exam;

CREATE TABLE Teacher(
    id int PRIMARY KEY,
    name varchar(255),
    contact int,
    email varchar(255),
    department_id int
);

CREATE TABLE Department(
    id int PRIMARY KEY,
    name varchar(255),
    hod_id int,
    location varchar(255)
);

CREATE TABLE Subject(
    course_id int PRIMARY KEY,
    title varchar(255),
    department_id int,
    credits int
);

CREATE TABLE Student(
    rollnumber int PRIMARY KEY,
    department_id int,
    name varchar(255),
    contact int,
    email varchar(255)
);

CREATE TABLE Exam(
    id int PRIMARY KEY,
    subject_id int,
    duration int,
    date DATE,
    start TIME,
    end TIME,
    instructions varchar(255),
    requirements varchar(255),
    setter_id int,
    department_id int
);

CREATE TABLE Teaches(   
    id int PRIMARY KEY,
    teacher_id int,
    subject_id int,
    hours int,
    number_classes int
);

CREATE TABLE Studies(
    id int PRIMARY KEY,
    marks_till_now int,
    student_id int,
    attendance int,
    subject_id int
);

ALTER TABLE Student ADD FOREIGN KEY (department_id) REFERENCES Department(id);
ALTER TABLE Department ADD FOREIGN KEY (hod_id) REFERENCES Teacher(id);

ALTER TABLE Teaches ADD FOREIGN KEY (teacher_id) REFERENCES Teacher(id);
ALTER TABLE Teaches ADD FOREIGN KEY (subject_id) REFERENCES Subject(course_id);

ALTER TABLE Subject ADD FOREIGN KEY (department_id) REFERENCES Department(id);

ALTER TABLE Studies ADD FOREIGN KEY (student_id) REFERENCES Student(rollnumber);
ALTER TABLE Studies ADD FOREIGN KEY (subject_id) REFERENCES Subject(course_id);

ALTER TABLE Teacher ADD FOREIGN KEY (department_id) REFERENCES Department(id);

ALTER TABLE Exam ADD FOREIGN KEY (subject_id) REFERENCES Subject(course_id);
ALTER TABLE Exam ADD FOREIGN KEY (setter_id) REFERENCES Teacher(id);
ALTER TABLE Exam ADD FOREIGN KEY (department_id) REFERENCES Department(id);
`;
