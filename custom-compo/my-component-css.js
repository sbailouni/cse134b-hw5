export function getMyComponentCSS() {
    return `
                .simple-card {
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                    max-width: 300px;
                    text-align: left;
                }

                .simple-card img {
                    width: 100%;
                    height: auto;
                    display: block;
                }

                hgroup .date {
                    font-size: 0.9rem;
                    color: #888;
                    margin: 5px 0;
                }

                hgroup .title {
                    font-size: 1.2rem;
                    margin: 5px 0;
                }

                hgroup .location {
                    font-size: 0.9rem;
                    color: #555;
                    margin: 5px 0;
                }

                .description {
                    padding: 0 10px;
                    font-size: 0.95rem;
                    line-height: 1.4;
                    color: #444;
                    margin-bottom: 10px;
                }
                `;
}