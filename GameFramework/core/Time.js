import { throwErrorIfNotCalledAtUpdate, restartUpdate } from "./GameMain.js";

export default class Time
{
    /**Interval between frame and next frame by milliseconds*/
    static #deltaTime = 0;
    /**Update interval in a second.*/
    static m_frameRate = 60;



    static get deltaTime()
    {
        return this.#deltaTime;
    }
    static set deltaTime(time)
    {
        throwErrorIfNotCalledAtUpdate();

        this.#deltaTime = time;
    }
    static get frameRate()
    {
        return Time.m_frameRate;
    }
    static set frameRate(value)
    {
        Time.m_frameRate = value;
        restartUpdate();
    }
}