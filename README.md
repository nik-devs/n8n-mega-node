# n8n-nodes-mega

This repo contains a node for integrating MEGA cloud storage with [n8n](n8n.io). It allows you to upload files to MEGA and create share links in your workflows.

## Prerequisites

You need the following installed on your development machine:

* [git](https://git-scm.com/downloads)
* Node.js and pnpm. Minimum version Node 18. You can find instructions on how to install both using nvm (Node Version Manager) for Linux, Mac, and WSL [here](https://github.com/nvm-sh/nvm). For Windows users, refer to Microsoft's guide to [Install NodeJS on Windows](https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows).
* Install n8n with:
  ```
  pnpm install n8n -g
  ```

## License

[MIT](LICENSE.md)

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Resources](#resources)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

Mega node supports the following operations:

- Upload file
- Create share link

## Credentials

Mega node uses email and password to authenticate.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)

