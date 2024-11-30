import { IFile } from '@/application/types/IFile';
import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ulid } from 'ulid';
import { s3Client } from '../../infra/clients/s3-client';
import { FileStorageResult, SaveOptions, StorageProvider } from './storage-provider';

export class AWSS3StorageProvider implements StorageProvider {
  constructor(private readonly s3: S3Client = s3Client) {}

  async update(fileId: string, file: IFile, options?: SaveOptions): Promise<FileStorageResult> {
    await this.remove(fileId);

    return this.save(file, options);
  }

  async save(file: IFile, options: SaveOptions = {}): Promise<FileStorageResult> {
    const { accessMode = 'public' } = options;

    const filename = `${accessMode}/${ulid()}-${file.filename}`;

    const putObjectCommand = new PutObjectCommand({
      Bucket: 'template-middy-sls',
      Key: filename,
      Body: file.content,
      ACL: accessMode === 'private' ? 'private' : 'public-read',
    });

    await this.s3.send(putObjectCommand);

    const url = `https://template-middy-sls.s3.amazonaws.com/${filename}`;

    return {
      filename,
      url,
    };
  }

  async remove(fileId: string): Promise<void> {
    const deleteCommand =  new DeleteObjectCommand({
      Bucket: 'template-middy-sls',
      Key: fileId,
    });

    await this.s3.send(deleteCommand);
  }
}
