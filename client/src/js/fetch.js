const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.error || 'An error occurred' };
    }
    return await response.json();
  } catch (err) {
    console.error('Fetch error:', err);
    return { error: err.message};
  }
};

export { fetchData };
