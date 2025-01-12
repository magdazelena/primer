import { APIResponse } from "../../types/api";
import { fetchAPI } from "../fetch-api";

export const getCreatorsList = async (start: number, limit: number): Promise<APIResponse> => {
    const path = `/creators`;
    const urlParamsObject = {
      sort: { createdAt: "desc" },
      populate: {
        avatar: { fields: ["url"] },
      },
      pagination: {
        start: start,
        limit: limit,
      },
    };
    const responseData = await fetchAPI(path, urlParamsObject);

    return { ...responseData };
}