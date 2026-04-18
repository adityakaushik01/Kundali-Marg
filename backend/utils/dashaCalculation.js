export const DASHA_ORDER = [
  "Ketu",
  "Venus",
  "Sun",
  "Moon",
  "Mars",
  "Rahu",
  "Jupiter",
  "Saturn",
  "Mercury",
];

export const DASHA_YEARS = {
  Ketu: 7,
  Venus: 20,
  Sun: 6,
  Moon: 10,
  Mars: 7,
  Rahu: 18,
  Jupiter: 16,
  Saturn: 19,
  Mercury: 17,
};

const NAKSHATRA_SIZE = 13.3333333333;

//  Calculate remaining dasha at birth
export function calculateDashaBalance(degreeInNakshatra, dashaYears) {
  const remainingFraction =
    (NAKSHATRA_SIZE - degreeInNakshatra) / NAKSHATRA_SIZE;

  return remainingFraction * dashaYears;
}

//  Add years with precision (handles decimals properly)
function addYears(date, years) {
  const result = new Date(date);
  const days = years * 365.25; // better accuracy
  result.setTime(result.getTime() + days * 24 * 60 * 60 * 1000);
  return result;
}

//  Generate full Mahadasha timeline
export function generateMahadashaTimeline(
  birthDate,
  startLord,
  balanceYears
) {
  const timeline = [];

  let currentDate = new Date(birthDate);

  // First dasha (balance portion)
  let firstEnd = addYears(currentDate, balanceYears);

  timeline.push({
    lord: startLord,
    start: new Date(currentDate),
    end: new Date(firstEnd),
  });

  currentDate = firstEnd;

  const startIndex = DASHA_ORDER.indexOf(startLord);

  // Remaining full dashas
  for (let i = 1; i < DASHA_ORDER.length; i++) {
    const lord = DASHA_ORDER[(startIndex + i) % DASHA_ORDER.length];
    const years = DASHA_YEARS[lord];

    const endDate = addYears(currentDate, years);

    timeline.push({
      lord,
      start: new Date(currentDate),
      end: new Date(endDate),
    });

    currentDate = endDate;
  }

  return timeline;
}

// Get current Mahadasha
export function getCurrentDasha(timeline) {
  const now = new Date();

  return (
    timeline.find(
      (d) => now >= new Date(d.start) && now <= new Date(d.end)
    ) || null
  );
}

// Generate Antardashas for a given Mahadasha
export function generateAntardashas(mahadasha) {
  const lord = mahadasha.lord;
  const totalYears = DASHA_YEARS[lord];
  const startIndex = DASHA_ORDER.indexOf(lord);
  const antardashas = [];
  let currentDate = new Date(mahadasha.start);

  for (let i = 0; i < DASHA_ORDER.length; i++) {
    const antarLord = DASHA_ORDER[(startIndex + i) % DASHA_ORDER.length];
    const antarYears = (DASHA_YEARS[antarLord] * totalYears) / 120;
    const endDate = addYears(currentDate, antarYears);

    antardashas.push({
      lord: antarLord,
      start: new Date(currentDate),
      end: new Date(endDate),
    });

    currentDate = endDate;
  }

  return antardashas;
}

// Get current Antardasha
export function getCurrentAntardasha(timeline) {
  const now = new Date();
  const currentMaha = getCurrentDasha(timeline);
  if (!currentMaha) return null;

  const antardashas = generateAntardashas(currentMaha);
  return antardashas.find(a => now >= new Date(a.start) && now <= new Date(a.end)) || null;
}