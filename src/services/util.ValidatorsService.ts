import { AppError } from '../Models/appError';

export function validateID(id: number) {
    if (id === undefined || id === null) {
        throw new AppError(400, 'O campo Id é obrigatório');
    }
    const idVerified = typeof id === 'string' ? parseInt(id) : id;
    if (isNaN(idVerified)) {
        throw new AppError(400, 'O campo Id deve ser um número');
    }
    return idVerified;
}

export function validateTitle(title: string) {
    const trimmed = title.trim();
    if (trimmed === '') throw new AppError(400, 'O campo title não pode conter apenas espaços em branco');
    if (trimmed.length < 3) throw new AppError(400, 'O campo title deve conter no mínimo 3 caracteres');
    if (trimmed.length > 255) throw new AppError(400, 'O campo title deve conter no máximo 255 caracteres');
    if (trimmed.split(' ').length > 10) throw new AppError(400, 'O campo title deve conter no máximo 10 palavras');
}

export function verifyStringRequiredFields(data: Record<string, any>, args: string[]) {
    for (const field of args) {
        const value = data[field];
        if (value === '' || value === null || value === undefined) {
            throw new AppError(400, `O campo ${field} é obrigatório`);
        }
    }
    return data;
}
