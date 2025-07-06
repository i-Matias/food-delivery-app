import * as Location from "expo-location";
import { useEffect, useState } from "react";

export function useLocation() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [address, setAddress] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          setIsLoading(false);
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        let reverseGeocode = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        if (reverseGeocode.length > 0) {
          const addr = reverseGeocode[0];
          setAddress(`${addr.street}, ${addr.city}, ${addr.region}`);
        }
      } catch (error) {
        setErrorMsg("Failed to get location");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { location, address, errorMsg, isLoading };
}
