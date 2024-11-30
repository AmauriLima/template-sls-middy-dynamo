import { IFile } from "@/application/types/IFile";

export interface FileStorageResult {
  filename: string;
  url: string;
}

export interface SaveOptions {
  accessMode?: 'public' | 'private';
}

export interface StorageProvider {
  update(fileId: string, file: IFile, options?: SaveOptions): Promise<FileStorageResult>;
  save(file: IFile, options?: SaveOptions): Promise<FileStorageResult>;
  remove(fileId: string): Promise<void>;
}
