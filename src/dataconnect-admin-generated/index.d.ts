import { ConnectorConfig, DataConnect, OperationOptions, ExecuteOperationResponse } from 'firebase-admin/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export interface CreatePhotographerData {
  photographer_insert: Photographer_Key;
}

export interface GalleryImage_Key {
  galleryId: UUIDString;
  imageId: UUIDString;
  __typename?: 'GalleryImage_Key';
}

export interface Gallery_Key {
  id: UUIDString;
  __typename?: 'Gallery_Key';
}

export interface GetMyImagesData {
  images: ({
    id: UUIDString;
    title?: string | null;
    imageUrl: string;
    thumbnailUrl: string;
  } & Image_Key)[];
}

export interface GetPublicGalleriesData {
  galleries: ({
    id: UUIDString;
    name: string;
    description?: string | null;
  } & Gallery_Key)[];
}

export interface Image_Key {
  id: UUIDString;
  __typename?: 'Image_Key';
}

export interface Photographer_Key {
  id: UUIDString;
  __typename?: 'Photographer_Key';
}

export interface UpdateImageData {
  image_update?: Image_Key | null;
}

export interface UpdateImageVariables {
  id: UUIDString;
  title?: string | null;
}

/** Generated Node Admin SDK operation action function for the 'CreatePhotographer' Mutation. Allow users to execute without passing in DataConnect. */
export function createPhotographer(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<CreatePhotographerData>>;
/** Generated Node Admin SDK operation action function for the 'CreatePhotographer' Mutation. Allow users to pass in custom DataConnect instances. */
export function createPhotographer(options?: OperationOptions): Promise<ExecuteOperationResponse<CreatePhotographerData>>;

/** Generated Node Admin SDK operation action function for the 'GetPublicGalleries' Query. Allow users to execute without passing in DataConnect. */
export function getPublicGalleries(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<GetPublicGalleriesData>>;
/** Generated Node Admin SDK operation action function for the 'GetPublicGalleries' Query. Allow users to pass in custom DataConnect instances. */
export function getPublicGalleries(options?: OperationOptions): Promise<ExecuteOperationResponse<GetPublicGalleriesData>>;

/** Generated Node Admin SDK operation action function for the 'GetMyImages' Query. Allow users to execute without passing in DataConnect. */
export function getMyImages(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<GetMyImagesData>>;
/** Generated Node Admin SDK operation action function for the 'GetMyImages' Query. Allow users to pass in custom DataConnect instances. */
export function getMyImages(options?: OperationOptions): Promise<ExecuteOperationResponse<GetMyImagesData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateImage' Mutation. Allow users to execute without passing in DataConnect. */
export function updateImage(dc: DataConnect, vars: UpdateImageVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateImageData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateImage' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateImage(vars: UpdateImageVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateImageData>>;

