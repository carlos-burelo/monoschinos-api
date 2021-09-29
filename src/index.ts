import app from './app';
import { appConfig } from './config'

function init(host:any, port:any) {
   app.listen(port, host, ( ) => {
      console.clear()
      console.info(`API Running on: ${host}:${port} ============================`);
   })
}

init(appConfig.host, appConfig.port)