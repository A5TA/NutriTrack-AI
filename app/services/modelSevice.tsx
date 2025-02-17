class ModelService {
    api_endpoint_ai = 'http://127.0.0.1:3050' //flask api - Only running ai predictions
    api_endpoint_backend = 'http://127.0.0.1:8050' //go lang backend - CRUD endpoints

    predictedUri: string | null = null;
    predictedClass: string | null = null;
    predictedConfidence: number | null = null;

    userId: string = "User1"; // Hardcoded for now

    async getMealMacros(mealType: string | null) {
      try {
        if (!mealType || mealType === "") {
          return null
        }
        const response = await fetch(`${this.api_endpoint_backend}/getMacros/${mealType}`);
        if (!response.ok) {
          return null;
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error during fetching meal macros:', error);
        return null;
      }
    }

    async getAllMeals(startDate: string, endDate: string) {
      const formData = new FormData();
      try {
        formData.append('userId', this.userId); 
        formData.append('startDate', startDate);
        formData.append('endDate', endDate);

        console.log('Fetching all meals from:', startDate, 'to:', endDate, 'for user:', this.userId);
        const response = await fetch(`${this.api_endpoint_backend}/getAllMeals`, {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) {
          return null;
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error during fetching all meals:', error);
        return null;
      }

    }

    async updatePredictedClass(newClass: string | null) {
      this.predictedClass = newClass ? newClass : "";
    }

    async updatePredictedConfidence(confidence: number | null ) {
      this.predictedConfidence = confidence ? confidence : 0;
    }

    async updatePredictedUri(uri: string) {
      this.predictedUri = uri;
    }

    async getPredictedClass() {
      return this.predictedClass;
    }

    async getPredictedUri() {
      return this.predictedUri;
    }

    async getPredictedConfidence() {
      return this.predictedConfidence;
    }

    async predictImage(imageUri: string) {
      const formData = new FormData();
      //Lets Store the image Uri for later use first
      this.updatePredictedUri(imageUri);

      try {
        const imageResponse = await fetch(imageUri);
        const imageBlob = await imageResponse.blob(); // Convert URI to Blob
  
        // Now append the blob to the FormData
        formData.append('image', imageBlob, 'image.jpeg'); // 'image.jpeg' is the filename
  
        const response = await fetch(`${this.api_endpoint_ai}/predict`, {
          method: 'POST',
          body: formData,
        });
  
        if (!response.ok) {
            return null;
        }
  
        const data = await response.json();
        // console.log('Prediction Result:', data);
        return data;
      } catch (error) {
        console.error('Error during prediction:', error);
        return null;
      }
    }
    async storePredictionImage(imageUri: string, predictedClass: string, mealType : string) {
      const formData = new FormData();
      if (predictedClass == null) {
        return null; //We can store an unlabeled image
      }

      try {
        const imageResponse = await fetch(imageUri);
        const imageBlob = await imageResponse.blob(); // Convert URI to Blob

        formData.append('userId', this.userId); 
        // Append the image file to the formData
        formData.append('image', imageBlob, `${new Date().toISOString()}.jpeg`); 
        // Append additional data for easier storage
        formData.append('name', predictedClass || 'default-name');
        formData.append('mealtype', mealType || 'Breakfast');

        const response = await fetch(`${this.api_endpoint_backend}/store-prediction`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          console.error('Failed to send data to the server');
          return null;
        }

        const res = await response.json();
        // console.log('Completion Status:', res);
        return res;
      } catch (error) {
        console.error('Error when storing the prediction:', error);
        return null;
      }
    }

    //Used to display the images on the home page
    async getImageByURL(url: string) : Promise<string | null> {
      try {
      const response = await fetch(`${this.api_endpoint_backend}/getImage/${url}`);
      if (!response.ok) {
        return null;
      }
      const blob = await response.blob();
      return URL.createObjectURL(blob); // Convert blob to object URL
      } catch (error) {
      console.error('Error during fetching image:', error);
      return null;
      }
    }

    //Get all the currently stored macros so the user doesn't store an item that has no macros
    async getAllMealMacros() {
      try {
        const response = await fetch(`${this.api_endpoint_backend}/getAllMealMacros`);
        if (!response.ok) {
          return null;
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error during fetching all macros:', error);
        return null;
      }
    }

    //Store the meal macros
    async storeMealMacros(mealName: string, protein: string, fats: string, carbs: string, calories: string) {
      const formData = new FormData();
      formData.append('mealName', mealName);
      formData.append('protein', protein);
      formData.append('fat', fats);
      formData.append('carbs', carbs);
      formData.append('calories', calories);

      try {
        const response = await fetch(`${this.api_endpoint_backend}/addMacros`, {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) {
          return null;
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error during storing meal macros:', error);
        return null;
      }
    }
  }


  

const modelService = new ModelService();
export default modelService;  