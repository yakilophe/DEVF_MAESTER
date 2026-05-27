let comentarios = [];

const commentForm = document.getElementById('commentForm');
const nameInput = document.getElementById('nameInput');
const commentInput = document.getElementById('commentInput');
const commentsList = document.getElementById('commentsList');
const commentCount = document.getElementById('commentCount');

function getCurrentDateTime() {
    const ahora = new Date();
    const dia = ahora.getDate().toString().padStart(2, '0');
    const mes = (ahora.getMonth() + 1).toString().padStart(2, '0');
    const anio = ahora.getFullYear();
    const hora = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    
    return `${dia}/${mes}/${anio} ${hora}:${minutos}`;
}

function updateCounter() {
    commentCount.textContent = `(${comentarios.length})`;
}

function showEmptyMessage() {
    if (comentarios.length === 0) {
        commentsList.innerHTML = '<div class="empty-message">No hay comentarios. Se el primero en comentar.</div>';
    }
}

function escapeHTML(texto) {
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
}

function renderComments() {
    if (comentarios.length === 0) {
        showEmptyMessage();
        updateCounter();
        return;
    }
    
    commentsList.innerHTML = '';
    
    comentarios.forEach(comentario => {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment-card';
        
        const esAnonimo = !comentario.nombre || comentario.nombre.trim() === '';
        const autorTexto = esAnonimo ? 'Anonimo' : comentario.nombre;
        const autorClass = esAnonimo ? 'anonymous' : '';
        
        commentDiv.innerHTML = `
            <div class="comment-header">
                <span class="comment-author ${autorClass}">${escapeHTML(autorTexto)}</span>
                <span class="comment-date">${comentario.fecha}</span>
            </div>
            <div class="comment-text">
                ${escapeHTML(comentario.texto)}
            </div>
            <button class="delete-btn" onclick="deleteComment(${comentario.id})">Eliminar</button>
        `;
        
        commentsList.appendChild(commentDiv);
    });
    
    updateCounter();
}

function addComment(event) {
    event.preventDefault();
    
    const nombre = nameInput.value.trim();
    const textoComentario = commentInput.value.trim();
    
    if (textoComentario === '') {
        alert('Por favor, escribe un comentario.');
        return;
    }
    
    const nuevoComentario = {
        id: Date.now(),
        nombre: nombre,
        texto: textoComentario,
        fecha: getCurrentDateTime()
    };
    
    comentarios.unshift(nuevoComentario);
    
    commentInput.value = '';
    nameInput.value = '';
    commentInput.focus();
    
    renderComments();
}

function deleteComment(id) {
    if (confirm('¿Eliminar este comentario?')) {
        comentarios = comentarios.filter(comentario => comentario.id !== id);
        renderComments();
    }
}

window.deleteComment = deleteComment;
commentForm.addEventListener('submit', addComment);

commentInput.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        commentForm.dispatchEvent(new Event('submit'));
    }
});

showEmptyMessage();
