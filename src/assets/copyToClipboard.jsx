const copyToClipboard = async (content) => {
  try {
    await navigator.clipboard.writeText(content);
  } catch (error) {
    console.log(error);
  }
};

export default copyToClipboard;
