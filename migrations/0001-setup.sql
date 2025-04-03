CREATE TABLE IF NOT EXISTS
    User (
        id INTEGER PRIMARY KEY NOT NULL,
        username VARCHAR(50) NOT NULL UNIQUE,
        pin VARCHAR(6) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE IF NOT EXISTS
    Environment (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

DELETE FROM User;

INSERT INTO User
    (id, username, pin, email)
VALUES
    (1, "NXT_USR_1", "123456", "testing+1@flutteruki.com"),
    (2, "NXT_USR_2", "123456", "testing+2@flutteruki.com"),
    (3, "NXT_USR_3", "123456", "testing+3@flutteruki.com"),
    (4, "NXT_USR_4", "123456", "testing+4@flutteruki.com"),
    (5, "NXT_USR_5", "123456", "testing+5@flutteruki.com");