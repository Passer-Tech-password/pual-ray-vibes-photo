import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

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

interface CreatePhotographerRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreatePhotographerData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreatePhotographerData, undefined>;
  operationName: string;
}
export const createPhotographerRef: CreatePhotographerRef;

export function createPhotographer(): MutationPromise<CreatePhotographerData, undefined>;
export function createPhotographer(dc: DataConnect): MutationPromise<CreatePhotographerData, undefined>;

interface GetPublicGalleriesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetPublicGalleriesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetPublicGalleriesData, undefined>;
  operationName: string;
}
export const getPublicGalleriesRef: GetPublicGalleriesRef;

export function getPublicGalleries(): QueryPromise<GetPublicGalleriesData, undefined>;
export function getPublicGalleries(dc: DataConnect): QueryPromise<GetPublicGalleriesData, undefined>;

interface GetMyImagesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyImagesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMyImagesData, undefined>;
  operationName: string;
}
export const getMyImagesRef: GetMyImagesRef;

export function getMyImages(): QueryPromise<GetMyImagesData, undefined>;
export function getMyImages(dc: DataConnect): QueryPromise<GetMyImagesData, undefined>;

interface UpdateImageRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateImageVariables): MutationRef<UpdateImageData, UpdateImageVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateImageVariables): MutationRef<UpdateImageData, UpdateImageVariables>;
  operationName: string;
}
export const updateImageRef: UpdateImageRef;

export function updateImage(vars: UpdateImageVariables): MutationPromise<UpdateImageData, UpdateImageVariables>;
export function updateImage(dc: DataConnect, vars: UpdateImageVariables): MutationPromise<UpdateImageData, UpdateImageVariables>;

