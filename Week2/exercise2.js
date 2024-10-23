import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "nima",
    database: "author_db",
});

const main = async () => {
    try {
        console.log("Connected as id " + connection.threadId);

        await connection.query("use assignment");

        const dropTable = "DROP TABLE IF EXISTS research_paper";
        const dropTable2 = "DROP TABLE IF EXISTS research_paper_author";
        const dropTable3 = "DROP TABLE IF EXISTS mentors";
        const dropTable4 = "DROP TABLE IF EXISTS author_mentor";
        await connection.query(dropTable2);
        await connection.query(dropTable);
        await connection.query(dropTable4);
        await connection.query(dropTable3);

        const CreateTableResearchPaper = `
            CREATE TABLE IF NOT EXISTS research_paper (
                paper_id INT AUTO_INCREMENT PRIMARY KEY,
                paper_name VARCHAR(200) NOT NULL,
                conference_name VARCHAR(50) NOT NULL,
                author_id INT,
                publication_date DATE NOT NULL,
                university VARCHAR(100) NOT NULL,
                FOREIGN KEY (author_id) REFERENCES author(author_id)
            )`;

        const CreateTableResearchPaperAuthor = `
            CREATE TABLE IF NOT EXISTS research_paper_author (
                paper_id INT,
                author_id INT,
                FOREIGN KEY (paper_id) REFERENCES research_paper(paper_id),
                FOREIGN KEY (author_id) REFERENCES author(author_id)
            )`;

        const createTableMentors = `
            CREATE TABLE IF NOT EXISTS mentor (
                mentor_id INT AUTO_INCREMENT PRIMARY KEY,
                mentor_name VARCHAR(50) NOT NULL
            );`;

        const createTableAuthorMentor = `
            CREATE TABLE IF NOT EXISTS author_mentor (
                author_id INT,
                mentor_id INT,
                FOREIGN KEY (author_id) REFERENCES author(author_id),
                FOREIGN KEY (mentor_id) REFERENCES mentor(mentor_id)
            );`;

        await connection.query(CreateTableResearchPaper);
        await connection.query(CreateTableResearchPaperAuthor);
        await connection.query(createTableMentors);
        await connection.query(createTableAuthorMentor);
        console.log("Tables created");

        const insertDataToResearchPaper = `
            INSERT INTO research_paper (paper_name, conference_name, author_id, publication_date, university) VALUES 
            ('Are athletes good role models?', 'Sports', 1, '2021-01-01', 'Harvard University'),
            ('Do we need shorter working weeks?', 'Health', 5, '2019-11-04', 'University of Amsterdam'),
            ('Are universities becoming business-driven?', 'Socio-economic', 8, '2020-01-15', 'Maastricht University'),
            ('How does the government assess the health care needs of communities?', 'Health', 2, '2020-02-02', 'University of Amsterdam'),
            ('Cybersecurity: Can we really be safe?', 'Technology', 7, '2020-03-10', 'Stanford University'),
            ('The impact of climate change on agriculture', 'Environment', 3, '2020-04-21', 'University of California'),
            ('Artificial Intelligence: Opportunities and Threats', 'Technology', 9, '2021-05-05', 'MIT'),
            ('The role of social media in modern communication', 'Communication', 4, '2021-06-18', 'New York University'),
            ('Mental health awareness in schools', 'Health', 10, '2021-07-30', 'University of Toronto'),
            ('Urbanization and its effects on wildlife', 'Environmental Science', 6, '2021-08-25', 'University of Oxford'),
            ('Renewable energy: A sustainable future?', 'Energy', 11, '2021-09-10', 'University of Cambridge'),
            ('Gender equality in the workplace', 'Sociology', 5, '2021-10-12', 'University of Melbourne'),
            ('The rise of telemedicine', 'Health', 1, '2021-11-14', 'Harvard University'),
            ('Blockchain technology and its implications', 'Technology', 2, '2021-12-05', 'University of Sydney'),
            ('Cyberbullying: A growing concern', 'Education', 12, '2022-01-20', 'University of Michigan'),
            ('The importance of biodiversity', 'Environmental Science', 3, '2022-02-15', 'University of California'),
            ('Exploring the human genome', 'Genetics', 9, '2022-03-30', 'Johns Hopkins University'),
            ('The effects of social isolation on mental health', 'Health', 4, '2022-04-10', 'University of Chicago'),
            ('Artificial intelligence in healthcare', 'Health', 8, '2022-05-01', 'Stanford University'),
            ('The future of work: Remote vs. in-office', 'Business', 13, '2022-06-20', 'University of Pennsylvania'),
            ('Understanding climate policy', 'Environmental Science', 6, '2022-07-15', 'Yale University'),
            ('Education in the digital age', 'Education', 14, '2022-08-12', 'University of California'),
            ('Economic impact of the COVID-19 pandemic', 'Economics', 5, '2022-09-05', 'Harvard University'),
            ('The psychology of addiction', 'Psychology', 11, '2022-10-30', 'University of Toronto'),
            ('The role of technology in modern education', 'Education', 10, '2022-11-18', 'New York University'),
            ('Cultural impacts of globalization', 'Sociology', 15, '2022-12-01', 'University of Amsterdam'),
            ('Mental health and the workplace', 'Health', 7, '2023-01-15', 'University of Melbourne'),
            ('Sustainable urban development', 'Architecture', 2, '2023-02-20', 'MIT'),
            ('The influence of advertising on consumer behavior', 'Marketing', 9, '2023-03-18', 'University of Chicago'),
            ('Exploring renewable energy solutions', 'Energy', 12, '2023-04-10', 'University of California'),
            ('The effects of screen time on children', 'Health', 3, '2023-05-25', 'University of Toronto'),
            ('Emerging trends in cybersecurity', 'Technology', 8, '2023-06-30', 'Stanford University')
        `;

        const insertDataToResearchPaperAuthor = `
            INSERT INTO research_paper_author (paper_id, author_id) VALUES
            (1, 1),
            (2, 5),
            (3, 8),
            (4, 2),
            (5, 7),
            (6, 3),
            (7, 9),
            (8, 4),
            (9, 10),
            (10, 6),
            (11, 11),
            (12, 5),
            (13, 1),
            (14, 2),
            (15, 12),
            (16, 3),
            (17, 9),
            (18, 4),
            (19, 8),
            (20, 13),
            (21, 6),
            (22, 14),
            (23, 5),
            (24, 11),
            (25, 10),
            (26, 15),
            (27, 7),
            (28, 2),
            (29, 9),
            (30, 12),
            (31, 3),
            (32, 8)
        `;

        const insertDataToMentor = `
            INSERT INTO mentor (mentor_name) VALUES
            ('Dr. Smith'),      
            ('Dr. Johnson'),    
            ('Dr. Williams'),   
            ('Dr. Brown'),    
            ('Dr. Garcia'),    
            ('Dr. Martinez'),   
            ('Dr. Anderson'),   
            ('Dr. Taylor'),  
            ('Dr. Thomas');
        `;

        const insertDataToAuthorMentor = `
            INSERT INTO author_mentor (author_id, mentor_id) VALUES 
            (1, 1),
            (2, 2),
            (3, 3),
            (4, 4),
            (5, 5),
            (6, 6),
            (7, 1),
            (8, 7),
            (9, 8),
            (10, 9),
            (11, 2),
            (12, 3),
            (13, 4),
            (14, 5),
            (15, 6);
        `;

        await connection.query(insertDataToResearchPaper);
        await connection.query(insertDataToResearchPaperAuthor);
        await connection.query(insertDataToMentor);
        await connection.query(insertDataToAuthorMentor);
        console.log("Data inserted");
    } catch (error) {
        console.log("error:", error.message);
        console.log("error:", error.stack);
    } finally {
        await connection.end();
    }
};
main();