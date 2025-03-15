const form = document.getElementById("photo-form");
const gallery = document.getElementById("gallery");
const photoForm = document.getElementById("photo-form");

function showForm(isEditing = false) {
  photoForm.classList.add('visible');
  document.getElementById('form-title').textContent = isEditing ? 'Edit Photo' : 'Add New Photo';
  
  photoForm.scrollIntoView({ behavior: 'smooth' });
}

function hideForm() {
  photoForm.classList.remove('visible');
  form.reset();
  document.getElementById("photo-id").value = "";
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const photoId = document.getElementById("photo-id").value || `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const photo = {
        id: photoId,
        title: document.getElementById("title").value,
        date: document.getElementById("date").value,
        location: document.getElementById("location").value,
        imageUrl: document.getElementById("image-url").value,
        description: document.getElementById("description").value
    };

    let photos = JSON.parse(localStorage.getItem("photos")) || [];

    const existingIndex = photos.findIndex(p => p.id == photoId);
    if (existingIndex > -1) {
        photos[existingIndex] = photo;
    } else {
        photos.push(photo);
    }

    localStorage.setItem("photos", JSON.stringify(photos));
    renderPhotos(photos);
    hideForm();
});

function loadLocalData() {
    console.log("Loading local data...");
    clearGallery();
    const storedPhotos = JSON.parse(localStorage.getItem("photos")) || [];
    
    if (storedPhotos.length === 0) {
        document.getElementById("gallery").innerHTML = '<p>No photos found in local storage. Try loading remote data first, then try again.</p>';
        return;
    }

    renderPhotos(storedPhotos);
}

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM Content loaded");
    
    hideForm();
    
    document.getElementById('load-local').addEventListener('click', loadLocalData);
    document.getElementById('load-remote').addEventListener('click', loadRemoteData);
    
    document.getElementById('add-photo-btn').addEventListener('click', () => {
        form.reset();
        document.getElementById("photo-id").value = "";
        showForm(false);
    });
    
    document.getElementById('cancel-btn').addEventListener('click', (e) => {
        e.preventDefault();
        hideForm();
    });
    
    document.getElementById('gallery').addEventListener('edit-photo', function(event) {
        console.log("Edit photo event caught:", event.detail.id);
        if (event.detail && event.detail.id) {
            editPhoto(event.detail.id);
        } else {
            console.error("No photo ID provided for edit operation");
        }
    });
    
    document.getElementById('gallery').addEventListener('delete-photo', function(event) {
        console.log("Delete photo event caught:", event.detail.id);
        if (event.detail && event.detail.id) {
            deletePhoto(event.detail.id);
        } else {
            console.error("No photo ID provided for delete operation");
        }
    });
});

function clearGallery() {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = '';
}

async function loadRemoteData() {
    console.log("Fetching remote data...");
    clearGallery();
    try {
        const response = await fetch("https://api.jsonbin.io/v3/b/67d3bb4f8960c979a5714100");

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        
        const jsonData = await response.json();
        const remotePhotos = jsonData.record;
        
        remotePhotos.forEach((photo, index) => {
            if (!photo.id) {
                photo.id = `remote-${Date.now()}-${index}`;
            } else {
                photo.id = `${String(photo.id)}-${index}`;
            }
            console.log("Assigned ID to remote photo:", photo.id);
        });
        
        localStorage.setItem("photos", JSON.stringify(remotePhotos));
        
        renderPhotos(remotePhotos);
    } catch (error) {
        console.error(error.message);
        document.getElementById("gallery").innerHTML = `<p>Error loading remote data: ${error.message}</p>`;
    }
}

function deletePhoto(id) {
    console.log("Deleting photo with ID:", id);
    let photos = JSON.parse(localStorage.getItem("photos")) || [];
    
    console.log("Photos before deletion:", photos.length);
    console.log("Photo IDs before deletion:", photos.map(p => p.id).join(", "));
    
    photos = photos.filter(photo => String(photo.id) !== String(id));
    
    console.log("Photos after deletion:", photos.length);
    console.log("Photo IDs after deletion:", photos.map(p => p.id).join(", "));
    
    localStorage.setItem("photos", JSON.stringify(photos));
    renderPhotos(photos);
}

function editPhoto(photoId) {
    console.log("Editing photo with ID:", photoId);
    let photos = JSON.parse(localStorage.getItem("photos")) || [];
    const photo = photos.find(p => String(p.id) === String(photoId));

    if (photo) {
        document.getElementById("photo-id").value = photo.id;
        document.getElementById("title").value = photo.title;
        document.getElementById("date").value = photo.date;
        document.getElementById("location").value = photo.location;
        document.getElementById("image-url").value = photo.imageUrl;
        document.getElementById("description").value = photo.description;
        
        showForm(true);
    } else {
        console.error("Photo not found with ID:", photoId);
    }
}

function renderPhotos(photos) {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

    const idSet = new Set();
    photos = photos.map((photo, index) => {
        if (!photo.id || idSet.has(String(photo.id))) {
            photo.id = `photo-${Date.now()}-${index}`;
            console.log("Generated new unique ID:", photo.id);
        } else {
            idSet.add(String(photo.id));
        }
        return photo;
    });

    photos.forEach(photo => {
        const photoId = String(photo.id);
        console.log("Rendering photo with ID:", photoId);
        
        const photoCard = document.createElement("photo-card");
        photoCard.setAttribute('id', photoId);
        photoCard.setAttribute('title', photo.title || '');
        photoCard.setAttribute('date', photo.date || '');
        photoCard.setAttribute('location', photo.location || '');
        photoCard.setAttribute('image-url', photo.imageUrl || '');
        photoCard.setAttribute('description', photo.description || '');

        gallery.appendChild(photoCard);
    });
    
    localStorage.setItem("photos", JSON.stringify(photos));
}

const toggleButton = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);
themeIcon.textContent = savedTheme === "dark" ? "🌙" : "☀️";

toggleButton.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    themeIcon.textContent = newTheme === "dark" ? "🌙" : "☀️";
});