import services from "@/services";
import { ServiceTypes } from "@/types/service-types";

const useFetchData = () => {
  const fetchData = async <T extends keyof ServiceTypes>(
    service: T,
    data: ServiceTypes[T]
  ) => {
    try {
      const response = await services[service](data);
      return { status: true, response };
    } catch (error: any) {
      return { status: false, error: error.message || 'Error desconocido' };
    }
  };

  return { fetchData };
};

export default useFetchData;

