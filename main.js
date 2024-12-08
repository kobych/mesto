// Получаем все необходимые элементы
const profileEditButton = document.querySelector('.profile__edit');
const profileAddButton = document.querySelector('.profile__add-button');
const profileAvatarEditButton = document.querySelector('.avatar__edit');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddElement = document.querySelector('.popup_type_add-element');
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
const popupImage = document.querySelector('.popup_type_image');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const formEditProfile = document.forms['editProfile'];
const formAddCard = document.forms['addCard'];
const formEditAvatar = document.forms['editAvatar'];
const nameInput = document.querySelector('#name-input');
const jobInput = document.querySelector('#job-input');
const titleInput = document.querySelector('#title-input');
const linkInput = document.querySelector('#link-input');
const linkImageInput = document.querySelector('#link-image-input');
const profileName = document.querySelector('.profile__name');
const profileVocation = document.querySelector('.profile__vocation');
const profileAvatar = document.querySelector('.avatar');
const elementsList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('#card-template').content;

// Функция открытия попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupOnEscape);
}

// Функция закрытия попапа
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupOnEscape);
}

// Закрытие попапа по нажатию на Esc
function closePopupOnEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
}

// Закрытие попапа по клику на оверлей
document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('click', (evt) => {
        if (evt.target === popup) {
            closePopup(popup);
        }
    });
});

// Обработчики закрытия попапов по клику на крестик
popupCloseButtons.forEach(button => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

// Открытие попапа редактирования профиля
profileEditButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileVocation.textContent;
    openPopup(popupEditProfile);
});

// Сохранение изменений профиля
formEditProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileVocation.textContent = jobInput.value;
    closePopup(popupEditProfile);
});

// Открытие попапа добавления карточки
profileAddButton.addEventListener('click', () => {
    openPopup(popupAddElement);
});

// Добавление новой карточки
formAddCard.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const cardElement = createCard(titleInput.value, linkInput.value);
    elementsList.prepend(cardElement);
    closePopup(popupAddElement);
    formAddCard.reset();
});

// Открытие попапа редактирования аватара
profileAvatarEditButton.addEventListener('click', () => {
    openPopup(popupEditAvatar);
});

// Сохранение нового аватара
formEditAvatar.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileAvatar.src = linkImageInput.value;
    closePopup(popupEditAvatar);
});

// Создание новой карточки
function createCard(name, link) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.element__image');
    const cardTitle = cardElement.querySelector('.element__text');
    const cardLikeButton = cardElement.querySelector('.element__heart');
    const cardDeleteButton = cardElement.querySelector('.element__urn');

    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;

    cardLikeButton.addEventListener('click', () => {
        cardLikeButton.classList.toggle('element__heart_active');
    });

    cardDeleteButton.addEventListener('click', () => {
        cardElement.remove();
    });

    cardImage.addEventListener('click', () => {
        openImagePopup(link, name);
    });

    return cardElement;
}

// Открытие попапа с изображением
function openImagePopup(imageSrc, imageAlt) {
    const popupImagePhoto = popupImage.querySelector('.popup__image_type_photo');
    const popupImageText = popupImage.querySelector('.popup__image_type_text');

    popupImagePhoto.src = imageSrc;
    popupImagePhoto.alt = imageAlt;
    popupImageText.textContent = imageAlt;

    openPopup(popupImage);
}

// Инициализация карточек
function initCards() {
    const initialCards = [
        { name: 'Архыз', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg' },
        { name: 'Челябинская область', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg' },
        { name: 'Иваново', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg' },
        { name: 'Камчатка', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg' },
        { name: 'Холмогорский район', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg' },
        { name: 'Байкал', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg' }
    ];

    initialCards.forEach(card => {
        const cardElement = createCard(card.name, card.link);
        elementsList.append(cardElement);
    });
}

// Инициализация карточек при загрузке страницы
initCards();