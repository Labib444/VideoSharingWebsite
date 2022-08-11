import { useEffect, useState } from "react";
import axios from "axios";


export function POST(url, data){
    const res = axios
        .post(url, data)
        .then((response) => {
            //setData(response.data);
            console.log(response.data);
        })
        .catch((err) => {
            //setError(err);
            console.log(err);
        })
    return res;
}

export async function GET(url){
    const res = await axios.get(url);
    return res;
}

export function PUT(url){
    const res = axios
        .put(url)
        .then((response) => {
            //setData(response.data);
            console.log(response.data);
        })
        .catch((err) => {
            //setError(err);
            console.log(err);
        })
    return res;
}



function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios
        .get(url)
        .then((response) => {
            setData(response.data);
        })
        .catch((err) => {
            setError(err);
        })
        .finally(() => {
            setLoading(false);
        });
    }, [url]);

    const refetch = () => {
        setLoading(true);
        axios
        .get(url)
        .then((response) => {
            setData(response.data);
        })
        .catch((err) => {
            setError(err);
        })
        .finally(() => {
            setLoading(false);
        });
    };

    return { data, loading, error, refetch };
}

export default useFetch;
