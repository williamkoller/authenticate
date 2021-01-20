import { configService } from '../services/config.service';
import fs = require('fs');

const [migrations, seed] = configService.getTypeOrmConfig();

fs.writeFileSync(
  'ormconfig.json',
  JSON.stringify(
    [
      {
        ...migrations,
        entities: [`${__dirname}/../**/**.entity{.ts,.js}`],
        migrations: [`${__dirname}/../migrations/**/*{.ts,.js}`],
      },
      seed,
    ],
    null,
    2,
  ),
);
