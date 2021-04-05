import app from './app';
import { appConfig } from './config'

function init(host:any, port:any) {
   app.listen(port, () => {
      console.info(`API Running on: ${host}:${port}`);
   })
}

init(appConfig.host, appConfig.port)