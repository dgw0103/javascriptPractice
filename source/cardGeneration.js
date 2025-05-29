import * as GameFramework from "../gameFramework/GameFramework.js";

export default class CardGeneration
{
    static #cardSignals = new Array("Club", "Heart", "Diamond", "Spade");
    static #horizontal = 4;
    static #vertical = 5;
    static #horizontalInterval = 120;
    static #verticalInterval = 150;
    static #cardImageExtension = "png";
    static #cardFilePath = "../resource/card/";
    static #cardMaxNumber = 13;
    static #firstPosition = 
    {
        x: -500,
        y: 150
    };



    constructor(parent)
    {
        this.#generate(parent);
    }



    #generate(parent)
    {
        const cards = new Array();

        for (let i = 0; i < CardGeneration.#vertical; i++)
        {
            for (let j = 0; j < CardGeneration.#horizontal; j++)
            {
                const card = new GameFramework.GameObject();
                
                card.transform.parent = parent;
                card.image.src = `
                    ${CardGeneration.#cardFilePath}
                    ${this.#randomSignalName}
                    ${String(this.#randomNext(1, CardGeneration.#cardMaxNumber + 1)).padStart(2, '0')}.
                    ${CardGeneration.#cardImageExtension}`;
                card.image.width = 130;
                card.image.height = 130;
                card.image.style.position = "absolute";
                card.transform.position.x = CardGeneration.#firstPosition.x + (CardGeneration.#horizontalInterval * j);
                card.transform.position.y = CardGeneration.#firstPosition.y + (CardGeneration.#verticalInterval * i);
                card.image.addEventListener('mouseenter', () =>
                {
                    card.image.style.outline = '2px solid lightblue';
                });
                card.image.addEventListener('mouseleave', () =>
                {
                    card.image.style.outline = 'none';
                });

                cards.push(card);
            }
        }
    }
    get #randomSignalName()
    {
        return CardGeneration.#cardSignals[this.#randomNext(0, CardGeneration.#cardSignals.length)]
    }
    #randomNext(min, max)
    {
        let random = Math.random();

        return (Math.floor(random * (max - min)) + min);
    }
}