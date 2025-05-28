export default class Image
{
    #element;
    #src;



    constructor(element)
    {
        this.#element = element;

        this.#element.style.display = "table-row";
        this.#element.style.overflow = "none";
        console.log(true);
    }



    set src(value)
    {
        this.#src = value;
        this.#element.src = this.#src;
        console.log(value);
        console.log(this.#element.src);
    }
}