// Sélection des éléments du DOM
const form = document.querySelector('form');
const nameInput = document.querySelector('#name');
const commentInput = document.querySelector('#comment');
const commentList = document.querySelector('#comments__list');
const errorMessage = document.querySelector('#form__error');

// Gestion de la soumission du formulaire
form.addEventListener('submit', function (event) {
    event.preventDefault();

    const nameValue = nameInput.value.trim();
    const commentValue = commentInput.value.trim();

    const errors = [];

    if (nameValue.length < 2) {
        errors.push('Le nom doit contenir au moins 2 caractères.');
    }

    if (commentValue.length < 10) {
        errors.push('Le commentaire doit contenir au moins 10 caractères.');
    }

    // Si une règle n'est pas respectée : on affiche l'erreur et on arrête
    if (errors.length > 0) {
        errorMessage.textContent = errors.join(' ');
        errorMessage.classList.add('form__error--visible')
        return;
    }

    // Le formulaire est valide : on efface une éventuelle erreur précédente
    errorMessage.textContent = '';
    errorMessage.classList.remove('form__error--visible');

    addComment(nameValue, commentValue);

    form.reset();
});

// Création et ajout d'un commentaire
function addComment(author, text) {
    const commentItem = document.createElement('div');
    commentItem.classList.add('comment__item');

    const authorElement = document.createElement('h4');
    authorElement.classList.add('comment__author');
    authorElement.textContent = author;

    const textElement = document.createElement('p');
    textElement.classList.add('comment__text');
    textElement.textContent = text;

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.classList.add('comment__delete');
    deleteButton.textContent = '🗑️ Supprimer';

    // Suppression du commentaire sans recharger la page
    deleteButton.addEventListener('click', function () {
        commentItem.remove();
    });

    commentItem.appendChild(authorElement);
    commentItem.appendChild(textElement);
    commentItem.appendChild(deleteButton);

    // Le nouveau commentaire est ajouté après les éléments déjà présents
    commentList.appendChild(commentItem);
}