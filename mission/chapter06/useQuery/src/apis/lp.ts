import { PaginationDto } from "../types/common";
import { LpDetailDto, ResponseLpListDto } from "../types/lp";
import { axiosInstance } from "./axios";

export const getLpList = async (paginationDto: PaginationDto): Promise<ResponseLpListDto> => {
    const { data } = await axiosInstance.get('/v1/lps', {
        params: paginationDto
    });

    return data;
};

export const getLpDetail = async (lpId: number): Promise<LpDetailDto> => {
    const { data } = await axiosInstance.get<{ data: LpDetailDto }>(
        `/v1/lps/${lpId}`
    );
    return data.data;
};