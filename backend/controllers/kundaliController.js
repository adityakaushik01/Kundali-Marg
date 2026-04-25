import Kundali from "../models/Kundali.js";

export const getMyKundalis = async (req, res) => {
  try {
    const kundalis = await Kundali.find({ user_id: req.user.user_id })
      .select("_id name birth_details createdAt")  
      .sort({ createdAt: -1 });                 

    res.json({
      count:    kundalis.length,
      kundalis,
    });

  } catch (error) {
    console.error("getMyKundalis error:", error);
    res.status(500).json({ message: "Failed to fetch kundalis" });
  }
};

export const getKundaliById = async (req, res) => {
  try {
      
    const query = { _id: req.params.id };

    if (req.user.user_role !== "SUPER_ADMIN") {
      query.user_id = req.user.user_id;
    }

    const kundali = await Kundali.findOne(query);

    console.log("kundali by id", kundali);

    if (!kundali) {
      return res.status(404).json({ message: "Kundali not found" });
    }

    res.json(kundali);

  } catch (error) {
    console.error("getKundaliById error:", error);
    res.status(500).json({ message: "Failed to fetch kundali" });
  }
};

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

export const getAllKundalis = async (req, res) => {
  try {
    const kundalis = await Kundali.find()
      .select("_id name birth_details createdAt user_id")
      .sort({ createdAt: -1 });

    res.json({
      count: kundalis.length,
      kundalis,
    });

  } catch (error) {
    console.error("getAllKundalis error:", error);
    res.status(500).json({ message: "Failed to fetch kundalis" });
  }
};