-- Up Migration
CREATE TABLE people (
  id          INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name        VARCHAR(255) NOT NULL,
  age         INT NOT NULL,
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Down Migration
DROP TABLE people;
