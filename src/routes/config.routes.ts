import { NextFunction, Request, Response } from "express";
import { adminProcessToken, processToken } from "../auth/middleware";

const adminRoutes = {
    DELETE: ['/users', '/tasks', '/users/:id'],
    GET: ['/users', '/tasks'],
    POST: ['/users', '/tasks'],
    PUT: ['/users', '/tasks']
}

export async function dinamicRoutes(req :Request, res: Response, next: NextFunction) {
    const method = req.method;
    const arrayUrl = req.path.split('/') 
    const path = arrayUrl.slice(2).join(('/'));

    if(method in adminRoutes && adminRoutes[method as keyof typeof adminRoutes].some(endpoint => {
    const pattern = endpoint.replace(/:[^/]+/g, '[^/]+');
    return new RegExp(`^${pattern}$`).test(`/${path}`)})){
        return adminProcessToken(req, res, next);
    }
    next();
}