/** game object ID is integer type */
export default class GameObjectIDIssuer
{
    maxID;
    recovereds;



    constructor()
    {
        this.maxID = 0;
        this.recovereds = new Array();
    }



    issue()
    {
        return this.recovereds.length === 0 ? this.maxID++ : this.recovereds.pop();
    }
    recover(iD)
    {
        if (iD > this.maxID)
        {
            throw new Error(`An ID that has never been issued tries recovering it. : ${iD}`);
        }
        this.recovereds.push(iD);
    }
    logState()
    {
        console.log("-------------------------------------");
        console.log(`Max ID you published is ${this.maxID}`);

        let publishedIDs = "";
        for (let i = 0; i < this.maxID; i++)
        {
            publishedIDs += `${i} | `;
        }
        for (let i = 0; i < this.recovereds.length; i++)
        {
            publishedIDs = publishedIDs.replace(this.recovereds[i].toString(), " ");
        }
        console.log(`This is the published IDs : ${publishedIDs}`);

        let recoveredIDs = "";
        for (let i = 0; i < this.recovereds.length; i++)
        {
            recoveredIDs += `${this.recovereds[i]} | `;
        }
        console.log(`This is the recovered IDs : ${recoveredIDs}`);
        console.log("-------------------------------------");
    }
}