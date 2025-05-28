import { registerGameObject } from "./GameMain.js";
import { unregisterGameObject } from "./GameMain.js";
import GameObjectIDIssuer from "./GameObjectIDIssuer.js";
import Transform from "./builtInMonoBehaviour/Transform.js";

export default class GameObject
{
    #monoBehaviours;
    #iD;
    #element;
    transform;
    static #gameObjectIDIssuer = new GameObjectIDIssuer();



    constructor()
    {
        this.#monoBehaviours = new Array();
        this.#iD = GameObject.#gameObjectIDIssuer.issue();
        this.#element = new Image();
        this.transform = new Transform(this.#element);

        this.addMonoBehaviour(this.transform);

        registerGameObject(this.#iD, this);
    }



    destroy()
    {
        GameObject.#gameObjectIDIssuer.recover(this.#iD);

        return unregisterGameObject(this.#iD);
    }
    addMonoBehaviour(monoBeheviour)
    {
        monoBeheviour.gameObject = this;
        this.#monoBehaviours.splice(this.#monoBehaviours.length, 0, monoBeheviour);
    }
    removeMonoBehaviour(monoBeheviour)
    {
        let indexToRemove = this.#monoBehaviours.indexOf(monoBeheviour);
        if (indexToRemove === -1)
        {
            console.log(`Fail to try deleting ${monoBeheviour.name}.`);
            return;
        }

        this.#monoBehaviours.splice(indexToRemove, 1);
    }

    update()
    {
        this.transform.update();
        //console.log("game object update");
        for (const element of this.#monoBehaviours)
        {
            element.update(this);
        }
    }


    
    logTest()
    {
        let textToPrint = `GameObject ID : ${this.#iD}`;

        console.log(textToPrint);
        for (let i = 0; i < this.#monoBehaviours.length; i++)
        {
            console.log(`   ${this.#monoBehaviours[i]}`);
        }
    }
    static logIDState()
    {
        GameObject.#gameObjectIDIssuer.logState();
    }
}