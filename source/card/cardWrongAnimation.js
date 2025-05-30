import * as GameFramework from "../../gameFramework/GameFramework.js";

export default class CardWrongAnimation extends GameFramework.MonoBehaviour
{
    #time;
    static #minScale = 0.5;
    static #maxScale = 1.5;
    static #scaleCofficient  = 0.2;
    static #scalingspeed = 10;

    static #maxRotation = 20;
    static #rotationSpeed = 5;



    onAdded()
    {
        this.#time = 0;
    }
    update()
    {
        this.#time += GameFramework.Time.deltaTime;

        this.gameObject.transform.scale.x =
            (Math.sin(this.#time * CardWrongAnimation.#scalingspeed) * CardWrongAnimation.#scaleCofficient) + ((CardWrongAnimation.#maxScale + CardWrongAnimation.#minScale) * 0.5);
        this.gameObject.transform.scale.y =
            (Math.sin(this.#time * CardWrongAnimation.#scalingspeed) * CardWrongAnimation.#scaleCofficient) + ((CardWrongAnimation.#maxScale + CardWrongAnimation.#minScale) * 0.5);

        this.gameObject.transform.rotation = 
            Math.sin(this.#time * CardWrongAnimation.#rotationSpeed) * CardWrongAnimation.#maxRotation;
    }
}