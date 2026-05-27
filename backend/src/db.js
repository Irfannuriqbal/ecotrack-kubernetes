import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "ecotrack",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const seedReports = [
  {
    location: "Sukajadi Park",
    wasteType: "Plastic",
    status: "Pending",
    description: "Waste accumulation near the main gate.",
  },
  {
    location: "Green Market",
    wasteType: "Organic",
    status: "In Progress",
    description: "Food vendor waste scheduled for pickup.",
  },
  {
    location: "River Bank District",
    wasteType: "Mixed",
    status: "Cleaned",
    description: "Community cleanup was completed this morning.",
  },
];

export async function initializeDatabase() {
  const connection = await pool.getConnection();

  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS reports (
        id INT AUTO_INCREMENT PRIMARY KEY,
        location VARCHAR(150) NOT NULL,
        waste_type VARCHAR(50) NOT NULL,
        status ENUM('Pending', 'In Progress', 'Cleaned') NOT NULL DEFAULT 'Pending',
        description TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    const [rows] = await connection.query(
      "SELECT COUNT(*) AS total FROM reports",
    );
    if (rows[0].total === 0) {
      const values = seedReports.map((report) => [
        report.location,
        report.wasteType,
        report.status,
        report.description,
      ]);

      await connection.query(
        "INSERT INTO reports (location, waste_type, status, description) VALUES ?",
        [values],
      );
    }
  } finally {
    connection.release();
  }
}

export default pool;
