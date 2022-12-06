import axios from "axios";

export async function get<TResponse>(path: string): Promise<TResponse> {
  try {
    const { data, status } = await axios.get<TResponse>(path);

    console.log(JSON.stringify(data, null, 4));
    console.log("response status is: ", status);

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
