import { useEffect, useState } from "react";
import api from "../services/api";

export default function useFetch(url, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api
      .get(url)
      .then((r) => {
        if (!mounted) return;
        setData(r.data);
      })
      .catch((e) => {
        if (!mounted) return;
        setError(e);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error, refresh: () => api.get(url).then(r => setData(r.data)).catch(() => {}) };
}
