-- ============================================================
-- PLACEMENT AND INTERNSHIP CELL DATABASE SCHEMA
-- ============================================================

-- Create ENUM types
CREATE TYPE public.gender_type AS ENUM ('Male', 'Female', 'Other');
CREATE TYPE public.coordinator_role AS ENUM ('Admin', 'Student Coordinator', 'Company Liaison');
CREATE TYPE public.application_status AS ENUM ('Pending', 'Reviewed', 'Interviewing', 'Offered', 'Rejected', 'Withdrawn');
CREATE TYPE public.offer_status AS ENUM ('Pending', 'Accepted', 'Rejected');
CREATE TYPE public.proficiency_level AS ENUM ('Beginner', 'Intermediate', 'Expert');
CREATE TYPE public.document_type AS ENUM ('Resume', 'Transcript', 'ID Proof', 'Certificates');
CREATE TYPE public.storage_type AS ENUM ('Local', 'Cloud');
CREATE TYPE public.user_type AS ENUM ('Student', 'Coordinator', 'System');
CREATE TYPE public.app_role AS ENUM ('student', 'recruiter', 'admin');

-- ============================================================
-- USER ROLES TABLE (for authentication)
-- ============================================================
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- ============================================================
-- 1. CORE ENTITIES
-- ============================================================

-- 1.1 Students Table
CREATE TABLE public.students (
    student_id VARCHAR(10) PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(15),
    major VARCHAR(50) NOT NULL,
    gpa NUMERIC(3,2),
    graduation_year INTEGER NOT NULL,
    date_of_birth DATE,
    gender gender_type,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view their own data"
  ON public.students FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all students"
  ON public.students FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Recruiters can view all students"
  ON public.students FOR SELECT
  USING (public.has_role(auth.uid(), 'recruiter'));

CREATE POLICY "Students can update their own data"
  ON public.students FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage students"
  ON public.students FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- 1.2 Companies Table
CREATE TABLE public.companies (
    company_id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    name VARCHAR(100) UNIQUE NOT NULL,
    industry VARCHAR(50),
    headquarters_location VARCHAR(100),
    contact_person_name VARCHAR(100),
    contact_person_email VARCHAR(100) UNIQUE,
    website VARCHAR(150),
    created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Companies can view their own data"
  ON public.companies FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all companies"
  ON public.companies FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Students can view all companies"
  ON public.companies FOR SELECT
  USING (public.has_role(auth.uid(), 'student'));

CREATE POLICY "Recruiters can update their own data"
  ON public.companies FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage companies"
  ON public.companies FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- 1.3 Placement Cell Coordinators Table
CREATE TABLE public.cell_coordinators (
    coordinator_id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    department VARCHAR(50),
    role coordinator_role NOT NULL,
    phone_number VARCHAR(15),
    created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE public.cell_coordinators ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all coordinators"
  ON public.cell_coordinators FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage coordinators"
  ON public.cell_coordinators FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- ============================================================
-- 2. JOB AND INTERNSHIP LISTINGS
-- ============================================================

-- 2.1 Internship Listings Table
CREATE TABLE public.internship_listings (
    internship_id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL REFERENCES public.companies(company_id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    stipend VARCHAR(50),
    duration_weeks INTEGER,
    start_date DATE,
    end_date DATE,
    min_gpa_required NUMERIC(3,2),
    is_active BOOLEAN DEFAULT TRUE,
    posted_by_coordinator_id INTEGER REFERENCES public.cell_coordinators(coordinator_id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE public.internship_listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view active internships"
  ON public.internship_listings FOR SELECT
  USING (is_active = TRUE OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'recruiter'));

CREATE POLICY "Recruiters can manage their company's internships"
  ON public.internship_listings FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.companies
      WHERE companies.company_id = internship_listings.company_id
      AND companies.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all internships"
  ON public.internship_listings FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- 2.2 Placement Listings Table
CREATE TABLE public.placement_listings (
    placement_id SERIAL PRIMARY KEY,
    company_id INTEGER NOT NULL REFERENCES public.companies(company_id) ON DELETE CASCADE,
    job_title VARCHAR(100) NOT NULL,
    description TEXT,
    salary_package VARCHAR(100),
    location VARCHAR(100),
    date_posted DATE NOT NULL,
    min_gpa_required NUMERIC(3,2),
    is_active BOOLEAN DEFAULT TRUE,
    posted_by_coordinator_id INTEGER REFERENCES public.cell_coordinators(coordinator_id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE public.placement_listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view active placements"
  ON public.placement_listings FOR SELECT
  USING (is_active = TRUE OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'recruiter'));

CREATE POLICY "Recruiters can manage their company's placements"
  ON public.placement_listings FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.companies
      WHERE companies.company_id = placement_listings.company_id
      AND companies.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all placements"
  ON public.placement_listings FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- ============================================================
-- 3. APPLICATION WORKFLOW
-- ============================================================

-- 3.1 Internship Applications
CREATE TABLE public.internship_applications (
    application_id SERIAL PRIMARY KEY,
    student_id VARCHAR(10) NOT NULL REFERENCES public.students(student_id) ON DELETE CASCADE,
    internship_id INTEGER NOT NULL REFERENCES public.internship_listings(internship_id) ON DELETE CASCADE,
    application_date DATE NOT NULL DEFAULT CURRENT_DATE,
    status application_status DEFAULT 'Pending',
    UNIQUE (student_id, internship_id)
);

ALTER TABLE public.internship_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view their own applications"
  ON public.internship_applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.students
      WHERE students.student_id = internship_applications.student_id
      AND students.user_id = auth.uid()
    )
  );

CREATE POLICY "Students can create their own applications"
  ON public.internship_applications FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.students
      WHERE students.student_id = internship_applications.student_id
      AND students.user_id = auth.uid()
    )
  );

CREATE POLICY "Recruiters can view applications for their internships"
  ON public.internship_applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.internship_listings il
      JOIN public.companies c ON c.company_id = il.company_id
      WHERE il.internship_id = internship_applications.internship_id
      AND c.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all applications"
  ON public.internship_applications FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- 3.2 Placement Applications
CREATE TABLE public.placement_applications (
    application_id SERIAL PRIMARY KEY,
    student_id VARCHAR(10) NOT NULL REFERENCES public.students(student_id) ON DELETE CASCADE,
    placement_id INTEGER NOT NULL REFERENCES public.placement_listings(placement_id) ON DELETE CASCADE,
    application_date DATE NOT NULL DEFAULT CURRENT_DATE,
    status application_status DEFAULT 'Pending',
    UNIQUE (student_id, placement_id)
);

ALTER TABLE public.placement_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view their own applications"
  ON public.placement_applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.students
      WHERE students.student_id = placement_applications.student_id
      AND students.user_id = auth.uid()
    )
  );

CREATE POLICY "Students can create their own applications"
  ON public.placement_applications FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.students
      WHERE students.student_id = placement_applications.student_id
      AND students.user_id = auth.uid()
    )
  );

CREATE POLICY "Recruiters can view applications for their placements"
  ON public.placement_applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.placement_listings pl
      JOIN public.companies c ON c.company_id = pl.company_id
      WHERE pl.placement_id = placement_applications.placement_id
      AND c.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all applications"
  ON public.placement_applications FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- 3.3 Internship Offers
CREATE TABLE public.internship_offers (
    offer_id SERIAL PRIMARY KEY,
    student_id VARCHAR(10) NOT NULL REFERENCES public.students(student_id) ON DELETE CASCADE,
    internship_id INTEGER NOT NULL REFERENCES public.internship_listings(internship_id) ON DELETE CASCADE,
    offer_date DATE NOT NULL,
    acceptance_status offer_status DEFAULT 'Pending',
    UNIQUE (student_id, internship_id)
);

ALTER TABLE public.internship_offers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view their own offers"
  ON public.internship_offers FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.students
      WHERE students.student_id = internship_offers.student_id
      AND students.user_id = auth.uid()
    )
  );

CREATE POLICY "Recruiters can manage offers for their internships"
  ON public.internship_offers FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.internship_listings il
      JOIN public.companies c ON c.company_id = il.company_id
      WHERE il.internship_id = internship_offers.internship_id
      AND c.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all offers"
  ON public.internship_offers FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- 3.4 Placement Offers
CREATE TABLE public.placement_offers (
    offer_id SERIAL PRIMARY KEY,
    student_id VARCHAR(10) NOT NULL REFERENCES public.students(student_id) ON DELETE CASCADE,
    placement_id INTEGER NOT NULL REFERENCES public.placement_listings(placement_id) ON DELETE CASCADE,
    offer_date DATE NOT NULL,
    acceptance_status offer_status DEFAULT 'Pending',
    UNIQUE (student_id, placement_id)
);

ALTER TABLE public.placement_offers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view their own offers"
  ON public.placement_offers FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.students
      WHERE students.student_id = placement_offers.student_id
      AND students.user_id = auth.uid()
    )
  );

CREATE POLICY "Recruiters can manage offers for their placements"
  ON public.placement_offers FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.placement_listings pl
      JOIN public.companies c ON c.company_id = pl.company_id
      WHERE pl.placement_id = placement_offers.placement_id
      AND c.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all offers"
  ON public.placement_offers FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- ============================================================
-- 4. SKILLS AND MATCHING
-- ============================================================

CREATE TABLE public.skills (
    skill_id SERIAL PRIMARY KEY,
    skill_name VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(50)
);

ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view skills"
  ON public.skills FOR SELECT
  USING (TRUE);

CREATE POLICY "Admins can manage skills"
  ON public.skills FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.student_skills (
    student_id VARCHAR(10) NOT NULL REFERENCES public.students(student_id) ON DELETE CASCADE,
    skill_id INTEGER NOT NULL REFERENCES public.skills(skill_id) ON DELETE CASCADE,
    proficiency_level proficiency_level NOT NULL,
    PRIMARY KEY (student_id, skill_id)
);

ALTER TABLE public.student_skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can manage their own skills"
  ON public.student_skills FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.students
      WHERE students.student_id = student_skills.student_id
      AND students.user_id = auth.uid()
    )
  );

CREATE POLICY "Everyone can view student skills"
  ON public.student_skills FOR SELECT
  USING (TRUE);

CREATE TABLE public.internship_required_skills (
    internship_id INTEGER NOT NULL REFERENCES public.internship_listings(internship_id) ON DELETE CASCADE,
    skill_id INTEGER NOT NULL REFERENCES public.skills(skill_id) ON DELETE CASCADE,
    is_mandatory BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (internship_id, skill_id)
);

ALTER TABLE public.internship_required_skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view required skills"
  ON public.internship_required_skills FOR SELECT
  USING (TRUE);

CREATE POLICY "Recruiters can manage skills for their internships"
  ON public.internship_required_skills FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.internship_listings il
      JOIN public.companies c ON c.company_id = il.company_id
      WHERE il.internship_id = internship_required_skills.internship_id
      AND c.user_id = auth.uid()
    )
  );

CREATE TABLE public.placement_required_skills (
    placement_id INTEGER NOT NULL REFERENCES public.placement_listings(placement_id) ON DELETE CASCADE,
    skill_id INTEGER NOT NULL REFERENCES public.skills(skill_id) ON DELETE CASCADE,
    is_mandatory BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (placement_id, skill_id)
);

ALTER TABLE public.placement_required_skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view required skills"
  ON public.placement_required_skills FOR SELECT
  USING (TRUE);

CREATE POLICY "Recruiters can manage skills for their placements"
  ON public.placement_required_skills FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.placement_listings pl
      JOIN public.companies c ON c.company_id = pl.company_id
      WHERE pl.placement_id = placement_required_skills.placement_id
      AND c.user_id = auth.uid()
    )
  );

-- ============================================================
-- 5. DOCUMENTATION AND AUDIT
-- ============================================================

CREATE TABLE public.student_documents (
    document_id SERIAL PRIMARY KEY,
    student_id VARCHAR(10) NOT NULL REFERENCES public.students(student_id) ON DELETE CASCADE,
    document_type document_type NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    storage_type storage_type DEFAULT 'Local',
    upload_date DATE NOT NULL DEFAULT CURRENT_DATE,
    UNIQUE (student_id, document_type)
);

ALTER TABLE public.student_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can manage their own documents"
  ON public.student_documents FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.students
      WHERE students.student_id = student_documents.student_id
      AND students.user_id = auth.uid()
    )
  );

CREATE POLICY "Recruiters can view student documents"
  ON public.student_documents FOR SELECT
  USING (public.has_role(auth.uid(), 'recruiter'));

CREATE POLICY "Admins can view all documents"
  ON public.student_documents FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.activity_log (
    log_id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP DEFAULT NOW(),
    user_type user_type,
    user_id VARCHAR(50),
    ip_address VARCHAR(45),
    activity_type VARCHAR(50) NOT NULL,
    affected_table VARCHAR(50),
    affected_row_id VARCHAR(50),
    description TEXT
);

ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all logs"
  ON public.activity_log FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- ============================================================
-- 6. INDEXES FOR PERFORMANCE
-- ============================================================

CREATE INDEX idx_student_major ON public.students (major);
CREATE INDEX idx_student_gpa ON public.students (gpa);
CREATE INDEX idx_company_name ON public.companies (name);
CREATE INDEX idx_listing_company ON public.internship_listings (company_id);
CREATE INDEX idx_listing_status ON public.placement_listings (is_active);
CREATE INDEX idx_int_app_status ON public.internship_applications (status);
CREATE INDEX idx_plc_app_status ON public.placement_applications (status);
CREATE INDEX idx_skill_name ON public.skills (skill_name);
CREATE INDEX idx_student_skill ON public.student_skills (student_id);

-- ============================================================
-- 7. TRIGGERS FOR UPDATED_AT
-- ============================================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_students_updated_at
    BEFORE UPDATE ON public.students
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();