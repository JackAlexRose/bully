import axios from "axios";

export async function get<TResponse>(
  path: string
): Promise<TResponse | string> {
  try {
    const { data, status } = await axios.get<TResponse>(path);

    console.log(JSON.stringify(data, null, 4));
    console.log("response status is: ", status);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
}
