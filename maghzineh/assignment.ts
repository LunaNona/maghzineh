import { BaseModel } from "../baseModel";

export interface Assignment extends BaseModel {

    /**Gets or sets the task identifier */
    taskId: number;

    /**Gets or sets level */
    level: number;

    /**Gets or sets the play duration */
    time: number;

    repeat: number;

    distractor: number;

    runType: number;

    rotation: number;

    order: number;

    announcerMode: number;

    textType: number;

    /**Gets or sets the advance setting */
    advanceSetting: string;

}
