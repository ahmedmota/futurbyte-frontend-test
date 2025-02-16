export const mapHubspotData = (data) => {
    const fields = []

    Object.entries(data).forEach(([name, value]) => {
        fields.push({ name, value })
    })
    return { fields }
}