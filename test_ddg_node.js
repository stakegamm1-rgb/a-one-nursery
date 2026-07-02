async function getDDGImage(query) {
    try {
        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        };
        const res = await fetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`, { headers });
        const html = await res.text();
        const vqdMatch = html.match(/vqd=['"]?([^&'"\s]+)/);
        if (!vqdMatch) {
            console.log("No vqd");
            return;
        }
        const vqd = vqdMatch[1];
        
        const params = new URLSearchParams({
            l: 'us-en',
            o: 'json',
            q: query,
            vqd: vqd,
            f: ',,,',
            p: '1',
            v7exp: 'a'
        });
        
        const imgRes = await fetch(`https://duckduckgo.com/i.js?${params.toString()}`, { headers });
        const data = await imgRes.json();
        if (data.results && data.results.length > 0) {
            console.log(data.results[0].image);
        } else {
            console.log("No results");
        }
    } catch(e) {
        console.error(e);
    }
}
getDDGImage("Jamun fruit on tree");
