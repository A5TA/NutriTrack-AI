class ModelService {
    async predictImage(imageUri: string) {
      const formData = new FormData();
  
      try {
        const imageResponse = await fetch(imageUri);
        const imageBlob = await imageResponse.blob(); // Convert URI to Blob
  
        // Now append the blob to the FormData
        formData.append('image', imageBlob, 'image.jpeg'); // 'image.png' is the filename
  
        const response = await fetch('http://127.0.0.1:3050/predict', {
          method: 'POST',
          body: formData,
        });
  
        if (!response.ok) {
            return null;
        }
  
        const data = await response.json();
        console.log('Prediction Result:', data);
        return data;
      } catch (error) {
        console.error('Error during prediction:', error);
        return null;
      }
    }
  }

const modelService = new ModelService();
export default modelService;  