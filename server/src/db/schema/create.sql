DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS topics CASCADE;
DROP TABLE IF EXISTS user_topics CASCADE;
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS answer_items CASCADE;
DROP TABLE IF EXISTS item_topics CASCADE;
CREATE TABLE users(id SERIAL PRIMARY KEY,name VARCHAR(255) NOT NULL,last_name VARCHAR(255) ,birth_date VARCHAR(20) ,gender VARCHAR(255),email VARCHAR(255) NOT NULL,password VARCHAR(255),profile_pic VARCHAR(255),country VARCHAR(255),region VARCHAR(255),city VARCHAR(255),referrer VARCHAR(255),type VARCHAR(255),relationship VARCHAR(255),family VARCHAR(255));
CREATE TABLE topics(id SERIAL PRIMARY KEY,topic VARCHAR(255) NOT NULL);
CREATE TABLE user_topics(id SERIAL PRIMARY KEY,user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, topic_id INTEGER REFERENCES topics(id) ON DELETE CASCADE);
CREATE TABLE items(id SERIAL PRIMARY KEY,creator_id INTEGER REFERENCES users(id) ON DELETE CASCADE,item VARCHAR(80) NOT NULL,time timestamp NOT NULL,approved BOOLEAN NOT NULL);
CREATE TABLE answer_items(id SERIAL PRIMARY KEY,item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,answer SMALLINT NOT NULL,date timestamp NOT NULL);
CREATE TABLE item_topics(id SERIAL PRIMARY KEY,item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,topic_id INTEGER REFERENCES topics(id) ON DELETE CASCADE);