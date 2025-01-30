import { showError, showInfo, showSuccess } from "../consoleUtil";



describe('consoleUtil', () => {
  test('showError', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();
    showError('test');
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('test')
    );
    spy.mockRestore();
  });

  test('showInfo', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();
    showInfo('test');
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('test')
    );
    spy.mockRestore();
  });

  test('showSuccess', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();
    showSuccess('test');
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('test')
    );
    spy.mockRestore();
  });
});