import { getMyComponentCSS } from './custom-compo/my-component-css.js';

class PhotoCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const title = this.getAttribute('title') || 'Untitled';
        const date = this.getAttribute('date') || 'Unknown Date';
        const location = this.getAttribute('location') || 'Unknown Location';
        const imageUrl = this.getAttribute('image-url') || '';
        const description = this.getAttribute('description') || 'No description available';
        const photoId = this.getAttribute('id') || '';
        
        console.log("PhotoCard connected with ID:", photoId); 
        
        const style = document.createElement('style');
        style.textContent = getMyComponentCSS();
        document.head.appendChild(style);

        this.innerHTML = `
            <div class="simple-card">
                <div class="button-container">
                    <button class="edit-button" data-id="${photoId}">Edit</button>
                    <button class="delete-button" data-id="${photoId}">Delete</button>
                </div>
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

        this.querySelector('.edit-button').addEventListener('click', (e) => {
            e.stopPropagation();
            const id = e.target.getAttribute('data-id');
            console.log("Edit button clicked with ID:", id); 
            this.dispatchEvent(new CustomEvent('edit-photo', { 
                detail: { id: id }, 
                bubbles: true 
            }));
        });

        this.querySelector('.delete-button').addEventListener('click', (e) => {
            e.stopPropagation();
            const id = e.target.getAttribute('data-id');
            console.log("Delete button clicked with ID:", id); 
            this.dispatchEvent(new CustomEvent('delete-photo', { 
                detail: { id: id }, 
                bubbles: true 
            }));
        });
    }
}

customElements.define('photo-card', PhotoCard);