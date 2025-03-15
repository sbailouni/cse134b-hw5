export function getMyComponentCSS() {
    return `
                :root {
                    --grid-color:rgb(245, 245, 245);
                    --shadow-color: 0 4px 10px rgba(0, 0, 0, 0.1);
                }
                [data-theme="dark"] {
                    --grid-color: rgb(40, 40, 40);
                    --shadow-color: 0 4px 10px rgba(0, 0, 0, 0.47);
                }
                .simple-card {
                    display:flex;
                    position:relative;
                    flex-direction: column;
                    border-radius: 12px;
                    box-shadow: var(--shadow-color);
                    overflow: hidden;
                    max-width: 320px;
                    height: 100%;
                    text-align: center;
                    align-items: center;
                    justify-content: center;
                    background-color: var(--grid-color);
                    padding: 15px;
                    transition: transform 0.3s ease-in-out;
                }

                .simple-card img {
                    width: 100%;
                    height: auto;
                    max-height: 475px;
                    display: block;
                    border-radius: 8px;
                }

                hgroup {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 5px;
                    margin-bottom: 15px;
                    padding: 10px 0;
                }

                hgroup .date {
                    font-size: 0.9rem;
                    color: #888;
                    font-weight: 500;
                    margin: 0;
                }

                hgroup .title {
                    font-size: 1.4rem;
                    font-weight: bold;
                    color: var(--text-color, #222);
                    margin: 5px 0;
                }

                hgroup .location {
                    font-size: 1rem;
                    color: #555;
                    font-style: italic;
                    margin: 0;
                }

                .description {
                    padding: 10px;
                    font-size: 1rem;
                    line-height: 1.5;
                    color: #444;
                    text-align: center;
                    margin-bottom: 15px;
                }

                .view-full {
                    display: inline-block;
                    border: 1.5px solid var(--text-color, black);
                    text-transform: uppercase;
                    padding: 8px 16px;
                    border-radius: 25px;
                    color: var(--text-color, black);
                    background-color: transparent;
                    font-size: 0.9rem;
                    font-weight: bold;
                    transition: all 0.3s ease-in-out;
                    text-decoration: none;
                }

                .view-full:hover {
                    background-color: var(--text-color, black);
                    color: var(--site-color, white);
                }

                @media (max-width: 540px) {
                    hgroup .title {
                        font-size: 1rem;
                    }
                    hgroup .date {
                        font-size: 0.9rem;
                    }
                    hgroup .location {
                        font-size: 0.9rem;
                    }
                    .simple-card p {
                        font-size: 0.9rem;
                    }
                    .simple-card img {
                        width: 100%;
                        height:auto;
                        max-height: 375px;
                    }
                }
                `;
}