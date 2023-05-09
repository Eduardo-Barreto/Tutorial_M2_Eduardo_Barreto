CREATE TABLE curriculum (
  first_name text,
  last_name text,
  role text,
  picture_URL text,
  address text,
  phone_number text,
  email text,
  description text,
  curriculum_id integer PRIMARY KEY
);

  CREATE TABLE education (
  education_id integer PRIMARY KEY,
  curriculum_id integer,
  name text,
  description text,
  start_year integer,
  end_year integer,
  FOREIGN KEY (curriculum_id) REFERENCES curriculum (curriculum_id)
);

CREATE TABLE personalities (
  personality_id integer PRIMARY KEY AUTOINCREMENT,
  curriculum_id integer,
  name text,
  level integer,
  FOREIGN KEY (curriculum_id) REFERENCES curriculum (curriculum_id)
);

CREATE TABLE experiences (
  experience_id integer PRIMARY KEY AUTOINCREMENT,
  curriculum_id integer,
  company_name text,
  role text,
  description text,
  start_year integer,
  end_year integer,
  FOREIGN KEY (curriculum_id) REFERENCES curriculum (curriculum_id)
);

CREATE TABLE realizations (
  realization_id integer PRIMARY KEY AUTOINCREMENT,
  curriculum_id integer,
  name text,
  description text,
  year integer,
  FOREIGN KEY (curriculum_id) REFERENCES curriculum (curriculum_id)
);

CREATE TABLE habilities (
  hability_id integer PRIMARY KEY AUTOINCREMENT,
  curriculum_id integer,
  name text,
  level integer,
  FOREIGN KEY (curriculum_id) REFERENCES curriculum (curriculum_id)
);

COMMIT;