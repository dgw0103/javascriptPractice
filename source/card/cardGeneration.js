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
        const randomNumberGenerator = this.createRandomUniqueGenerator(0, (Card.cardMaxNumber * Card.cardSignals.length) - 1);

        for (let i = 0; i < CardGeneration.#vertical; i++)
        {
            for (let j = 0; j < CardGeneration.#horizontal; j++)
            {
                const gameObject = new GameFramework.GameObject();
                const card = new Card();

                gameObject.addMonoBehaviour(card);
                gameObject.transform.parent = parent;
                gameObject.transform.position.x = CardGeneration.#firstPosition.x + (CardGeneration.#horizontalInterval * j);
                gameObject.transform.position.y = CardGeneration.#firstPosition.y + (CardGeneration.#verticalInterval * i);

                CardGeneration.setCardSource(card, randomNumberGenerator());

                cards.push(card);
            }
        }

        cards.sort(Card.compare);

        for (let i = 0; i < cards.length; i++)
        {
            cards[i].Index = i;
        }

        return cards;
    }
    static createRandomUniqueGenerator(min, max)
    {
        const pool = Array.from({ length: max - min + 1 }, (_, i) => i + min);

        return function getRandomUnique()
        {
            if (pool.length === 0)
            {
                throw new Error(`범위 ${min}~${max} 내에 더 이상 반환할 수 있는 수가 없습니다.`);
            }

            const index = Math.floor(Math.random() * pool.length);

            return pool.splice(index, 1)[0];
        };
    }
    static setCardSource(card, randomUniqueNumber)
    {
        const signal = randomUniqueNumber % Card.cardSignals.length;
        const number = parseInt(randomUniqueNumber / Card.cardSignals.length);

        card.Number = randomUniqueNumber;
        card.setSource(signal, number);
    }
}