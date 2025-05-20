import type { ActionFunctionArgs } from 'react-router';

import { fonts } from '~/config/fonts';
import { replaceT } from '~/lib/utils';

import { InvalidException, MethodNotAllowedException } from '../lib/exception';
import { localizedError } from '../lib/localization';
import { getFontSession } from '../services/session.service';

export const fontAction = async ({ request }: ActionFunctionArgs) => {
  switch (request.method) {
    case 'POST': {
      const { font } = (await request.json()) as { font: 'inter' | 'manrope' | 'system' };

      if (!fonts.includes(font)) {
        const t = await localizedError(request);
        throw new InvalidException(replaceT(t.invalid, { path: 'font', value: font }));
      }

      // ✅ 세션 저장
      const fontSession = await getFontSession(request);
      fontSession.setFont(font);

      return new Response(null, {
        status: 204,
        headers: {
          'Set-Cookie': await fontSession.commit(),
        },
      });
    }

    default: {
      throw new MethodNotAllowedException();
    }
  }
};
