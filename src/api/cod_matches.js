export const getCodMatches = async () => {
    const codMatches = 'https://api.pandascore.co/codmw/matches?token=Z_hTH_XNwAx5kf99Mq9bVr4_5cfFnSrXp9-PSLcFIXmERJO3TiY';
    
    try {
        const res = await fetch(codMatches);
        if (!res.ok) { 
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        return data
    } catch (error) {
        console.error('Error receiving cod matches:', error);
    }
}