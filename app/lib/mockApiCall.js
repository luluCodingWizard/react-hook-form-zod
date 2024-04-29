function mockAPICall(toReject) {
  return new Promise((resolve, reject) => {
    // Simulate a random error with 30% probability

    // Simulate API delay (2 seconds)
    setTimeout(() => {
      if (toReject) {
        // Simulate an error response
        reject(new Error("Mock API call failed!"));
      } else {
        // Simulate successful API response
        const data = { message: "Mock API call successful!" };
        resolve(data);
      }
    }, 2000);
  });
}

export default mockAPICall;
