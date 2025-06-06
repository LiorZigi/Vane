import { useState, useEffect } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

export function useAvatarUri(path?: string) {
  const [uri, setUri] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!path) {
      setUri(undefined);
      return;
    }

    const storage = getStorage();
    if (path.startsWith('gs://')) {
      // convert gs://… → https://…  
      getDownloadURL(ref(storage, path))
        .then(setUri)
        .catch(err => {
          console.warn('Failed to load avatar:', err);
          setUri(undefined);
        });
    } else {
      // already a public URL
      setUri(path);
    }
  }, [path]);

  return uri;
}
