async function getWikiImage(query) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${encodeURIComponent(query)}&origin=*`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        if (pageId !== "-1" && pages[pageId].original) {
            return pages[pageId].original.source;
        }
        
        // Try searching if exact title fails
        const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json&origin=*`;
        const searchRes = await fetch(searchUrl);
        const searchData = await searchRes.json();
        if (searchData.query.search.length > 0) {
            const bestTitle = searchData.query.search[0].title;
            const res2 = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${encodeURIComponent(bestTitle)}&origin=*`);
            const data2 = await res2.json();
            const pages2 = data2.query.pages;
            const pageId2 = Object.keys(pages2)[0];
            if (pageId2 !== "-1" && pages2[pageId2].original) {
                return pages2[pageId2].original.source;
            }
        }
    } catch(e) {
        console.error(e);
    }
    return null;
}

getWikiImage("Jamun tree").then(console.log);
getWikiImage("Snake plant").then(console.log);
