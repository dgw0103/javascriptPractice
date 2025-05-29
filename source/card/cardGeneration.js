import * as GameFramework from "../../gameFramework/GameFramework.js";
import Card from "./card.js";

export default class CardGeneration
{
    static #horizontal = 4;
    static #vertical = 5;
    static #horizontalInterval = 120;
    static #verticalInterval = 150;
    static #firstPosition = 
    {
        x: -500,
        y: 150
    };



    static generate(parent)
    {
        const cards = new Array();

        for (let i = 0; i < CardGeneration.#vertical; i++)
        {
            for (let j = 0; j < CardGeneration.#horizontal; j++)
            {
                const gameObject = new GameFramework.GameObject();
                const card = new Card();

                gameObject.transform.parent = parent;
                gameObject.addMonoBehaviour(card);

                card.setSource(CardGeneration.#randomNext(0, Card.cardSignals.length), CardGeneration.#randomNext(1, Card.cardMaxNumber + 1));
                gameObject.transform.position.x = CardGeneration.#firstPosition.x + (CardGeneration.#horizontalInterval * j);
                gameObject.transform.position.y = CardGeneration.#firstPosition.y + (CardGeneration.#verticalInterval * i);

                cards.push(card);
            }
        }

        return cards;
    }
    static #randomNext(min, max)
    {
        let random = Math.random();

        return (Math.floor(random * (max - min)) + min);
    }
}