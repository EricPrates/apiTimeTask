import { NextFunction, Request, Response } from "express";
import { adminProcessToken, processToken } from "../auth/middleware";
import { AuthRequest } from "../types/types";
const adminRoutes = {
    DELETE: ['/users', '/tasks', '/users/:id'],
    GET: ['/users', '/tasks'],
    POST: ['/users', '/tasks'],
    PUT: ['/users', '/tasks']
}

export async function dinamicRoutes(req :Request, res: Response, next: NextFunction) {
    const method = req.method;
    const arrayUrl = req.path.split('/') 
    const endpointing = arrayUrl[2];

    if(method in adminRoutes && adminRoutes[method as keyof typeof adminRoutes].some(endpoint => endpoint === `/${endpointing}`)){
        return adminProcessToken(req, res, next);
    }
    next();
}