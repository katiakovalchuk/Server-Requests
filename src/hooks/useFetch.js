import {useEffect, useState} from 'react';

const useFetch = (url, options) => {
    const [status, setStatus] = useState({
        data: null,
        loading: false,
        error: null
    });

    const fetchData = async (url, options) => {
        setStatus(() => ({...status, loading: true}));
         await fetch(url, options)
            .then(res => res.json())
            .then(res => setStatus(prev => ({...prev, loading: false, data: res})))
            .catch(error => {
                setStatus(prev => ({...prev, loading: false, error}))
            })
    }

    useEffect(() => {
        if (url){
            fetchData(url, options)
        }
    }, [])

    return {...status}
}

export default useFetch;
