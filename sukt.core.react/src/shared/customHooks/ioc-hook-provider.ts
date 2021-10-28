import "reflect-metadata";

import container from "@/shared/config/inversify.config";
import { interfaces } from "inversify";

const useHookProvider = <T>(params: interfaces.ServiceIdentifier<T>) => {
  return container.get<T>(params);
}

export default useHookProvider;