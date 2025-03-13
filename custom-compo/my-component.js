import { getMyComponentCSS } from './my-component-css.js';
class PhotoCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // HTML and inline style as template literals for easy modification
        const style = document.createElement('style');
        style.textContent = getMyComponentCSS();

        const title = this.getAttribute('title') || 'Untitled';
        const date = this.getAttribute('date') || 'Unknown Date';
        const location = this.getAttribute('location') || 'Unknown Location';
        const imageUrl = this.getAttribute('image-url') || '';
        const description = this.getAttribute('description') || 'No description available';

        // Template for component content
        this.innerHTML = '';
        this.appendChild(style);
        this.innerHTML += `
            <div class="simple-card">
                <hgroup>
                    <p class="date">${date}</p>
                    <h2 class="title">${title}</h2>
                    <p class="location">${location}</p>
                </hgroup>
                <picture>
                    <img src="${imageUrl}" alt="${title} - Photo taken in ${location}">
                </picture>
                <p class="description">${description}</p>
                <a href="${imageUrl}" target="_blank" class="view-full">View Full Image</a>
            </div>
        `;
        this.querySelector('.simple-card').addEventListener('click', () => this.doSomething());

    }
    doSomething() {
        const event = new CustomEvent('do-something', {
            bubbles: true
        });
        this.dispatchEvent(event);
    }
}

// Define the custom element
console.log("custom element defined");
customElements.define('photo-card', PhotoCard);