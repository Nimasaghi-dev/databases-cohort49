import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "nima",
    database: "author_db",
});

const main = async () => {
    try {
        const queries = [
            {
                description: "All authors and their corresponding mentors",
                query:
                    "SELECT author.author_name, mentor.mentor_name FROM author JOIN mentor ON author.mentor = mentor.mentor_id",
            },
            {
                description: "All authors and the title of their published papers.",
                query:
                    "SELECT author.author_name, research_paper.paper_name FROM author LEFT JOIN research_paper ON author.author_id = research_paper.author_id",
            },
        ];

        for (const { description, query } of queries) {
            console.log(description);
            const [rows] = await connection.query(query);
            console.table(rows);
        }
    } catch (error) {
        console.log("error:", error.message);
        console.log("error:", error.stack);
    } finally {
        await connection.end();
    }
};

main();