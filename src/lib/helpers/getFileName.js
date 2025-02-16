export const getFileName = (name) => {
    const cleanName = name
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');

    return `${Date.now()}-${cleanName}`
}