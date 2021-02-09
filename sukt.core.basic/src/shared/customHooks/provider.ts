import { interfaces } from "inversify";
import "reflect-metadata";
import container from "@/shared/config/inversify.config";
const useProvider = <T>(params: interfaces.ServiceIdentifier<T>) => {
  return container.get<T>(params);
}

export default useProvider;