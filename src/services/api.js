// src/services/api.js

const API_URL = "https://backend.dhsa.co.in"; // Point this to your Express backend

export const fetchTournaments = async () => {
  try {
    const response = await fetch(`${API_URL}/tournaments`);
    if (!response.ok) throw new Error("Failed to fetch tournaments");
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tournaments:", error);
    return []; 
  }
};

export const fetchMatches = async () => {
  try {
    const response = await fetch(`${API_URL}/matches`);
    if (!response.ok) throw new Error("Failed to fetch matches");
    
    const data = await response.json();
    
    // 1. Map backend database statuses to the Frontend UI expected strings
    const formattedMatches = data.map(match => ({
      ...match,
      status: match.is_live ? 'Live' 
            : match.status === 'Completed' ? 'Full Time' 
            : 'Upcoming',
      team1_name: match.team1_name || "TBD",
      team2_name: match.team2_name || "TBD"
    }));

    // 2. 🌟 THE FIX: Filter out matches that don't have a referee yet!
    return formattedMatches.filter(match => {
      // If it's an upcoming match, it MUST have a referee assigned to be shown to the public
      if (match.status === 'Upcoming') {
        return match.referee_id !== null;
      }
      
      // Always show Live and Full Time matches
      return true; 
    });

  } catch (error) {
    console.error("Error fetching matches:", error);
    return [];
  }
};

export const fetchMatchById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/matches/${id}`);
    if (!response.ok) throw new Error("Failed to fetch match details");
    
    const data = await response.json();
    
    // Map status for the details page
    data.status = data.is_live ? 'Live' 
                : data.status === 'Completed' ? 'Full Time' 
                : 'Upcoming';

    return data;
  } catch (error) {
    console.error(`Error fetching match ${id}:`, error);
    return null;
  }
};
