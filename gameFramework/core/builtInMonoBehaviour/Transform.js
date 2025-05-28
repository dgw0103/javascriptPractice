import MonoBehaviour from "../MonoBehaviour.js";

export default class Transform extends MonoBehaviour
{
    #element;
    #parent;



    constructor(element)
    {
        super();
        this.#element = element;
        /** The unit is 'px'. */
        this.position =
        {
            x: 0,
            y: 0
        };
        this.rotation = 0;
        this.scale =
        {
            x: 1,
            y: 1
        };
    }



    update()
    {
        this.#element.style.transform = `matrix(${this.scale.x}, 0, 0, ${this.scale.y}, ${this.position.x}, ${this.position.y}) rotate(${this.rotation}deg)`;
    }
    set parent(value)
    {
        this.#parent = value;
        this.#parent.appendChild(this.#element);
    }
}