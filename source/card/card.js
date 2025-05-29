import * as GameFramework from "../../gameFramework/GameFramework.js";

export default class Card extends GameFramework.MonoBehaviour
{
    static cardSignals = new Array("Club", "Heart", "Diamond", "Spade");
    static #cardFilePath = "../../resource/card/";
    static cardMaxNumber = 13;
    static #cardImageExtension = "png";



    onAdded()
    {
        this.gameObject.image.width = 130;
        this.gameObject.image.height = 130;
        this.gameObject.image.style.position = "absolute";
        this.gameObject.image.addEventListener('mouseenter', () =>
        {
            this.gameObject.image.style.outline = '2px solid lightblue';
        });
        this.gameObject.image.addEventListener('mouseleave', () =>
        {
            this.gameObject.image.style.outline = 'none';
        });
    }
    setSource(signalIndex, cardNumber)
    {
        this.gameObject.image.src = `${Card.#cardFilePath}${Card.cardSignals[signalIndex]}${String(cardNumber).padStart(2, '0')}.${Card.#cardImageExtension}`;
    }
}