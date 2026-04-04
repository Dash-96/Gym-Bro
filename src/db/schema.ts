export const schema = `
CREATE TABLE IF NOT EXISTS workouts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    workout_type varchar(255),
    workout_alias varchar(255),
    started_at datetime,
    finished_at datetime,
    notes text,
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS exercises (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    workout_id INTEGER,
    exercise_key varchar(255),
    excercise_name varchar(255),
    order_index INTEGER,
    created_at datetime DEFAULT CURRENT_TIMESTAMP
); 

  
CREATE TABLE IF NOT EXISTS sets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    exercise_id INTEGER,
    set_number INTEGER,
    reps INTEGER,
    weight DECIMAL(5,2),
    created_at datetime DEFAULT CURRENT_TIMESTAMP
); 

CREATE TABLE IF NOT EXISTS exercises_meta(
id INTEGER PRIMARY KEY AUTOINCREMENT,
exercise_key varchar(255),
exercise_name varchar(255),
target_muscle_group varchar(50)
);
`;
