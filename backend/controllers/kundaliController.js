// backend/controllers/kundaliController.js
// Handles fetching saved kundalis for the dashboard.
// CREATE THIS FILE.

import Kundali from "../models/Kundali.js";

// ── GET /api/kundali/my ───────────────────────────────────────────────────────
// Returns all kundalis created by the logged-in user.
// Sorted newest first. Does NOT return full kundali_data (too large for a list).
// Frontend uses this to show the kundali list in dashboard.

export const getMyKundalis = async (req, res) => {
  try {
    const kundalis = await Kundali.find({ user_id: req.user.user_id })
      .select("_id name birth_details createdAt")   // exclude heavy kundali_data
      .sort({ createdAt: -1 });                      // newest first

    res.json({
      count:    kundalis.length,
      kundalis,
    });

  } catch (error) {
    console.error("getMyKundalis error:", error);
    res.status(500).json({ message: "Failed to fetch kundalis" });
  }
};

// ── GET /api/kundali/:id ──────────────────────────────────────────────────────
// Returns one full kundali by ID.
// Checks that it belongs to the logged-in user (security).
// Frontend uses this when user clicks a kundali to view it.

export const getKundaliById = async (req, res) => {
  try {
    const kundali = await Kundali.findOne({
      _id:     req.params.id,
      user_id: req.user.user_id,   // ← only owner can access
    });

    if (!kundali) {
      return res.status(404).json({ message: "Kundali not found" });
    }

    res.json(kundali);

  } catch (error) {
    console.error("getKundaliById error:", error);
    res.status(500).json({ message: "Failed to fetch kundali" });
  }
};

// ── DELETE /api/kundali/:id ───────────────────────────────────────────────────
// Deletes a kundali. Only owner can delete.

export const deleteKundali = async (req, res) => {
  try {
    const kundali = await Kundali.findOneAndDelete({
      _id:     req.params.id,
      user_id: req.user.user_id,
    });

    if (!kundali) {
      return res.status(404).json({ message: "Kundali not found" });
    }

    res.json({ message: "Kundali deleted successfully" });

  } catch (error) {
    console.error("deleteKundali error:", error);
    res.status(500).json({ message: "Failed to delete kundali" });
  }
};