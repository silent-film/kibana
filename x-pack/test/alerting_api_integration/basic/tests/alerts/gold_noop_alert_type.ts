/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { getTestAlertData } from '../../../common/lib';
import { FtrProviderContext } from '../../../../common/ftr_provider_context';

// eslint-disable-next-line import/no-default-export
export default function emailTest({ getService }: FtrProviderContext) {
  const supertest = getService('supertest');

  describe('create gold noop alert', () => {
    it('should return 403 when creating an gold alert', async () => {
      await supertest
        .post(`/api/alerts/alert`)
        .set('kbn-xsrf', 'foo')
        .send(getTestAlertData({ alertTypeId: 'test.gold.noop' }))
        .expect(403, {
          statusCode: 403,
          error: 'Forbidden',
          message:
            'Alert type test.gold.noop is disabled because your basic license does not support it. Please upgrade your license.',
        });
    });
  });
}
