export default class CardAnimation
{
    #cardTransform



    constructor(card)
    {
        this.#cardTransform = card.gameObject.transform;
    }
}