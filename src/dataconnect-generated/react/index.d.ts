import { CreatePhotographerData, GetPublicGalleriesData, GetMyImagesData, UpdateImageData, UpdateImageVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreatePhotographer(options?: useDataConnectMutationOptions<CreatePhotographerData, FirebaseError, void>): UseDataConnectMutationResult<CreatePhotographerData, undefined>;
export function useCreatePhotographer(dc: DataConnect, options?: useDataConnectMutationOptions<CreatePhotographerData, FirebaseError, void>): UseDataConnectMutationResult<CreatePhotographerData, undefined>;

export function useGetPublicGalleries(options?: useDataConnectQueryOptions<GetPublicGalleriesData>): UseDataConnectQueryResult<GetPublicGalleriesData, undefined>;
export function useGetPublicGalleries(dc: DataConnect, options?: useDataConnectQueryOptions<GetPublicGalleriesData>): UseDataConnectQueryResult<GetPublicGalleriesData, undefined>;

export function useGetMyImages(options?: useDataConnectQueryOptions<GetMyImagesData>): UseDataConnectQueryResult<GetMyImagesData, undefined>;
export function useGetMyImages(dc: DataConnect, options?: useDataConnectQueryOptions<GetMyImagesData>): UseDataConnectQueryResult<GetMyImagesData, undefined>;

export function useUpdateImage(options?: useDataConnectMutationOptions<UpdateImageData, FirebaseError, UpdateImageVariables>): UseDataConnectMutationResult<UpdateImageData, UpdateImageVariables>;
export function useUpdateImage(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateImageData, FirebaseError, UpdateImageVariables>): UseDataConnectMutationResult<UpdateImageData, UpdateImageVariables>;
