const mysql = require('mysql2/promise'); 

// Create a connection to the MySQL database using async/await
(async function() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'hyfuser',
        password: 'nima'
    });

    try {
        console.log('Connected to MySQL');

        // Step 1: Drop and create the `meetup` database
        await connection.query('DROP DATABASE IF EXISTS meetup');
        console.log('Database dropped');

        await connection.query('CREATE DATABASE meetup');
        console.log('Database created');

        await connection.query('USE meetup');
        console.log('Using meetup database');

        // Step 2: Create the `Invitee` table
        const createInviteeTable = `
            CREATE TABLE IF NOT EXISTS Invitee (
                invitee_no INT AUTO_INCREMENT PRIMARY KEY,
                invitee_name VARCHAR(255) NOT NULL,
                invited_by VARCHAR(255) NOT NULL
            )
        `;
        await connection.query(createInviteeTable);
        console.log('Invitee table created');

        // Step 3: Create the `Room` table
        const createRoomTable = `
            CREATE TABLE IF NOT EXISTS Room (
                room_no INT AUTO_INCREMENT PRIMARY KEY,
                room_name VARCHAR(255) NOT NULL,
                floor_number INT
            )
        `;
        await connection.query(createRoomTable);
        console.log('Room table created');

        // Step 4: Create the `Meeting` table
        const createMeetingTable = `
            CREATE TABLE IF NOT EXISTS Meeting (
                meeting_no INT AUTO_INCREMENT PRIMARY KEY,
                meeting_title VARCHAR(255) NOT NULL,
                starting_time DATETIME,
                ending_time DATETIME,
                room_no INT,
                FOREIGN KEY (room_no) REFERENCES Room(room_no)
            )
        `;
        await connection.query(createMeetingTable);
        console.log('Meeting table created');

        // Step 5: Insert rows into `Invitee` table
        const inviteeData = `
            INSERT INTO Invitee (invitee_name, invited_by)
            VALUES 
                ('Alice', 'Bob'),
                ('Charlie', 'Dave'),
                ('Eve', 'Frank'),
                ('Grace', 'Heidi'),
                ('Ivan', 'Judy')
        `;
        await connection.query(inviteeData);
        console.log('Inserted data into Invitee table');

        // Step 6: Insert rows into `Room` table
        const roomData = `
            INSERT INTO Room (room_name, floor_number)
            VALUES 
                ('Conference Room A', 1),
                ('Conference Room B', 2),
                ('Main Hall', 1),
                ('Meeting Room C', 3),
                ('Workshop Room', 4)
        `;
        await connection.query(roomData);
        console.log('Inserted data into Room table');

        // Step 7: Insert rows into `Meeting` table
        const meetingData = `
            INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no)
            VALUES 
                ('Project Kickoff', '2024-10-10 09:00:00', '2024-10-10 10:00:00', 1),
                ('Team Standup', '2024-10-11 10:00:00', '2024-10-11 10:30:00', 2),
                ('Client Presentation', '2024-10-12 14:00:00', '2024-10-12 15:30:00', 3),
                ('Workshop', '2024-10-13 11:00:00', '2024-10-13 13:00:00', 4),
                ('Quarterly Review', '2024-10-14 15:00:00', '2024-10-14 17:00:00', 5)
        `;
        await connection.query(meetingData);
        console.log('Inserted data into Meeting table');

    } catch (err) {
        console.error('Error: ', err);
    } finally {
        await connection.end();
        console.log('Connection closed');
    }

})();
