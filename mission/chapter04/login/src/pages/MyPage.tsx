import { useEffect, useState } from "react"
import { ResponseMyInfoDto } from "../types/auth"
import { getMyInfo } from "../apis/auth"

const MyPage = () => {
    const [data, setData] = useState<ResponseMyInfoDto>([]);

    useEffect(() => {
        const getData = async () => {
            const response: ResponseMyInfoDto = await getMyInfo();
            console.log(response);

            setData(response);
        }
        getData();
    }, [])
    return (
        <div>
            {data.data.name}, {data.data.email}
        </div>
    )
}

export default MyPage;