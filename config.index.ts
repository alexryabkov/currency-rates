import { writeFile } from 'fs';
import { environment } from './src/environments/environment.prod';

const targetPath = './src/environments/environment.prod.ts';

const envConfigFile = `export const environment = {
  production: true,
  apiKey: '${process.env['CURRENCY_API_KEY']}',
  apiUrl: '${environment.apiUrl}',
};
`;

writeFile(targetPath, envConfigFile, 'utf8', (err) => {
  if (err) {
    return console.log(err);
  }
});
