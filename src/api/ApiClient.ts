import axios from "axios";

export async function get<TResponse>(path: string): Promise<TResponse> {
  try {
    const { data, status } = await axios.get<TResponse>(path);

    if (status !== 200) {
      throw new Error(`Request failed with status code ${status}`);
    }

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `An error occurred while making the request: ${error.message}`
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}
