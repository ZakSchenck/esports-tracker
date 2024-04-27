/**
 * Get all current and past CoD Matches
 * @returns {JSON}
 */
export const getCodMatches = async () => {
    const codMatches = 'https://api.pandascore.co/codmw/matches?token=Z_hTH_XNwAx5kf99Mq9bVr4_5cfFnSrXp9-PSLcFIXmERJO3TiY';
    
    try {
        const res = await fetch(codMatches);
        if (!res.ok) { 
            throw new Error(`HTTP error - status: ${res.status}`);
        }
        const data = await res.json();
        return data
    } catch (error) {
        console.error('Error receiving cod matches:', error);
    }
}

/**
 * Gets single cod match data
 * @param {Number} id 
 * @returns {JSON}
 */
export const getSingleCodMatch = async (id) => {
    const codMatch = `https://api.pandascore.co/codmw/matches?filter[id]=${id}&token=Z_hTH_XNwAx5kf99Mq9bVr4_5cfFnSrXp9-PSLcFIXmERJO3TiY`;

    try {
        const res = await fetch(codMatch);
        if (!res.ok) {
            throw new Error(`HTTP Error - status: ${res.status}`)
        }
        const data = await res.json();
        return data
    } catch (err) {
        console.error(`Error receiving cod match with the ID of ${id}:`, err);
    }
}