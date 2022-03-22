import { Card } from "../components/Card.js";
import { openLookImg, setLike, delLike, delCard, myID } from '../pages/index.js';

export { createCard };
//--------------------------------------------------------
//      Создадим карточку
//--------------------------------------------------------
function createCard(data) {
  // Создадим экземпляр карточки
  const card = new Card(
    data,
    "element-card",
    openLookImg,
    setLike,
    delLike,
    delCard,
    myID
  );
  // Создаём карточку 
  const cardElement = card.generateCard();
  return cardElement;
}

export const renderBtnSave = (selectorBtn, txtBtn) => {
  const saveButton = document.querySelector(selectorBtn);
  saveButton.textContent = txtBtn;
};