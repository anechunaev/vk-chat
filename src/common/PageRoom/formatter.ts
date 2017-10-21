export const formatDate = (timestamp) => {
    if (!timestamp) {
        return '';
    }

    const date = new Date(timestamp);

    return `${
        date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    }:${
        date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    }`;
}