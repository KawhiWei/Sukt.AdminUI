import { interfaces } from "inversify";
import "reflect-metadata";
import container from "@/shared/config/inversify.config";

export default function IocProvider<T>(params: interfaces.ServiceIdentifier<T>) {
  return (target: any, attr: T) => {
    target[attr] = container.get<T>(params);
    return target[attr];
  };
}
