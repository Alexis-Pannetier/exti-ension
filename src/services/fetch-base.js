export default async function fetchBase(url) {
    return fetch(url)
        .then(async (response) => {
            const contentType = response?.headers.get("content-type");
            const contentTypeFormat = contentType?.split(";")[0];

            let content;
            switch (contentTypeFormat) {
                case "application/json":
                    content = await response.json();
                    break;
                case "text/html":
                default:
                    content = await response.text();
                    break;
            }

            if (contentTypeFormat === "text/html") {
                return getBodyContent(content);
            } else {
                return content;
            }
        });
}

// Wait loaded status page

function getBodyContent(content) {
    // Extraire le contenu du body
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");

    // Supprimer les balises <script> et <style>
    const scripts = doc.querySelectorAll("script");
    const styles = doc.querySelectorAll("style");

    scripts.forEach(script => script.remove());
    styles.forEach(style => style.remove());

    return doc.body.innerHTML;
}