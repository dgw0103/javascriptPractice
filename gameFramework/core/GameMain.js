import { default as Time } from "./Time.js";

export default class GameMain
{
    static #currentTime;
    static #previousTime;
    static #gameObjects;
    static #setIntervalAction;



    static
    {
        GameMain.#currentTime = 0;
        GameMain.#previousTime = 0;
        GameMain.#gameObjects = new Map();
        GameMain.#startUpdateInInitialization()
    }



    static async #startUpdateInInitialization()
    {
        let timeClass = await import("./Time.js");
        GameMain.#startUpdate(timeClass.default.frameRate);
    }
    static #startUpdate(frameRate)
    {
        GameMain.#setIntervalAction = setInterval(GameMain.#update, 1000 / frameRate);
    }
    static #update()
    {
        GameMain.#currentTime = Date.now();

        Time.deltaTime = (GameMain.#currentTime - GameMain.#previousTime) / 1000.0;

        for (const [iD, gameObject] of GameMain.#gameObjects)
        {
            gameObject.update();
        }

        GameMain.#previousTime = GameMain.#currentTime;
    }
    static restartUpdate()
    {
        clearInterval(GameMain.#setIntervalAction);
        GameMain.#startUpdate(Time.frameRate);
    }
    static registerGameObject(iD, gameObject)
    {
        GameMain.#gameObjects.set(iD, gameObject);
    }
    static unregisterGameObject(iD)
    {
        let isDeleted = GameMain.#gameObjects.delete(iD);

        if (isDeleted === false)
        {
            throw new Error(`Fail to try destroying the #${iD}.`);
        }

        return isDeleted;
    }
    static getGameObject(iD)
    {
        return GameMain.#gameObjects.get(iD);
    }
    /** log current game objects in this game and components they have. */
    static logState()
    {
        console.log(`${new Date()}----------------------------------`);
        console.log("Game objects in GameMain game is : ");
        for (const [iD, gameObject] of GameMain.#gameObjects)
        {
            gameObject.logTest();
        }
        console.log("---------------------------------------------------------------------------------");
        console.log("\n");
    }
    static Test(gameObject)
    {
        let index = GameMain.#gameObjects.indexOf(gameObject);

        if (index === -1)
        {
            console.error(`There is no ${gameObject} in game.`);
            return;
        }

        GameMain.#gameObjects[index] = null;
    }
    static throwErrorIfNotCalledAtUpdate()
    {
        let error = new Error("Time.deltaTime doesn't allow setting value.");
        Error.captureStackTrace(error);
        let callingStacks = error.stack.split("\n    at ");

        // for (const element of error.stack.split("\n    at "))
        // {
        //     console.log(element);
        // }
        
        if (callingStacks[callingStacks.length - 1].split('(')[0] !== `${GameMain.#update.name} `)
        {
            throw error;
        }
    }
}

export const throwErrorIfNotCalledAtUpdate = GameMain.throwErrorIfNotCalledAtUpdate;
export const registerGameObject = GameMain.registerGameObject;
export const unregisterGameObject = GameMain.unregisterGameObject;
export const getGameObject = GameMain.getGameObject;
export const restartUpdate = GameMain.restartUpdate;