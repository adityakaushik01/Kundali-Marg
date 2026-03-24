import { calculateAccurateKundali } from "../kundaliCalculator.js";

export const sampleKundali = async (req, res) => {
 
    try {
      const kundaliData = await calculateAccurateKundali({
        datetime: new Date('1990-06-15T14:30:00.000Z'),
        latitude: 28.6139,
        longitude: 77.2090,
        name: 'Sample User'
      });
      res.json(kundaliData);
    } catch (error) {
      console.error('Error generating sample kundali:', error);
      res.status(500).json({
        error: 'Sample calculation failed',
        message: error.message
      });
    }
};