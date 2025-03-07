import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class MegaApi implements ICredentialType {
	name = 'megaApi';
	displayName = 'MEGA API';
	properties: INodeProperties[] = [
		{
			displayName: 'Email',
			name: 'email',
			type: 'string',
			default: '',
			required: true,
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
		},
	];
} 