export const getData = async (endPoint, cache = false) => {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL + "/api" + endPoint
    const configs = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      }
    }
    if (!cache) {
      configs.cache = 'no-store'
    }

    const response = await fetch(url, configs)
    if (response.ok) {
      const { data } = await response.json()
      return data;
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const getOriginData = async (origin, endPoint, cache = false) => {
  // const newEndPoint = `/${origin}${endPoint}`
  // return getData(endPoint, cache)2
  try {
    const url = 'https://api-stg.futurbyte.ae' + "/api" + endPoint
    const configs = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      }
    }
    if (!cache) {
      configs.cache = 'no-store'
    }

    const response = await fetch(url, configs)
    if (response.ok) {
      const { data } = await response.json()
      return data;
    }
  } catch (error) {
    console.error(error.message);
  }
};
export const postInternalAPI = async (endPoint, payload) => {
  try {
    const url = "/api" + endPoint
    const response = await fetch(url, {
      method: "POST",
      body: payload,
    })

    if (response.ok) {
      const data = await response.json()
      return { data, success: true }
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const getDatawithMeta = async (endPoint) => {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL + "/api" + endPoint
    const response = await fetch(url, {
      method: "GET",
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      }
    })

    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const submitHubspotForm = async (formId, payload) => {
  try {
    const response = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID}/${formId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'HubSpot submission failed');
    }

    return { ...(await response.json()), success: true };
  } catch (error) {
    console.error(error.message);
  }
} 