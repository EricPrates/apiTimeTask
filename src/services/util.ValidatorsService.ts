

export function validateID(id: number) {
    if (id === undefined || id === null) {
        throw new Error('O campo Id é obrigatório');
    }
    const idVerifiedString = typeof id === 'string' ? parseInt(id) : id;
    if (isNaN(idVerifiedString)) {
        throw new Error('O campo Id deve ser um número');
    }
    return idVerifiedString;
}
export function validateTitle(title: string) {
    const trimmedTitle = title.trim();
    const errorInitialMsg = 'O campo title é';
    if (trimmedTitle.length > 255) {
        throw new Error(`${errorInitialMsg} inválido: deve conter no máximo 255 caracteres`);
    }
    if (trimmedTitle === '') {
        throw new Error(`${errorInitialMsg} inválido: não pode conter apenas espaços em branco`);
    }
    if (trimmedTitle.length < 3) {
        throw new Error(`${errorInitialMsg} inválido: deve conter no mínimo 3 caracteres`);
    }
    if (trimmedTitle.split(' ').length > 10) {
        throw new Error(`${errorInitialMsg} inválido: deve conter no máximo 10 palavras`);
    }

}

export function verifyStringRequiredFields(data: Record<string, any>, [...args]: string[]) {
    for (const field of args) {
        const value = data[field];
        if (value === '' || value === null || value === undefined) {
            throw new Error(`O campo ${field} é obrigatório`);
        }
    }
    return data;
}