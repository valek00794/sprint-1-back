import { Request, Response } from 'express'
import { db } from '../db/db'
import { OutputVideoType } from '../types/video-types'
import { FieldError } from '../types/validation-types';

const validationErrorsMassages = {
    id: `Id not found`,
};

let apiErrors: FieldError[] = [];

export const deleteVideoController = (req: Request, res: Response) => {
    const idVideo = db.videos.findIndex(video => video.id === +req.params.id)
    if (idVideo === -1) {
        apiErrors.push({ field: "id", message: validationErrorsMassages.id })
        res
            .status(404)
            .json({
                errorsMessages: apiErrors
            })
    } else {
        db.videos.splice(idVideo, 1)
        res
            .status(204)
    }
}