import mysql2 from "mysql2/promise";

const connection = await mysql2.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "nima",
    database: "author_db",
});
console.log("Connected as id " + connection.threadId);

const main = async () => {
    try {
        const queries = [
            {
                description: "All research papers and the id of authors",
                query:
                    "SELECT research_paper.paper_name, author.author_id FROM research_paper JOIN author ON research_paper.author_id = author.author_id",
            },
            {
                description: "Sum of the research papers published by all female authors",
                query:
                    "SELECT COUNT(research_paper.paper_id), author.gender FROM research_paper JOIN author ON research_paper.author_id = author.author_id WHERE author.gender = 'f';",
            },
            {
                description: "Average of the h-index of all authors per university",
                query:
                    "SELECT AVG(author.h_index), research_paper.university FROM author LEFT JOIN research_paper ON author.author_id = research_paper.author_id GROUP BY research_paper.university;",
            },
            {
                description: "Sum of the research papers of the authors per university",
                query:
                    "SELECT COUNT(research_paper.paper_id), research_paper.university FROM research_paper GROUP BY research_paper.university;",
            },
            {
                description: "All authors and the title of their published papers",
                query:
                    "SELECT MAX(author.h_index), MIN(author.h_index), research_paper.university FROM author JOIN research_paper ON author.author_id = research_paper.author_id GROUP BY research_paper.university;",
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
