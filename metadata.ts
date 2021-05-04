import { ParamMetadataArgs, RequestMethod } from "./models.ts";

export type ObjectKeyAny = { [key: string]: any };

const global: ObjectKeyAny = {};

export function getMetadataArgsStorage<TState>(): MetadataArgsStorage<TState> {
  if (!(global as any).routingControllersMetadataArgsStorage) {
    (global as any).routingControllersMetadataArgsStorage =
      new MetadataArgsStorage();
  }

  return (global as any).routingControllersMetadataArgsStorage;
}

/**
 * Storage all metadatas read from decorators and app settings.
 */
export class MetadataArgsStorage<TState = any> {
  /**
     * Registered controller metadata args.
     */
  controllers: ControllerMetadataArgs[] = [];

  /**
     * Registered actions.
     */
  actions: ActionMetadataArgs[] = [];

  /**
     * Registered params.
     */
  params: ParamMetadataArgs[] = [];
}

/**
 * Controller metadata used to storage information about registered controller.
 */
export interface ControllerMetadataArgs {
  /**
     * Indicates object which is used by this controller.
     */
  object: ObjectConstructor;

  /**
     * @Deprecated
     * Indicates object which is used by this controller.
     */
  target: Function;

  /**
     * Base route for all actions registered in this controller.
     */
  route?: string;

  /**
     * Type, vase default
     */
  type: any;

  /**
     * Actions of controller
     */
  actions?: ActionMetadataArgs[];
}

export interface ActionMetadataArgs {
  /**
     * Type of request method, GET, POST, etc
     */
  type: RequestMethod;

  /**
     * Object of declaration
     */
  object: Object;

  /**
     * Object.constructor
     */
  target: Object;

  /**
     * Name of action controller method
     */
  method: string;

  /**
     * Route of action
     */
  route?: string | RegExp;

  /**
     * Parent Controller
     */
  controller?: ControllerMetadataArgs;
}
