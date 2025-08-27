// Mock Firebase configuration to prevent errors
// Replace with actual Firebase configuration when ready

export const database = {
  // Mock database object
};

export const ref = (db: any, path: string) => ({
  path,
});

export const onValue = (ref: any, callback: (snapshot: any) => void) => {
  // Mock implementation
  const mockData = {
    val: () => ({
      "1": {
        name: "John Doe",
        position: "Customer",
        message: "Great service! Very professional and efficient.",
        rating: 5,
        timestamp: new Date().toISOString(),
      },
      "2": {
        name: "Jane Smith",
        position: "Property Owner",
        message: "Excellent landscaping work. Highly recommended!",
        rating: 5,
        timestamp: new Date().toISOString(),
      },
    }),
  };
  
  // Simulate async behavior
  setTimeout(() => callback(mockData), 100);
};

export const push = (ref: any, data: any) => {
  console.log("Mock push to Firebase:", data);
  // Mock implementation - in real app this would save to Firebase
  return Promise.resolve();
};