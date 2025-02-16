export const isFileWithinSizeLimit = (file, sizeLimitMB = 10) => {
    if (!file) {
        return false;
    }
    const sizeLimitBytes = sizeLimitMB * 1024 * 1024;
    return file.size <= sizeLimitBytes;
};
