import {
  getActions,
  postActions,
  putActions,
  deleteActions,
  addActionsToSagas,
} from './addActionsToSagas';
import {
  XHRMethod,
  createRequestActionTypes,
} from 'utils';

describe('addActionsToSagas', () => {
  it('adds GET actions to getActions array', () => {
    const TEST_GET = createRequestActionTypes(XHRMethod.Get, 'TEST');
    addActionsToSagas([TEST_GET]);

    const getAction = getActions.find(action => action === TEST_GET.REQUEST);
    expect(getAction).toBe(TEST_GET.REQUEST);
  });

  it('adds POST actions to postActions array', () => {
    const TEST_POST = createRequestActionTypes(XHRMethod.Post, 'TEST');
    addActionsToSagas([TEST_POST]);

    const saveAction = postActions.find(action => action === TEST_POST.REQUEST);
    expect(saveAction).toBe(TEST_POST.REQUEST);
  });

  it('adds PUT actions to putActions array', () => {
    const TEST_PUT = createRequestActionTypes(XHRMethod.Put, 'TEST');
    addActionsToSagas([TEST_PUT]);

    const updateAction = putActions.find(action => action === TEST_PUT.REQUEST);
    expect(updateAction).toBe(TEST_PUT.REQUEST);
  });

  it('adds DELETE actions to deleteActions array', () => {
    const TEST_DELETE = createRequestActionTypes(XHRMethod.Delete, 'TEST');
    addActionsToSagas([TEST_DELETE]);

    const deleteAction = deleteActions.find(action => action === TEST_DELETE.REQUEST);
    expect(deleteAction).toBe(TEST_DELETE.REQUEST);
  });
});
