/*
  # Create Placement Cell Management System Schema

  1. New Tables
    - `students` - Student profiles linked to auth users
    - `companies` - Company information
    - `cell_coordinators` - Placement cell staff
    - `placement_listings` - Job placement listings
    - `internship_listings` - Internship listings
    - `placement_applications` - Applications for placements
    - `internship_applications` - Applications for internships
    - `placement_offers` - Job offers
    - `internship_offers` - Internship offers
    - `skills` - Available skills
    - `student_skills` - Student skill proficiency
    - `placement_required_skills` - Required skills for placements
    - `internship_required_skills` - Required skills for internships
    - `student_documents` - Student uploaded documents
    - `user_roles` - User role assignments
    - `activity_log` - System activity logging

  2. Security
    - Enable RLS on all tables
    - Create policies for students, recruiters, and admin access
    - Policies enforce user authentication and data ownership
    - Admin users have full access
    - Students can only view and modify their own data
    - Recruiters can view relevant placement/internship data
*/

-- Create enums
CREATE TYPE app_role AS ENUM ('student', 'recruiter', 'admin');
CREATE TYPE application_status AS ENUM ('Pending', 'Reviewed', 'Interviewing', 'Offered', 'Rejected', 'Withdrawn');
CREATE TYPE offer_status AS ENUM ('Pending', 'Accepted', 'Rejected');
CREATE TYPE coordinator_role AS ENUM ('Admin', 'Student Coordinator', 'Company Liaison');
CREATE TYPE document_type AS ENUM ('Resume', 'Transcript', 'ID Proof', 'Certificates');
CREATE TYPE gender_type AS ENUM ('Male', 'Female', 'Other');
CREATE TYPE proficiency_level AS ENUM ('Beginner', 'Intermediate', 'Expert');
CREATE TYPE storage_type AS ENUM ('Local', 'Cloud');
CREATE TYPE user_type AS ENUM ('Student', 'Coordinator', 'System');

-- Create user_roles table
CREATE TABLE IF NOT EXISTS user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, role)
);

ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own role"
  ON user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON user_roles FOR SELECT
  TO authenticated
  USING ((SELECT role FROM user_roles WHERE user_id = auth.uid()) = 'admin'::app_role);

-- Create students table
CREATE TABLE IF NOT EXISTS students (
  student_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone_number text,
  date_of_birth date,
  gender gender_type,
  major text NOT NULL,
  graduation_year integer NOT NULL,
  gpa numeric(3,2),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE students ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own profile"
  ON students FOR SELECT
  TO authenticated
  USING (auth.uid() = student_id);

CREATE POLICY "Admins can view all student profiles"
  ON students FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::app_role
  ));

CREATE POLICY "Students can update own profile"
  ON students FOR UPDATE
  TO authenticated
  USING (auth.uid() = student_id)
  WITH CHECK (auth.uid() = student_id);

-- Create companies table
CREATE TABLE IF NOT EXISTS companies (
  company_id serial PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  name text NOT NULL UNIQUE,
  website text,
  industry text,
  headquarters_location text,
  contact_person_name text,
  contact_person_email text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view companies"
  ON companies FOR SELECT
  USING (true);

CREATE POLICY "Recruiters can insert companies"
  ON companies FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'recruiter'::app_role
  ));

CREATE POLICY "Company owners can update"
  ON companies FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::app_role
  ))
  WITH CHECK (user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::app_role
  ));

-- Create cell_coordinators table
CREATE TABLE IF NOT EXISTS cell_coordinators (
  coordinator_id serial PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone_number text,
  department text,
  role coordinator_role NOT NULL DEFAULT 'Student Coordinator',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE cell_coordinators ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view coordinators"
  ON cell_coordinators FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage coordinators"
  ON cell_coordinators FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::app_role
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::app_role
  ));

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  skill_id serial PRIMARY KEY,
  skill_name text NOT NULL UNIQUE,
  category text
);

ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view skills"
  ON skills FOR SELECT
  USING (true);

-- Create placement_listings table
CREATE TABLE IF NOT EXISTS placement_listings (
  placement_id serial PRIMARY KEY,
  company_id integer NOT NULL REFERENCES companies(company_id) ON DELETE CASCADE,
  posted_by_coordinator_id integer REFERENCES cell_coordinators(coordinator_id) ON DELETE SET NULL,
  job_title text NOT NULL,
  description text,
  location text,
  salary_package text,
  min_gpa_required numeric(3,2),
  is_active boolean DEFAULT true,
  date_posted date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE placement_listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active placements"
  ON placement_listings FOR SELECT
  USING (is_active = true OR EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role IN ('admin'::app_role, 'recruiter'::app_role)
  ));

CREATE POLICY "Coordinators can insert placements"
  ON placement_listings FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::app_role
  ));

CREATE POLICY "Coordinators can update own placements"
  ON placement_listings FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::app_role
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::app_role
  ));

-- Create internship_listings table
CREATE TABLE IF NOT EXISTS internship_listings (
  internship_id serial PRIMARY KEY,
  company_id integer NOT NULL REFERENCES companies(company_id) ON DELETE CASCADE,
  posted_by_coordinator_id integer REFERENCES cell_coordinators(coordinator_id) ON DELETE SET NULL,
  title text NOT NULL,
  description text,
  start_date date,
  end_date date,
  duration_weeks integer,
  stipend text,
  min_gpa_required numeric(3,2),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE internship_listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active internships"
  ON internship_listings FOR SELECT
  USING (is_active = true OR EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role IN ('admin'::app_role, 'recruiter'::app_role)
  ));

CREATE POLICY "Coordinators can insert internships"
  ON internship_listings FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::app_role
  ));

CREATE POLICY "Coordinators can update own internships"
  ON internship_listings FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::app_role
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::app_role
  ));

-- Create placement_applications table
CREATE TABLE IF NOT EXISTS placement_applications (
  application_id serial PRIMARY KEY,
  placement_id integer NOT NULL REFERENCES placement_listings(placement_id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
  status application_status DEFAULT 'Pending',
  application_date date NOT NULL DEFAULT CURRENT_DATE,
  UNIQUE(placement_id, student_id)
);

ALTER TABLE placement_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own applications"
  ON placement_applications FOR SELECT
  TO authenticated
  USING (student_id = auth.uid());

CREATE POLICY "Recruiters and admins can view applications"
  ON placement_applications FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role IN ('admin'::app_role, 'recruiter'::app_role)
  ));

CREATE POLICY "Students can create applications"
  ON placement_applications FOR INSERT
  TO authenticated
  WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students can withdraw applications"
  ON placement_applications FOR UPDATE
  TO authenticated
  USING (student_id = auth.uid())
  WITH CHECK (student_id = auth.uid());

-- Create internship_applications table
CREATE TABLE IF NOT EXISTS internship_applications (
  application_id serial PRIMARY KEY,
  internship_id integer NOT NULL REFERENCES internship_listings(internship_id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
  status application_status DEFAULT 'Pending',
  application_date date NOT NULL DEFAULT CURRENT_DATE,
  UNIQUE(internship_id, student_id)
);

ALTER TABLE internship_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own internship applications"
  ON internship_applications FOR SELECT
  TO authenticated
  USING (student_id = auth.uid());

CREATE POLICY "Recruiters and admins can view internship applications"
  ON internship_applications FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role IN ('admin'::app_role, 'recruiter'::app_role)
  ));

CREATE POLICY "Students can create internship applications"
  ON internship_applications FOR INSERT
  TO authenticated
  WITH CHECK (student_id = auth.uid());

-- Create placement_offers table
CREATE TABLE IF NOT EXISTS placement_offers (
  offer_id serial PRIMARY KEY,
  placement_id integer NOT NULL REFERENCES placement_listings(placement_id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
  acceptance_status offer_status DEFAULT 'Pending',
  offer_date date NOT NULL DEFAULT CURRENT_DATE,
  UNIQUE(placement_id, student_id)
);

ALTER TABLE placement_offers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own offers"
  ON placement_offers FOR SELECT
  TO authenticated
  USING (student_id = auth.uid());

CREATE POLICY "Recruiters and admins can view offers"
  ON placement_offers FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role IN ('admin'::app_role, 'recruiter'::app_role)
  ));

CREATE POLICY "Admins can create and update offers"
  ON placement_offers FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::app_role
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::app_role
  ));

CREATE POLICY "Students can accept or reject offers"
  ON placement_offers FOR UPDATE
  TO authenticated
  USING (student_id = auth.uid())
  WITH CHECK (student_id = auth.uid());

-- Create internship_offers table
CREATE TABLE IF NOT EXISTS internship_offers (
  offer_id serial PRIMARY KEY,
  internship_id integer NOT NULL REFERENCES internship_listings(internship_id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
  acceptance_status offer_status DEFAULT 'Pending',
  offer_date date NOT NULL DEFAULT CURRENT_DATE,
  UNIQUE(internship_id, student_id)
);

ALTER TABLE internship_offers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own internship offers"
  ON internship_offers FOR SELECT
  TO authenticated
  USING (student_id = auth.uid());

CREATE POLICY "Recruiters and admins can view internship offers"
  ON internship_offers FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role IN ('admin'::app_role, 'recruiter'::app_role)
  ));

CREATE POLICY "Admins can create and update internship offers"
  ON internship_offers FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::app_role
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::app_role
  ));

-- Create student_skills table
CREATE TABLE IF NOT EXISTS student_skills (
  student_id uuid NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
  skill_id integer NOT NULL REFERENCES skills(skill_id) ON DELETE CASCADE,
  proficiency_level proficiency_level NOT NULL,
  PRIMARY KEY(student_id, skill_id)
);

ALTER TABLE student_skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own skills"
  ON student_skills FOR SELECT
  TO authenticated
  USING (student_id = auth.uid());

CREATE POLICY "Admins can view all student skills"
  ON student_skills FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::app_role
  ));

CREATE POLICY "Students can manage own skills"
  ON student_skills FOR ALL
  TO authenticated
  USING (student_id = auth.uid())
  WITH CHECK (student_id = auth.uid());

-- Create placement_required_skills table
CREATE TABLE IF NOT EXISTS placement_required_skills (
  placement_id integer NOT NULL REFERENCES placement_listings(placement_id) ON DELETE CASCADE,
  skill_id integer NOT NULL REFERENCES skills(skill_id) ON DELETE CASCADE,
  is_mandatory boolean DEFAULT false,
  PRIMARY KEY(placement_id, skill_id)
);

ALTER TABLE placement_required_skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view placement skills"
  ON placement_required_skills FOR SELECT
  USING (true);

-- Create internship_required_skills table
CREATE TABLE IF NOT EXISTS internship_required_skills (
  internship_id integer NOT NULL REFERENCES internship_listings(internship_id) ON DELETE CASCADE,
  skill_id integer NOT NULL REFERENCES skills(skill_id) ON DELETE CASCADE,
  is_mandatory boolean DEFAULT false,
  PRIMARY KEY(internship_id, skill_id)
);

ALTER TABLE internship_required_skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view internship skills"
  ON internship_required_skills FOR SELECT
  USING (true);

-- Create student_documents table
CREATE TABLE IF NOT EXISTS student_documents (
  document_id serial PRIMARY KEY,
  student_id uuid NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
  document_type document_type NOT NULL,
  file_path text NOT NULL,
  storage_type storage_type DEFAULT 'Cloud',
  upload_date timestamptz DEFAULT now()
);

ALTER TABLE student_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own documents"
  ON student_documents FOR SELECT
  TO authenticated
  USING (student_id = auth.uid());

CREATE POLICY "Admins can view all documents"
  ON student_documents FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::app_role
  ));

CREATE POLICY "Students can manage own documents"
  ON student_documents FOR ALL
  TO authenticated
  USING (student_id = auth.uid())
  WITH CHECK (student_id = auth.uid());

-- Create activity_log table
CREATE TABLE IF NOT EXISTS activity_log (
  log_id serial PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  user_type user_type,
  activity_type text NOT NULL,
  description text,
  affected_table text,
  affected_row_id text,
  ip_address text,
  timestamp timestamptz DEFAULT now()
);

ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view activity logs"
  ON activity_log FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'::app_role
  ));

-- Create indexes for performance
CREATE INDEX idx_students_email ON students(email);
CREATE INDEX idx_students_graduation_year ON students(graduation_year);
CREATE INDEX idx_companies_name ON companies(name);
CREATE INDEX idx_placement_listings_company ON placement_listings(company_id);
CREATE INDEX idx_placement_listings_active ON placement_listings(is_active);
CREATE INDEX idx_internship_listings_company ON internship_listings(company_id);
CREATE INDEX idx_internship_listings_active ON internship_listings(is_active);
CREATE INDEX idx_placement_applications_student ON placement_applications(student_id);
CREATE INDEX idx_placement_applications_placement ON placement_applications(placement_id);
CREATE INDEX idx_internship_applications_student ON internship_applications(student_id);
CREATE INDEX idx_internship_applications_internship ON internship_applications(internship_id);
CREATE INDEX idx_placement_offers_student ON placement_offers(student_id);
CREATE INDEX idx_internship_offers_student ON internship_offers(student_id);

-- Create function for role checking
CREATE OR REPLACE FUNCTION has_role(_role app_role, _user_id uuid DEFAULT auth.uid())
RETURNS boolean AS $$
  SELECT EXISTS(
    SELECT 1 FROM user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$ LANGUAGE sql SECURITY DEFINER;
