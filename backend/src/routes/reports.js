import { Router } from "express";
import pool from "../db.js";

const router = Router();

function mapRow(row) {
  return {
    id: row.id,
    location: row.location,
    wasteType: row.waste_type,
    status: row.status,
    description: row.description,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

router.get("/", async (_request, response, next) => {
  try {
    const [rows] = await pool.query("SELECT * FROM reports ORDER BY id DESC");
    response.json({
      success: true,
      message: "Reports fetched successfully",
      data: rows.map(mapRow),
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (request, response, next) => {
  try {
    const {
      location,
      wasteType,
      status = "Pending",
      description,
    } = request.body;

    if (!location || !wasteType || !description) {
      return response.status(400).json({
        success: false,
        message: "location, wasteType, and description are required",
      });
    }

    const [result] = await pool.query(
      "INSERT INTO reports (location, waste_type, status, description) VALUES (?, ?, ?, ?)",
      [location, wasteType, status, description],
    );

    const [rows] = await pool.query("SELECT * FROM reports WHERE id = ?", [
      result.insertId,
    ]);

    response.status(201).json({
      success: true,
      message: "Report created successfully",
      data: mapRow(rows[0]),
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (request, response, next) => {
  try {
    const { id } = request.params;
    const { location, wasteType, status, description } = request.body;

    const [existingRows] = await pool.query(
      "SELECT * FROM reports WHERE id = ?",
      [id],
    );

    if (existingRows.length === 0) {
      return response.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    const currentReport = mapRow(existingRows[0]);
    const updatedLocation = location ?? currentReport.location;
    const updatedWasteType = wasteType ?? currentReport.wasteType;
    const updatedStatus = status ?? currentReport.status;
    const updatedDescription = description ?? currentReport.description;

    await pool.query(
      "UPDATE reports SET location = ?, waste_type = ?, status = ?, description = ? WHERE id = ?",
      [
        updatedLocation,
        updatedWasteType,
        updatedStatus,
        updatedDescription,
        id,
      ],
    );

    const [updatedRows] = await pool.query(
      "SELECT * FROM reports WHERE id = ?",
      [id],
    );

    response.json({
      success: true,
      message: "Report updated successfully",
      data: mapRow(updatedRows[0]),
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (request, response, next) => {
  try {
    const { id } = request.params;

    const [result] = await pool.query("DELETE FROM reports WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return response.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    response.json({
      success: true,
      message: "Report deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
