import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import * as packageConfig from '../package.json'

export const generateDocment = app => {
  const options = new DocumentBuilder()
    .setTitle(packageConfig.name)
    .setDescription(packageConfig.description)
    .setVersion(packageConfig.version)
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('/api/doc', app, document)
}
