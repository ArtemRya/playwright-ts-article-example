import { test as setup, expect, tags } from '../../fixtures';
import path from 'path';

const authFile = path.join(__dirname, '../../.auth/user.json');  //TODO user

setup(
    'go to env URL',
    {
        tag: tags(__filename),
    },
    async ({ app }) => {
        await app.page.goto('');
    },
);
