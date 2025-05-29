import * as GameFramework from "../../gameFramework/GameFramework.js";

export default class CardSelectionAnimation extends GameFramework.MonoBehaviour
{
    #isJumpDone;
    #isShakeDone;
    #isRestoreDone;

    #firstY;
    #time;
    #restoringStartingTime;
    #restoringStartingY;
    #restoringStartingRotation;
    #isSaveRestoringData;
    static #jumpingSpeed = 200;
    static #shakingAngle = 10.0;
    static #shakingSpeed = 50.0;
    static #restoringTime = 0.1;
    static #targetJumpingHeight = 10;



    onAdded()
    {
        this.#isJumpDone = false;
        this.#isShakeDone = false;
        this.#isRestoreDone = false;

        this.#firstY = this.gameObject.transform.position.y;
        this.#time = 0.0;
        this.#isSaveRestoringData = false;
    }
    update()
    {
        this.#time += GameFramework.Time.deltaTime;

        if (this.#isJumpDone === false)
        {
            this.#isJumpDone = this.#jump();
        }
        if (this,this.#isShakeDone === false)
        {
            this.#isShakeDone = this.#shake();
        }

        if (this.#isJumpDone === false || this.#isShakeDone === false)
        {
            return;
        }

        if (this.#isRestoreDone === false)
        {
            this.#isRestoreDone = this.#restore();
        }
        
        if (this.#isRestoreDone === false)
        {
            return;
        }

        this.gameObject.removeMonoBehaviour(this);
    }



    #jump()
    {
        if (this.#firstY - this.gameObject.transform.position.y <= CardSelectionAnimation.#targetJumpingHeight)
        {
            this.gameObject.transform.position.y -= GameFramework.Time.deltaTime * CardSelectionAnimation.#jumpingSpeed;

            return false;
        }

        return true;
    }
    #shake()
    {
        this.gameObject.transform.rotation = Math.sin(this.#time * CardSelectionAnimation.#shakingSpeed) * CardSelectionAnimation.#shakingAngle;

        if (this.#time > 0.5)
        {
            return true;
        }

        return false;
    }
    #restore()
    {
        if (this.#isSaveRestoringData === false)
        {
            this.#isSaveRestoringData = true;

            this.#restoringStartingTime = this.#time;
            this.#restoringStartingY = this.gameObject.transform.position.y;
            this.#restoringStartingRotation = this.gameObject.transform.rotation;
        }



        if (this.#time - this.#restoringStartingTime < CardSelectionAnimation.#restoringTime)
        {
            this.gameObject.transform.position.y = this.#restoringStartingY + (this.#firstY - this.#restoringStartingY) *
                ((this.#time - this.#restoringStartingTime) / CardSelectionAnimation.#restoringTime);

            this.gameObject.transform.rotation = this.#restoringStartingRotation + (0 - this.#restoringStartingRotation) *
                ((this.#time - this.#restoringStartingTime) / CardSelectionAnimation.#restoringTime);

            return false;
        }

        this.gameObject.transform.position.y = this.#restoringStartingY + (this.#firstY - this.#restoringStartingY);
        this.gameObject.transform.rotation = this.#restoringStartingRotation + (0 - this.#restoringStartingRotation);

        return true;
    }
}