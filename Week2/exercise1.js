import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "nima",
});

console.log("Connected as id " + connection.threadId);

const main = async () => {
    try {
        const dropDatabase = "DROP DATABASE IF EXISTS assignment";
        const createDatabase = "CREATE DATABASE IF NOT EXISTS assignment";

        await connection.query(dropDatabase);
        await connection.query(createDatabase);
        await connection.query("USE assignment");
        console.log("Database created");

        const createTableAuthor =
            "CREATE TABLE IF NOT EXISTS author (author_id INT AUTO_INCREMENT PRIMARY KEY, author_name VARCHAR(50) NOT NULL, date_of_birth DATE NOT NULL, h_index INT, gender ENUM('m', 'f') NOT NULL)";

        await connection.query(createTableAuthor);
        console.log("Table created");

        const addColumn = "ALTER TABLE author ADD COLUMN mentor INT";

        await connection.query(addColumn);
        console.log("Column added");

        const addConstraint =
            "ALTER TABLE author ADD CONSTRAINT mentor_fk FOREIGN KEY (mentor) REFERENCES author(author_id)";

        await connection.query(addConstraint);
        console.log("Constraint added");

        const insertQuery = `
            INSERT INTO author (author_name, date_of_birth, h_index, gender, mentor) VALUES
            ('Lubna', '1990-06-01', 10, 'f', 1),
            ('Salwa', '1991-12-01', 9, 'f', 2),
            ('Jim', '1992-11-01', 8, 'm', 3),
            ('Mo', '1993-12-20', 7, 'm', 4),
            ('Max', '1994-09-04', 6, 'm', 5),
            ('Alia', '1995-07-04', 5, 'f', 6),
            ('Seba', '1996-09-04', 4, 'f', 1),
            ('Ali', '1997-07-04', 3, 'm', 7),
            ('Sara', '1998-09-04', 2, 'f', 8),
            ('Saeed', '1999-07-04', 1, 'm', 9),
            ('Lamis', '1998-09-04', 2, 'f', 2),
            ('Hani', '1999-07-04', 1, 'm', 3),
            ('Lina', '1998-09-04', 2, 'f', 4),
            ('Hassan', '1999-07-04', 1, 'm', 5),
            ('Buthina', '1995-03-03', 8, 'f', 6);
        `;

        await connection.query(insertQuery);
        console.log("Data inserted");
    } catch (error) {
        console.log("error:", error.message);
        console.log("error:", error.stack);
    } finally {
        await connection.end();
    }
};

main();