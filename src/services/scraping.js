export async function scrap() {
    const tab = await getCurrentTab();
    return await getBodyContent(tab.url);
}

export async function getCurrentTab() {
    try {
        const [tab] = await chrome.tabs.query({ active: true });
        if (!tab) return console.error("No active tab found");
        return tab;
    } catch (error) {
        return console.error('Error fetching page content:', error);
    }
}

export async function getBodyContent(url) {
    function onLoad() {
        return fetch(url, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            mode: 'no-cors',
        })
            .then((response) => {
                const contentType = response?.headers.get("content-type");
                const contentTypeFormat = contentType?.split(";")[0];

                let contentPromise;
                switch (contentTypeFormat) {
                    case "application/json":
                        contentPromise = response.json();
                        break;
                    case "text/html":
                    default:
                        contentPromise = response.text();
                        break;
                }

                return contentPromise.then((content) => {
                    if (contentTypeFormat === "text/html") {
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(content, "text/html");

                        // Supprimer les balises <script> et <style>
                        doc.querySelectorAll("script, style").forEach(el => el.remove());

                        // Manipuler le contenu du body directement ici
                        const bodyContent = doc.body.innerHTML;
                        return bodyContent;
                    } else {
                        return content;
                    }
                });
            })
            .catch((error) => {
                console.error("Erreur lors du fetch:", error);
            });
    }

    if (document.readyState === "complete" || document.readyState === "interactive") {
        return onLoad();
    } else {
        window.addEventListener("load", onLoad);
    }
}
