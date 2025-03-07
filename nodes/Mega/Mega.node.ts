import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';
import { Storage, UploadStream } from 'megajs';

export class Mega implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'MEGA',
		name: 'mega',
		icon: 'file:mega.svg',
		group: ['output'],
		version: 1,
		description: 'Upload files to MEGA',
		defaults: {
			name: 'MEGA',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'megaApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Upload File',
						value: 'uploadFile',
						description: 'Upload a file to MEGA',
						action: 'Upload a file to MEGA',
					},
				],
				default: 'uploadFile',
			},
			{
				displayName: 'File URL',
				name: 'fileUrl',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: ['uploadFile'],
					},
				},
				description: 'URL of the file to upload',
			},
			{
				displayName: 'Target Folder Path',
				name: 'folderPath',
				type: 'string',
				default: '/',
				required: true,
				displayOptions: {
					show: {
						operation: ['uploadFile'],
					},
				},
				description: 'Path in MEGA where to upload the file',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const credentials = await this.getCredentials('megaApi');
				const storage = new Storage({
					email: credentials.email as string,
					password: credentials.password as string,
				});

				await storage.ready;

				const fileUrl = this.getNodeParameter('fileUrl', i) as string;
				const folderPath = this.getNodeParameter('folderPath', i) as string;

				const response = await fetch(fileUrl);
				const fileBuffer = await response.arrayBuffer();

				const fileName = fileUrl.split('/').pop() || 'downloaded_file';
				const folders = folderPath.split('/').filter(Boolean);
				let targetFolder = storage.root;
				
				for (const folder of folders) {
					if (!targetFolder.children) {
						throw new NodeOperationError(this.getNode(), `Folder ${folderPath} not found or not accessible`);
					}
					const found = targetFolder.children.find(f => f.name === folder);
					if (!found || !found.directory) {
						throw new NodeOperationError(this.getNode(), `Folder ${folderPath} not found`);
					}
					targetFolder = found;
				}
				
				const uploadStream = targetFolder.upload({
					name: fileName,
				}, Buffer.from(fileBuffer)) as UploadStream;

				const uploadedFile = await uploadStream.complete;
				const shareLink = await uploadedFile.link({ noKey: false });

				returnData.push({
					json: {
						success: true,
						fileName,
						folderPath,
						shareLink,
					},
				});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							success: false,
							error: error.message,
						},
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
} 