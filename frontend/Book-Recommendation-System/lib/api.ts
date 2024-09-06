import axios from 'axios';
import { RecommendationResponse } from '@/types/types';

const API_URL = 'http://127.0.0.1:5000/recommend';

export const fetchRecommendations = async (bookName: string): Promise<RecommendationResponse> => {
  const response = await axios.get(API_URL, {
    params: { book_name: bookName },
  });
  return response.data;
};
