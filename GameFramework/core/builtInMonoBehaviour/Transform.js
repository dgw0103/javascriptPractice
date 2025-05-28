export default class Transform extends MonoBehaviour
{
    #element;
    #parent;



    constructor(element)
    {
        this.#element = element;
        /** The unit is 'px'. */
        this.position =
        {
            x: 0,
            y: 0
        };
        this.degree = 0;
        this.scale =
        {
            x: 1,
            y: 1
        };

        //this.#element.style.display = "inline-block";
        this.#element.style.display = "table";
        this.#element.style.overflow = "auto";
    }



    update()
    {
        this.#element.style.transform = `matrix(${this.scale.x}, 0, 0, ${this.scale.y}, ${this.position.x}, ${this.position.y}) rotate(${this.degree}deg)`;
    }
    set parent(value)
    {
        this.#parent = value;
        this.#parent.appendChild(this.#element);
    }
    setChild(element)
    {
        this.#element.appendChild(element);
    }
}