CREATE TABLE blogs (id SERIAL PRIMARY KEY, author text, url text NOT NULL, title text NOT NULL,likes integer DEFAULT 0);
insert into blogs (author, url, title) values ('Aiden Pierce', 'http://example.com', 'Too many');
insert into blogs (author, url, title) values ('Mark Hunt', 'http://example.com', 'Hello World'
);