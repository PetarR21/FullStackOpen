CREATE TABLE blogs(
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

insert into blogs(author,url,title,likes) values ('Michael Chan','https://reactpatterns.com/','React patterns',7);
insert into blogs(author,url,title,likes) values ('Dan Abramov','https://overreacted.io/','Overreacted',5);
