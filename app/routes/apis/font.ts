import type { ActionFunctionArgs } from 'react-router';

import { fontAction } from '~/.server/controllers/font.controller';
import { control } from '~/.server/lib/utils';

export const action = async (args: ActionFunctionArgs) => {
  return control(fontAction, args);
};
